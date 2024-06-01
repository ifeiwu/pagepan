<?php
/**
 * 函数调用助手
 * 自动调用助手目录（helper）下的 php 文件返回的匿名函数
 * 如果调用函数有子目录，需要在目录名称后加下划线分割
 * 例如：Helper::user_getInfo($id); // helper/user/getInfo.php
 */
class Helper {
    /**
     * 自动调用函数
     * @param $name 文件名称 | 目录名称_文件名称
     * @param $args 传入的参数
     * @return mixed
     */
    private static function __callStatic($name, $args = [])
    {
        $name = str_replace('_', '/', $name);
        $key = 'helper.' . $name;

        if ( ! Config::has($key) ) {
            Config::set($key, require ROOT_PATH . "helper/{$name}.php");
        }

        return call_user_func_array(Config::get($key), $args);
    }
}