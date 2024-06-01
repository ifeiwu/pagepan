<?php
namespace utils;

class Log
{
    
    protected static $path = ROOT_PATH . 'data/logs/';
    
    
    public static function setPath($dir)
    {
        if ( FS::rmkdir($dir) )
        {
            self::$path = $dir;
        }
    }

    /**
     * 开发调试
     */
    public static function debug($message = '')
    {
        self::log($message, 'debug');
    }
    
    
    /**
     * 运行错误
     */
    public static function error($message = '')
    {
        self::log($message, 'error');
    }
    
    
    /**
     * 重要通知
     */
    public static function alert($message = '')
    {
        self::log($message, 'alert');
    }
    
    
    /**
     * 操作记录
     */
    public static function info($message = '')
    {
        self::log($message, 'info');
    }

    
    public static function log($message, $level)
    {
        if ( $message instanceof \Exception )
        {
            $message = $message->__toString();
        }
        elseif ( is_array($message) )
        {
            $message = json_encode($message, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        }
        
        $message = date('[Y-m-d H:i:s] ') . ': ' . $message . "\n\n";
        
        error_log($message, 3, self::$path . $level . '-api.log');
    }
}