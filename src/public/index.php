<?php
define('WEB_ROOT', __DIR__ . '/');
define('ROOT_PATH', dirname(WEB_ROOT) . '/');

require ROOT_PATH . 'base.php';
require ROOT_PATH . 'helper.php';

// 开启路由器
$router = new Router();
$router->setBasePath(ltrim(ROOT_URL, '/'));
$router->addMatchTypes(['a+' => '[\w-]+', '+' => '[^\.]*(?:\.html)?', 'i+' => '[0-9a-z]+(?:\.html)?']);
$router->map('OPTIONS', '/api/[*]', 'app/api/cors');
$router->map('GET|POST', '/api/v1/[*]', 'app/api/v1/main');
$router->map('GET|POST', '/api/[:version]/[:module]/[:action]', 'app/api');
$router->map('GET|POST', '/[!|act]/[:action]?', 'app/act');
$router->map('GET|POST', '/m/[:module]/[:action]', 'app/module');
$router->map('GET|POST', '/extension/[:module]/[:action]?', 'app/extension');
$router->map('GET|POST', '/admin[/]?[:action]?', 'app/admin');
$router->map('GET', '/img/[**:name]', 'app/act/thumb');
$router->map('GET', '/[:alias]/id/[i+:id]', 'app/pager/detail');
$router->map('GET', '/[:alias]/category/[i+:cid]', 'app/pager/category');
$router->map('GET', '/[:alias]/category/[i+:cid]/page/[i+:pagenum]', 'app/pager/category-page');
$router->map('GET', '/[:alias]/tag/[:tag]', 'app/pager/tag');
$router->map('GET|POST', '/[a:alias]/search', 'app/pager/search');
$router->map('GET|POST', '/[+:alias]', 'app/pager/name');
//$router->map('GET|POST', '@(?:/(?P<alias>.*))(?:\.html)?', 'app/page/name');

// 匹配当前请求参数
$match = $router->match();
// 调用文件匿名函数
if ( is_array($match) ) {
    try {
        $callback = include ROOT_PATH . "{$match['target']}.php";
        if ( is_callable($callback) ) {
            call_user_func_array($callback, $match['params']);
        }
    } catch (Throwable $e) {
        throw new Exception("{$e->getMessage()}\n{$e->getTraceAsString()}\n");
    }
} else {
    Response::status(404);
}