<?php

namespace site;

use utils\FS;
use utils\Log;

class I18n extends \Base {

    private $base_path;
    
    private $src_file;
    
    private $js_file;
    
    
    function __construct()
    {
        $this->base_path = ASSETS_PATH . 'i18n/';
    
        parent::__construct();
    }
    
    
    // 获取指定键所有语言文本
    protected function postTexts($request_data)
    {
        $i18n_list = [];

		$i18n_key = $request_data['i18n_key'];

        $langs = $request_data['langs'];

        foreach ($langs as $i => $lang)
        {
            $json_file = $this->base_path . $lang . '.json';

            $json_data = file_exists($json_file) ? file_get_contents($json_file) : '';
            $json_data = $json_data ? json_decode($json_data, true) : [];

            $i18n_list[$lang] = $json_data[$i18n_key];
        }
		
        return $i18n_list;
    }
    
    
    // 保存键值到指定的语言文件
    protected function postSaveKV($request_data)
    {
        if ( ! FS::rmkdir($this->base_path) )
        {
            return $this->_error('创建目录失败：' . $this->base_path);
        }

        $i18n_key = $request_data['i18n_key'];
        $i18n_key2 = $request_data['i18n_key2'];
		$i18n_list = $request_data['i18n_list'];

        foreach ($i18n_list as $i18n)
        {
            $lang = $i18n['name'];
            $value = $i18n['value'];

            $json_file = $this->base_path . $lang . '.json';

            $json_data = file_exists($json_file) ? file_get_contents($json_file) : '';
            $json_data = $json_data ? json_decode($json_data, true) : [];

            $json_data[$i18n_key] = $value;
            
            // 如果 i18n_key 不等于 i18n_key2 表示已修改 i18n_key，需要删除之前的键 i18n_key2
            if ( $i18n_key != $i18n_key2 )
            {
                unset($json_data[$i18n_key2]);
            }

            if ( file_put_contents($json_file, json_encode($json_data, JSON_UNESCAPED_UNICODE)) === false )
            {
                return $this->_error('写入数据失败：' . $json_file);
            }
        }

        return $this->_success();
    }
    
    
    // 删除语言文件指定键
    protected function postRemoveKey($request_data)
    {
        $i18n_key = $request_data['i18n_key'];
        
        $langs = json_decode($this->site['langs'], true);
        
        foreach ($langs as $i => $lang)
        {
            $json_file = $this->base_path . $lang . '.json';
        
            $json_data = file_exists($json_file) ? file_get_contents($json_file) : '';
            $json_data = $json_data ? json_decode($json_data, true) : [];
            
            if ( is_array($i18n_key) )
            {
                foreach($i18n_key as $key)
                {
                    unset($json_data[$key]);
                }
            }
            else
            {
                unset($json_data[$i18n_key]);
            }

            if ( file_put_contents($json_file, json_encode($json_data, JSON_UNESCAPED_UNICODE)) === false )
            {
                return $this->_error('写入数据失败：' . $json_file);
            }
        }
        
        return $this->_success();
    }
    
    
    // 开启多语言
    protected function postSave($request_data)
    {
        if ( ! FS::rmkdir($this->base_path) )
        {
            return $this->_error('创建目录失败：' . $this->base_path);
        }
        
        $lang = $request_data['lang'];
        $content = $request_data['content'];

        $json_file = $this->base_path . $lang . '.json';

        if ( file_put_contents($json_file, $content) === false )
        {
            return $this->_error('写入数据失败：' . $json_file);
        }

        return $this->_success();
    }


    // 获取语言 JSON 数据
    protected function getJson($request_data)
    {
        $lang = $request_data['lang'];

        $json_file = $this->base_path . $lang . '.json';

        if ( ! file_exists($json_file) )
        {
            return $this->_error('语言文件未创建：' . $json_file);
        }

        return $this->_success('', json_decode(file_get_contents($json_file), true));
    }

}