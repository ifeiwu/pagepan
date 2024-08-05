<?php
use utils\FS;
use utils\Log;

class Admin extends CRUD {

    function __construct() {
        $this->table = 'admin';
        parent::__construct();
    }

    // 登录验证
    public function postLogin($request_data) {
        $name = $request_data['name'];
        $pass = $request_data['pass'];
        $admin = db_get($this->table, '*', [['state', '=', 1], 'AND', ['name', '=', $name]]);
        if (!$admin) {
            return $this->_error('用户名或密码不正确！');
        }

        if (!password_verify($pass, $admin['pass'])) {
            return $this->_error('用户名或密码不正确！');
        }

        // 更新登录信息
        $_more = json_decode($admin['_more'], true);
        $_more['login_time'] = date('Y-m-d H:i');
        $_more['login_ip'] = $this->_getIP();
        $_more['login_count'] = $_more['login_count'] + 1;

        db_update($this->table, array('_more' => json_encode($_more)), array('id', '=', $admin['id']));

        // $this->_log('login', array('admin_id' => $admin['id'], 'admin_name' => $admin['name']));

        return $this->_success($admin);
    }

    protected function getOne($id, $column = null) {
        $column = $column ?: '*';
        $data = db_get($this->table, $column, array('id', '=', $id));//$this->db->select($this->table, $column)->where(array('id', '=', $id))->get();
        return $this->_success($data);
    }

    // 修改密码
    protected function postPassword($id, $request_data) {
        $admin = db_get($this->table, '*', [['state', '=', 1], 'AND', ['id', '=', $id]]);//$this->db->select($this->table)->where('state = 1 AND id = ?', array($id))->get();
        $old_pass = $request_data['oldpass'];
        $pass = $request_data['pass'];

        if (!password_verify($old_pass, $admin['pass'])) {
            return $this->_error('旧密码不正确！');
        }

        // 更新密码和时间
        $_more = json_decode($admin['_more'], true);
        $_more['pass_time'] = time();
        $pass = password_hash($request_data['pass'], PASSWORD_DEFAULT);
        $data = array('pass' => $pass, '_more' => json_encode($_more));

        // if ($this->db->update($this->table, $data, array('id', '=', $id))->is())
        if (db_update($this->table, $data, array('id', '=', $id))) {
            return $this->_success('请使用新密码重新登录！');
        } else {
            return $this->_error('请稍候再试...');
        }
    }

    // 修改密码（找回密码）
    protected function postPassword2($request_data) {
        $pass = password_hash($request_data['pass'], PASSWORD_DEFAULT);
        if (db_update($this->table, array('pass' => $pass), 'id = 1')) {
            return $this->_success();
        } else {
            return $this->_error('错误，请稍候再试...');
        }
    }

    // 添加管理员
    protected function postAdd($request_data) {
        $data['name'] = $request_data['name'];
        $data['pass'] = password_hash($request_data['pass'], PASSWORD_DEFAULT);
        $data['state'] = $request_data['state'] ?: 0;
        $data['rbac'] = $request_data['rbac'] ?: 'normal';
        $data['_more'] = json_encode(array('last_time' => '-----', 'last_ip' => '0.0.0.0', 'login_count' => 0));
        $data['ctime'] = time();

        if (db_insert($this->table, $data)) {
            // 日志记录
            $this->_log('add', array('title' => $data['name']));
            return $this->_success();
        } else {
            return $this->_error('帐号已存在！');
        }
    }

    // 修改管理员
    protected function postUpdate($id, $request_data) {
        if (isset($request_data['name'])) {
            $data['name'] = $request_data['name'];
        }

        if (isset($request_data['state'])) {
            $data['state'] = $request_data['state'];
        }

        if (isset($request_data['rbac'])) {
            $data['rbac'] = $request_data['rbac'];
        }

        if (isset($request_data['pass'])) {
            $data['pass'] = password_hash($request_data['pass'], PASSWORD_DEFAULT);
        }

        $data['truename'] = $request_data['truename'];
        $data['mobile'] = $request_data['mobile'];
        $data['intro'] = $request_data['intro'];
        $data['wechat'] = $request_data['wechat'];
        $data['qq'] = $request_data['qq'];
        $data['sex'] = $request_data['sex'];
        $data['utime'] = time();

        // if ($this->db->update($this->table, $data, array('id', '=', $id))->is())
        if (db_update($this->table, $data, array('id', '=', $id))) {
            // 日志记录
            $this->_log('update', array('title' => $data['name']));
            return $this->_success('保存成功！');
        } else {
            return $this->_error('保存失败！');
        }
    }

