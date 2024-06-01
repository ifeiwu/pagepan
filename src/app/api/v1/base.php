<?php

use utils\FS;
use utils\Log;

class Base {

    protected $db;

    protected $table;

    protected $fields;

    protected $order;

    protected $admin;

    protected $site;


    public function __construct()
    {
        $this->admin = $_REQUEST['admin'];
        
        if ( ! $this->admin )
        {
            $data = json_decode(file_get_contents('php://input'), true);
            
            $this->admin = $data['admin'];

            if ( ! $this->admin )
            {
                $this->admin = db_get('admin', 'id,name,rbac', ['id', '=', 1]);
            }
        }

        $site = db_all('site');

        foreach ($site as $v)
        {
            $this->site[$v['name']] = $v['value'];
        }

        if ( $this->table )
        {
            // 当前数据表所有字段名称
            $this->fields = db_table_columns($this->table);

            // 默认数据的排序方式
            $this->order = array();

            if ( in_array('sortby', $this->fields) )
            {
                $this->order['sortby'] = 'DESC';
            }

            if ( in_array('ctime', $this->fields) )
            {
                $this->order['ctime'] = 'DESC';
            }
        }
    }

    /* public function __destruct()
    {
        if ( APP_DEBUG )
        {
            Log::debug();
        }
    } */

    // 错误返回
    protected function _error($message = '', $data = null)
    {
        return $this->_result(1, $message, $data);
    }

    // 成功返回
    protected function _success($message = '', $data = null)
    {
        return $this->_result(0, $message, $data);
    }

    // 返回数据格式    
    protected function _result($code = 0, $message = '', $data = null)
    {
        $res = ['code' => $code, 'message' => '', 'data' => $data];
    
        if ( is_array($message) )
        {
            $res['data'] = $message;
        }
        else
        {
            $res['message'] = $message;
        }

        return $res;
    }

    //构建请求数据对应数据库表里的字段
    protected function _bulidData($request_data)
    {
        $data = array();

        foreach ($this->fields as $field)
        {
            $value = $request_data[$field];
			
            if ( !is_null($value) )
            {
                $data[$field] = is_array($value) ? json_encode($value, JSON_UNESCAPED_UNICODE) : $this->_encode($value);
            }
        }

        // 创建时间，时分秒自动获取
        if ( isset($request_data['ctime']) )
        {
            $data['ctime'] = strtotime($request_data['ctime']);
        }

        // 防止有些数据库字段整型（int），空字符串不能转0导致异常。
        if ( $data['state'] === '' )
        {
            unset($data['state']);
        }
        
        if ( $data['pid'] === '' )
        {
            unset($data['pid']);
        }

        return $data;
    }

    // 数据安全编码
    protected function _encode($data)
    {
        if ( is_array($data) )
        {
            return array_map(array($this, '_encode'), $data);
        }

        if ( is_object($data) )
        {
            $tmp = clone $data; // 避免修改原始对象
            
            foreach ($data as $k => $v)
            {
                $tmp->{$k} = $this->_encode($v);
            }
            
            return $tmp;
        }

        // 删除反斜杠
        $data = MAGIC_QUOTES_GPC ? stripslashes($data) : $data;

        return htmlspecialchars($data, ENT_QUOTES);
    }

    // 数据安全解码
    protected function _decode($data)
    {
        if ( is_array($data) )
        {
            return array_map(array($this, '_decode'), $data);
        }

        if ( is_object($data) )
        {
            $tmp = clone $data; // 避免修改原始对象
            
            foreach ($data as $k => $v)
            {
                $tmp->{$k} = $this->_decode($v);
            }
            
            return $tmp;
        }

        return htmlspecialchars_decode($data, ENT_QUOTES);
    }

    //返回表的所有字段名称
    // protected function _getTableFields($table)
    // {
    //     if ( ! $table)
    //     {
    //         $table = $this->table;
    //     }

    //     $query = db_query("SELECT * FROM {prefix}$table LIMIT 1");
    //     $count = $query->columnCount();

    //     for ($i = 0; $i < $count; $i++)
    //     {
    //         $column = $query->getColumnMeta($i);
    //         $fields[] = $column['name'];
    //     }

    //     return $fields;
    // }

    // 回调对象函数
    protected function _callback($method, $params)
    {
        if ( is_callable(array($this, $method)) !== false )
        {
            call_user_func_array(array($this, $method), $params);
        }
    }

