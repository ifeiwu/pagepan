<?php

namespace site;

use utils\FS;
use utils\Log;

class Php extends \Base {

    private $src_path;
    
    private $src_file;
    
    
    function __construct()
    {
        $this->src_path = DATA_PATH . 'php/';
        
        parent::__construct();
    }
    
    
    protected function getSource($name)
    {
		$src_file = $this->src_path . $name . '.inc';
		
        if ( file_exists($src_file) )
        {
            $source = file_get_contents($src_file);
            
            if ( $source === false )
            {
                return $this->_error('获取源码失败！');
            }
    
            return $this->_success('获取源码', $source);
        }
        
        return $this->_success('未定义'.$src_file, '');
    }
    
    
    protected function postSave($request_data)
    {
        if ( ! FS::rmkdir($this->src_path) )
        {
            return $this->_error('创建目录失败：' . $this->src_path);
        }
		
		$name = $request_data['name'];
		
		$src_file = $this->src_path . $name . '.inc';
        
        $source = $request_data['source'];
        
        if ( $source )
        {
            // 保留未压缩的代码
            if ( file_put_contents($src_file, $source) === false )
            {
                return $this->_error('写入失败：' . $src_file);
            }

            $open_name_php = 1;
        }
        else
        {
    
            file_put_contents($src_file, '');
            
            $open_name_php = 0;
        }
        
        $is_save = db_save('site', ['name' => 'open_' . $name . '_php', 'value' => $open_name_php], ['name', '=', 'open_' . $name . '_php']);
        
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