    // 删除管理员
    protected function postDelete($request_data) {
        $error = array();
        $ids = $request_data['id'];
        foreach ($ids as $id) {
            $admin = db_get($this->table, '*', array('id', '=', $id));//$this->db->select($this->table)->where(array('id', '=', $id))->get();
            if (db_delete($this->table, array('id', '=', $id))) {
                $this->_trash($admin, $request_data);// 回收站
            } else {
                $error[] = $id;
            }
        }

        if (count($error) === 0) {
            return $this->_success();
        } else {
            return $this->_error('有 ' . count($error) . '条数据删除失败！');
        }
    }

    // 网站升级（使用覆盖方式）
    protected function postUpgrade($request_data) {
        $last_version2 = $request_data['last_version2'];
        $last_version = $request_data['last_version'];
        $cur_version = $request_data['cur_version'];
        $site_domain = $request_data['site_domain'];
        // 备份网站文件
        if ($this->_backupsql()) {
            $zipfile = ROOT_PATH . 'data/backup/upgrade-' . date('Ymdh') . '.zip';
            $zipFile = new \PhpZip\ZipFile();
            try {
                $finder = (new \Symfony\Component\Finder\Finder())
                    ->exclude('data/backup')
                    ->exclude('data/cache')
                    ->exclude('data/logs')
                    ->exclude('data/file')
                    ->exclude('data/pack')
                    ->exclude('public/data/file')
                    ->exclude('public/data/pack')
                    ->exclude('vendor')
                    ->exclude('.git')
                    ->in(ROOT_PATH);

                $zipFile->addFromFinder($finder);
                $zipFile->saveAsFile($zipfile);
            } catch (\PhpZip\Exception\ZipException $e) {
                return $this->_error('备份网站失败：' . $e->getMessage());
            } finally {
                $zipFile->close();
            }

            if (!is_file($zipfile)) {
                return $this->_error('备份网站失败！');
            }
        } else {
            return $this->_error('备份数据库失败！');
        }

        // 下载更新文件
        $ctx = stream_context_create(array('http' => array('timeout' => 30)));
        $upgrade_code = file_get_contents('http://get.pagepan.com/install/' . $last_version2 . '/upgrade?t=' . time(), 0, $ctx);

        if ($upgrade_code === false) {
            return $this->_error('无法读取更新文件！');
        }

        if (file_put_contents(WEB_ROOT . 'upgrade.php', $upgrade_code) === false) {
            return $this->_error('无法写入更新文件，请把目录设置为0755可写权限！');
        }

        return $this->_success('已经准备好升级文件【/upgrade.php】');
    }

    /**
     * 更新缓存
     */
    protected function postCache($request_data) {
        $cache = $request_data['cache'];
        if (empty($cache)) {
            return $this->_error();
        }

        $error = 0;
        foreach ($cache as $value) {
            // 更新时间戳，用于清除静态文件缓存
            if ($value == 'timestamp') {
                $bool = $this->_saveData('site', array('name' => 'timestamp', 'value' => time()), array('name', '=', 'timestamp'));
                if ($bool === false) {
                    $error++;
                }
            } // 所有被缓存页面
            elseif ($value == 'page') {
                $path = CACHE_PATH . 'page/';
                FS::rrmdir($path);
                if (is_dir($path)) {
                    $error++;
                }
            } // 更新动态组件，用于获取最新组件
            elseif ($value == 'uikit') {
                $path = CACHE_PATH . 'uikit/';
                FS::rrmdir($path);
                if (is_dir($path)) {
                    $error++;
                }
            } // 更新数据库，用于数据库文件缓存
            elseif ($value == 'data') {
                $path = CACHE_PATH . 'db/';
                FS::rrmdir($path);
                if (is_dir($path)) {
                    $error++;
                }
            }
        }

        if ($error === 0) {
            return $this->_success();
        } else {
            return $this->_error();
        }
    }
}