    //向上查找数据关联的层次,格式：,1,12,20,
    protected function _getLevel($pid, $id = 0)
    {
        static $list = array();

        if ( $pid === '' )
        {
            $pid = db_get($this->table, 'pid', array('id', '=', $id), null, 0);
        }

        if ( $pid != 0 )
        {
            $list[] = $pid;
            $this->_getLevel('', $pid);
        }

        if ( count($list) == 0 )
        {
            return ',' . $id . ',';
        }
        else
        {
            if ( $id )
            {
                return ',' . implode(',', array_reverse($list)) . ',' . $id . ',';
            }
            else
            {
                return ',' . implode(',', array_reverse($list)) . ',';
            }
        }
    }

    //保存数据（添加/更新）
    protected function _saveData($table, $data, $where)
    {
		if ( db_has($table, $where) )
        {
            return db_update($table, $data, $where);
        }
        else
        {
            return db_insert($table, $data);
        }
    }

    // 获取网站元数据
    protected function _getSite($where = [])
    {
        $site = [];
        
        $datas = db_all('site', ['name', 'value'], $where);

        foreach ($datas as $data)
        {
            $site[$data['name']] = $data['value'];
        }

        return $site;
    }

    //保存图片数据（添加/更新）
    protected function _saveImages($pid, $request_data)
    {
        $images_id = $request_data['images_id'];
        $images_order = $request_data['images_order'];
        $images_title = $request_data['images_title'];
        $images_name = $request_data['images_name'];
        $images_path = $request_data['images_path'];
        $images_state = $request_data['images_state'];

        $data['type'] = 'image';
        $data['pid'] = $pid;
        $data['ctime'] = time();

        foreach ($images_id as $i => $id)
        {
            $data['title'] = $images_title[$i];
            $data['orderby'] = $images_order[$i];
            $data['state'] = $images_state[$i];

            if ( empty($id) )
            {
                $data['image'] = $images_name[$i];
                $data['image_path'] = $images_path[$i];

                db_insert($this->table, $data);

                unset($data['image'], $data['image_path']);
            }
            else
            {
                db_update($this->table, $data, array('id', '=', $id));
            }
        }
    }


    protected function _removeFiles2($files)
    {
        $remove_files = [];
        
        if ( ! empty($files) && ! is_array($files) )
        {
            $files = json_decode($files, true);
        }

        if ( empty($files) )
        {
            return $remove_files;
        }
        
        foreach ($files as $key => $value)
        {
            $name = $value['name'];

            if ( ! $name )
            {
                continue;
            }

            $path = WEB_ROOT . $value['path'];

            $filename = $path . '/' . $name;

            if ( file_exists($filename) && unlink($filename) )
            {
                $remove_files[] = $filename;
            }

            $prefix = $value['prefix'] ?: 's_,m_,l_,';

            if ( $prefix )
            {
                $prefixs = explode(',', $prefix);

                foreach ($prefixs as $prefix)
                {
                    $filename = "{$path}/{$prefix}{$name}";

                    if ( file_exists($filename) && unlink($filename) )
                    {
                        $remove_files[] = $filename;
                    }
                }
            }
        }
        
        return $remove_files;
    }


    //构建上传路径
    protected function _bulidUploadPath($temp_path, $data)
    {
        $id = $data['id'];
        $temp_dirs = explode('/', $temp_path);
        $path_last = end($temp_dirs);

        //如果上传路径是ID，不做重命名处理
        if ( $path_last == $id )
        {
            return $temp_path;
        }

        if ( strpos($path_last, '!=') !== false )
        {
            $vardir = current(explode('!=', $path_last));
			
            $true_path = str_replace($path_last, $data[$vardir], $temp_path);
        }

        if ( is_dir(WEB_ROOT . $temp_path) )
        {
            if ( FS::rcopy(WEB_ROOT . $temp_path, WEB_ROOT . $true_path) )
            {
                FS::rrmdir(WEB_ROOT . $temp_path);
            }
        }

        return $true_path;
    }

    //数组转换成Tree结构
    protected function _toTree($list, $pk = 'id', $pid = 'pid', $child = '_child', $root = 0)
    {
        $tree = array();

        if (is_array($list))
        {
            $refer = array();

            foreach ($list as $key => $data)
            {
                $refer[$data[$pk]] = &$list[$key];
            }

            foreach ($list as $key => $data)
            {
                $parentId = $data[$pid];

                if ($root == $parentId)
                {
                    $tree[] = &$list[$key];
                }
                else
                {
                    if (isset($refer[$parentId]))
                    {
                        $parent = &$refer[$parentId];
                        $parent[$child][] = &$list[$key];
                    }
                }
            }
        }
        return $tree;
    }


