<?php

namespace site;

use utils\FS;
use utils\Log;

class Js extends \Base {

    private $base_path;
    
    private $src_file;
    
    private $js_file;
    
    
    function __construct()
    {
        $this->src_path = DATA_PATH . 'js/';
    
        parent::__construct();
    }
    
    
    protected function getSource($name)
    {
		$src_file = $this->src_path . $name . '.src';
		
        if ( file_exists($src_file) )
        {
            $source = file_get_contents($src_file);
            
            if ( $source === false )
            {
                return $this->_error('获取源码失败！');
            }
    
            return $this->_success('获取源码', $source);
        }
        
        return $this->_success('未定义', '');
    }
    
    
    protected function postSave($request_data)
    {
        if ( ! FS::rmkdir($this->src_path) )
        {
            return $this->_error('创建目录失败：' . $this->src_path);
        }
        
		$name = $request_data['name'];
		
		$src_file = $this->src_path . $name . '.src';
		$js_file = ASSETS_PATH . 'js/' . $name . '.js';
		
        $source = $request_data['source'];
        
        if ( $source )
        {
            // 保留未压缩的代码
            if ( file_put_contents($src_file, $source) === false )
            {
                return $this->_error('写入失败：' . $src_file);
            }

            // 压缩代码
            $minifier = new \MatthiasMullie\Minify\JS($source);
        
            if ( file_put_contents($js_file, $minifier->minify()) === false )
            {
                return $this->_error('写入失败！');
            }
            
            $open_name_js = 1;
        }
        else
        {
    
            file_put_contents($src_file, '');
            file_put_contents($js_file, '');
            
            $open_name_js = 0;
        }
        
        $is_save = db_save('site', ['name' => 'open_' . $name . '_js', 'value' => $open_name_js], ['name', '=', 'open_' . $name . '_js']);
        
        if ( $is_save )
        {
            return $this->_success('保存成功！');
        }
        else
        {
            return $this->_error('保存失败！');
        }
    }

}