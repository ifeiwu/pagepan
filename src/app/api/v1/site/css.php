<?php
namespace site;

use utils\FS;
use utils\Log;

class Css extends \Base
{
    private $src_path;

    private $src_file;

    private $css_file;

    function __construct()
    {
        $this->src_path = WEB_ROOT . 'data/css/';
        parent::__construct();
    }

    protected function getSource($name)
    {
        $src_file = $this->src_path . $name . '.css';
        if (file_exists($src_file)) {
            $source = file_get_contents($src_file);
            if ($source === false) {
                return $this->_error('获取源码失败！');
            }
            return $this->_success('获取源码', $source);
        }
        return $this->_success('未定义', '');
    }

    protected function postSave($request_data)
    {
        if (!FS::rmkdir($this->src_path)) {
            return $this->_error('创建目录失败：' . $this->src_path);
        }
        $name = $request_data['name'];
        $src_file = $this->src_path . $name . '.css';
        $css_file = $this->src_path . $name . '.min.css';
        $source = $request_data['source'];
        if ($source) {
            // 保留未压缩的代码
            if (file_put_contents($src_file, $source) === false) {
                return $this->_error('写入失败：' . $src_file);
            }
            // 压缩代码
            $minifier = new \MatthiasMullie\Minify\CSS($source);
            if (file_put_contents($css_file, $minifier->minify()) === false) {
                return $this->_error('写入失败！');
            }
            $open_name_css = 1;
        } else {
            file_put_contents($src_file, '');
            file_put_contents($css_file, '');
            $open_name_css = 0;
        }

        $is_save = db_save('site', ['name' => 'open_' . $name . '_css', 'value' => $open_name_css], ['name', '=', 'open_' . $name . '_css']);
        if ($is_save) {
            return $this->_success('保存成功！');
        } else {
            return $this->_error('保存失败！');
        }
    }
}