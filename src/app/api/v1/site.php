<?php
use utils\FS;
use utils\Log;

class Site extends Base {

    function __construct()
    {
        $this->table = 'site';

        parent::__construct();
    }

    protected function getAll()
    {
        $site = array();
        $data = db_all($this->table);

        foreach ($data as $d)
        {
            $site[$d['name']] = $d['value'];
        }

        return $this->_success($site);
    }

    // 保存数据
    protected function postSave($request_data)
    {
        if ($this->_save($request_data))
        {
            $this->_log('update', array('title' => '站点设置'));

            return $this->_success('保存成功！');
        }
        else
        {
            return $this->_error('保存失败！');
        }
    }

    // 保存并返回数据
    protected function postSave2($request_data)
    {
        if ($this->_save($request_data))
        {
            $this->_log('update', array('title' => '站点设置'));

            $res = $this->getAll();
            
            $res['message'] = '保存成功！';
            
            return $res;
        }
        else
        {
            return $this->_error('保存失败！');
        }
    }

    // 菜单
    protected function postMenu($request_data)
    {
        // $rdata['menu[!_encode]'] = $request_data['menu'];

        if ($this->_save($rdata))
        {
            $this->_log('update', array('title' => '菜单'));

            return $this->_success('保存成功！');
        }
        else
        {
            return $this->_error('保存失败！');
        }
    }

    // 保存数据
    private function _save($rdata)
    {
        $this->_removeFiles2($rdata['_removefiles']);

        $rdata = $this->_bulidRequestData($rdata);
        
        // 处理数据
        $save_data = [];

        foreach ($rdata as $name => $value)
        {
            if ( stripos($name, '_') === 0 )
            {
                continue;
            }
            
            if ( $value !== null )
            {
                // 数组转 json 格式
                if ( is_array($value) )
                {
                    $value = json_encode($value, JSON_UNESCAPED_UNICODE);
                }
                // json 格式不编码
                else if ( ! helper('str/isjson', [$value]) )
                {
                    $value = $this->_encode($value);
                }
            }
            
            // 更改状态为 0，注意：提交的名称必需是置后的来覆盖原来的值
            // 例子：<input type="hidden" name="{state=0}" value="cdn_sftp_config">
            if ( $name == '{state=0}' )
            {
                $names = explode(',', $value);
                
                foreach ($names as $name)
                {
                    $save_data[$name]['state'] = 0;
                }
            }
            // 更改值为 base64 编码
            // 例子：<input type="hidden" name="{value=base64}" value="cdn_sftp_config">
            elseif ( $name == '{value=base64}' )
            {
                $names = explode(',', $value);
                
                foreach ($names as $name)
                {
                    $value = base64_encode($save_data[$name]['value']);
                    
                    $save_data[$name]['value'] = $value;
                }
            }
            else
            {
                $save_data[$name] = ['name' => $name, 'value' => $value];
            }
        }
        
        // 写入数据
        $error = [];
        
        foreach ($save_data as $name => $data)
        {
            $is_save = db_save($this->table, $data, array('name', '=', $name));
            
            if ( $is_save === false )
            {
                $error[] = $name;
            }
        }

        if ( count($error) === 0 )
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    // 删除请求数组不需要保存的数据
    private function _bulidRequestData($request_data, $fields = array())
    {
        unset($request_data['token'], $request_data['admin']);

        if (!empty($fields) && is_array($fields))
        {
            foreach ($fields as $value)
            {
                unset($request_data[$value]);
            }
        }

        return $request_data;
    }

    // 网站主题
    protected function postTheme($request_data)
    {
        if (isset($request_data['pagepan-css']))
        {
            if (file_put_contents(ASSETS_PATH . 'css/pagepan.css', $request_data['pagepan-css']) === false)
            {
                return $this->_error('写入 pagepan.css 文件失败！');
            }

            unset($request_data['pagepan-css']);
        }
		
		if (isset($request_data['theme-css']))
		{
		    if (file_put_contents(ASSETS_PATH . 'css/theme.css', $request_data['theme-css']) === false)
		    {
		        return $this->_error('写入 theme.css 文件失败！');
		    }
		
		    unset($request_data['theme-css']);
		}

        if ($this->_save($request_data))
        {
            return $this->_success('保存成功！');
        }
        else
        {
            return $this->_error('保存失败！');
        }
    }
    
    /* protected function getArticleCSS()
    {
        $filename = ROOT_PATH . 'data/site/article.css';
        
        if ( file_exists($filename) )
        {
            $article_css = file_get_contents($filename);
            
            if ( $article_css )
            {
                return $this->_success('获取到文章内容样式源码', $article_css);
            }
            else
            {
                return $this->_error('获取文章内容样式源码失败，请重新进入~', '');
            }
        }
        
        return $this->_success('文章内容样式未定义', '');
    }

    // 保存文章内容样式
    protected function postArticleCSS($request_data)
    {
        $data_path = ROOT_PATH . 'data/site/';
        
        if ( ! FS::rmkdir($data_path) )
        {
            return $this->_error('创建目录失败：' . $data_path);
        }
        
        $data_file = $data_path . 'article.css';
        
        $article_css = $request_data['article_css'];
        
        if ( $article_css )
        {
            // 保留未压缩的代码
            if ( file_put_contents($data_file, $article_css) === false )
            {
                return $this->_error('写入文章样式失败：' . $data_file);
            }
            
            // 压缩代码
            $minifier = new \MatthiasMullie\Minify\CSS($article_css);
            
            $article_file = ROOT_PATH . 'assets/css/article.css';

            if ( file_put_contents($article_file, $minifier->minify()) === false )
            {
                return $this->_error('写入文章样式失败！');
            }
            
            $data['article_css'] = 1;
        }
        else
        {
            if ( file_exists($data_file) )
            {
                unlink( $data_file );
            }
            
            $data['article_css'] = 0;
        }

        if ( $this->_save($data) )
        {
            return $this->_success('保存成功！');
        }
        else
        {
            return $this->_error('保存失败！');
        }
    } */
    

    // 运行环境
    protected function getRuntime()
    {
        $env = array();
        $env['system'] = @php_uname('s') . ' ' . @php_uname('r');
        $env['dirroot'] = @getenv('DOCUMENT_ROOT');
        $env['apache'] = 'Disabled';
        $env['php'] = 'Disabled';
        $env['mysql'] = 'Disabled';
        $env['dirsize'] = $this->_getDirSize(ROOT_PATH);

        if (function_exists('apache_get_version'))
        {
            $env['apache'] = @apache_get_version();
        }

        $mysql = db_query_get('select version();', null, 0);//$this->db->query('select version();')->get(0);

        if ($mysql)
        {
            $env['mysql'] = 'MySql ' . $mysql;
        }

        if (@phpversion())
        {
            $env['php'] = 'PHP ' . @phpversion();
        }

        $env['upload'] = ini_get('file_uploads') ? ini_get('upload_max_filesize') : 'Disabled';

        return $this->_success($env);
    }


    // 获取文件夹大小
	private function _getDirSize($dir)
	{ 
		$handle = opendir($dir);

		$sizeResult = 0;

		while (false !== ($FolderOrFile = readdir($handle)))
		{ 
			if ($FolderOrFile != "." && $FolderOrFile != "..") 
			{ 
				if (is_dir("$dir/$FolderOrFile"))
				{ 
					$sizeResult += $this->_getDirSize("$dir/$FolderOrFile"); 
				}
				else
				{ 
					$sizeResult += filesize("$dir/$FolderOrFile"); 
				}
			}    
		}

		closedir($handle);

		return $sizeResult;
	}

}