    // 生成随机字符串
    protected function _rand($length, $islowercase = true, $isuppercase = true, $isnumber = true, $isspecial = false)
    {
        if ($islowercase)
        {
            $chars .= 'abcdefghijklmnopqrstuvwxyz';
        }

        if ($isuppercase)
        {
            $chars .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }

        if ($isnumber)
        {
            $chars .= '0123456789';
        }

        if ($isspecial)
        {
            $chars .= '!@#$%^&*()';
        }

        $result = '';
        $max = strlen($chars) - 1;
        for ($i = 0; $i < $length; $i++)
        {
            $result .= $chars[rand(0, $max)];
        }
        return $result;
    }

    // 字符串编码转换
    protected function _GBK2UTF8($str)
    {
        $e = mb_detect_encoding($str, array('UTF-8', 'GBK','GB2312'));

        if ($e == 'UTF-8')
        {
            return $str;
        }
        elseif ($e == 'GBK')
        {
            return iconv('GBK', 'UTF-8', $str);
        }

        return iconv('GB2312', 'UTF-8', $str);
    }

    // 序列化
    protected function _serialize($obj)
    {
        return base64_encode(gzcompress(serialize($obj)));
    }

    // 反序列化
    protected function _unserialize($txt)
    {
        return unserialize(gzuncompress(base64_decode($txt)));
    }

    //获取客户端IP地址
    protected function _getIP()
    {
        if (isset($_SERVER))
        {
            if (isset($_SERVER["HTTP_X_FORWARDED_FOR"]))
            {
                $realip = $_SERVER["HTTP_X_FORWARDED_FOR"];
                $realip = explode(",", $realip);
                $realip = $realip[0];
                $realip = empty($realip) ? ($_SERVER["REMOTE_ADDR"]) : ($realip);
            }
            elseif (isset($_SERVER["HTTP_CLIENT_IP"]))
            {
                $realip = $_SERVER["HTTP_CLIENT_IP"];
            }
            else
            {
                $realip = $_SERVER["REMOTE_ADDR"];
            }
        }
        else
        {
            if (getenv("HTTP_X_FORWARDED_FOR"))
            {
                $realip = getenv("HTTP_X_FORWARDED_FOR");
                $realip = explode(",", $realip);
                $realip = $realip[0];
                $realip = empty($realip) ? ($_SERVER["REMOTE_ADDR"]) : ($realip);
            }
            elseif (getenv("HTTP_CLIENT_IP"))
            {
                $realip = getenv("HTTP_CLIENT_IP");
            }
            else
            {
                $realip = getenv("REMOTE_ADDR");
            }
        }

        return $realip;
    }

    // 回收站
    protected function _trash($item, $request_data)
    {
        $data = array();
        $data['admin_id'] = $this->admin['id'];
        $data['admin_name'] = $this->admin['name'];
        $data['note'] = $request_data['note'] ?: '';
        $data['title'] = isset($item['title']) ? $item['title'] : $item['name'];
//		$data['path'] = $item['path'];
        $data['table'] = $this->table;
        $data['data'] = json_encode($item);
        $data['state'] = 0;
        $data['ctime'] = time();

        return db_insert('trash', $data);
    }

    // 备份数据库
    protected function _backupsql($sqlname = null)
    {
        $dbconf = config('db');
        
        if ( $dbconf['type'] == 'sqlite' ) { return true; }
        
        $sqlname = $sqlname ?: date('Ymdhis');

        $mb = new MySQLBackup($dbconf['host'], $dbconf['user'], $dbconf['pass'], $dbconf['name'], $dbconf['port']);
        $mb->addCreateDatabaseIfNotExists(false);
        $mb->setFilename(DATA_PATH . 'sql/' . $sqlname);
        $mb->dump();

        if ( is_file(DATA_PATH . 'sql/' . $sqlname . '.sql') )
        {
            return true;
        }
        else
        {
            return false;
        }
    }


    // 添加需要同步的文件到 json 文件
    protected function _add_sync_files($files, $dirs = [])
    {
        if ( $this->site['cdn_type'] )
        {
            // 获取目录下所有文件
            if ( is_array($dirs) )
            {
                foreach ($dirs as $dir)
                {
                    FS::toFiles($dir, $files, true);
                }
            }

            $json_path = WEB_ROOT . 'data/json/';
            
            FS::rmkdir($json_path);
            
            $json_file = $json_path . 'sync-files.json';

            $_files = FS::jsonp($json_file);

            $files = array_merge($files, $_files);

            FS::jsonp($json_file, $files);
        }
    }


    // 操作日志
    protected function _log($type, $data = array())
    {

        return true;

        /* if ($type != 'login')
        {
            $data['admin_id'] = $this->admin['id'];
            $data['admin_name'] = $this->admin['name'];
            $data['url'] = $_SERVER['HTTP_REFERER'];
        }

        $data['table'] = $this->table;
        $data['type'] = $type;
        $data['ip'] = $this->_getIP();
        $data['ctime'] = time();

        return db_insert('log', $data); */
    }

}
