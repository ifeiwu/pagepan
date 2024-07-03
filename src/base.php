<?php
date_default_timezone_set('Asia/Shanghai');

define('BUILD_TIME', ''); // 项目构建时间
define('RUN_MODE', 'dev'); // 开发环境
define('APP_PATH', ROOT_PATH . 'app/');
define('LIB_PATH', ROOT_PATH . 'library/');
define('EXT_PATH', ROOT_PATH . 'extend/');
define('VEN_PATH', ROOT_PATH . 'vendor/');
define('CONF_PATH', ROOT_PATH . 'config/');
define('DATA_PATH', ROOT_PATH . 'data/');
define('CACHE_PATH', DATA_PATH . 'cache/');
define('ASSETS_PATH', WEB_ROOT . 'assets/');

// 所有错误和异常记录
ini_set('error_reporting', E_ALL & ~E_WARNING & ~E_NOTICE & ~E_DEPRECATED);
ini_set('display_errors', false);
ini_set('ignore_repeated_errors', true);
ini_set('log_errors', true);
ini_set('error_log', DATA_PATH . 'logs/error.log');

set_error_handler(function ($errno, $errstr, $errfile, $errline) {
    error_log(date('[Y-m-d H:i:s]') . " Runtime Error: $errstr in $errfile:$errline" . PHP_EOL, 3, ini_get('error_log'));
}, error_reporting());

set_exception_handler(function ($e) {
    error_log(date('[Y-m-d H:i:s]') . " Exception Error: {$e->getMessage()}" . PHP_EOL, 3, ini_get('error_log'));
});

register_shutdown_function(function () {
    if ( is_null($error = error_get_last()) ) {
        return;
    }
    if ( in_array($error['type'], [E_ERROR, E_CORE_ERROR, E_COMPILE_ERROR, E_PARSE]) ) {
        error_log(date('[Y-m-d H:i:s]') . " Fatal Error: {$error['message']}" . PHP_EOL, 3, ini_get('error_log'));
    }
});

// 自动加载类库
spl_autoload_register(function ($class) {
    // 包含命名空间的类转换路径斜杠
    if ( strpos($class, '\\') !== false ) {
        $class = str_replace('\\', '/', $class);
    }
    // 加载 library||extend 目录下的类
    $file = LIB_PATH . "{$class}.php";
    if ( file_exists($file) ) {
        require_once $file;
    } else {
        $file = EXT_PATH . "{$class}.php";
        if ( file_exists($file) ) {
            require_once $file;
        }
    }
});

define('BASE_URL', Request::baseUrl());
define('ROOT_URL', Request::rootUrl());
define('ROUTE_URL', Request::routeUrl());

// API 允许前端跨域请求
if ( strpos(ROUTE_URL, '/api/') === 0 )
{
    if ( isset($_SERVER['HTTP_ORIGIN']) )
    {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: *');
        header('Access-Control-Allow-Methods: *');

        if ( $_SERVER['REQUEST_METHOD'] == 'OPTIONS' ) {
            exit;
        }
    }
}