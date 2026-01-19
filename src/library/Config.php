<?php
/**
 * 配置文件读取
 */
class Config
{
    private static $config = [];

    public static function file($name, $key = null)
    {
        if (!isset(self::$config[$name])) {
            $filename = RUN_MODE != 'dev' ? $name : "{$name}.dev";
            self::$config[$name] = require CONF_PATH . "{$filename}.php";
        }

        if (is_null($key)) {
            return self::$config[$name];
        }

        return self::$config[$name][$key];
    }

    public static function get($name)
    {
        if (strpos($name, '.')) {
            list($name1, $name2) = explode('.', $name);
            $value = isset(self::$config[$name1][$name2]) ? self::$config[$name1][$name2] : null;
        } else {
            $value = isset(self::$config[$name]) ? self::$config[$name] : null;
        }
        return $value;
    }

    public static function set($name, $value)
    {
        if (strpos($name, '.')) {
            list($name1, $name2) = explode('.', $name);
            self::$config[$name1][$name2] = $value;
        } else {
            self::$config[$name] = $value;
        }
    }

    public static function has($name)
    {
        return self::get($name) ? true : false;
    }
}