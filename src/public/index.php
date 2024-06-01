<?php //$t1 = microtime(true);
define('WEB_ROOT', __DIR__ . '/');
define('ROOT_PATH', dirname(WEB_ROOT) . '/');

require ROOT_PATH . 'base.php';
require ROOT_PATH . 'helper.php';

// 开启路由器
$router = new Router();
$router->addMatchTypes(['a+' => '[\w-]+', '+' => '[^\.]*(?:\.html)?', 'i+' => '[0-9a-z]+(?:\.html)?']);
$router->map('GET|POST', '/api/v1/[*]', 'app/api/v1/main');
$router->map('GET|POST', '/api/[:version]/[:module]/[:action]', 'app/api');
$router->map('GET|POST', '/[!|act]/[:action]?', 'app/act');
$router->map('GET|POST', '/m/[:module]/a/[:action]', 'app/m-a');
$router->map('GET', '/admin', 'app/admin');
$router->map('GET', '/img/[**:name]', 'app/act/thumb');
$router->map('GET', '/[:alias]/id/[i+:id]', 'app/page/detail');
$router->map('GET', '/[:alias]/category/[i+:cid]', 'app/page/category');
$router->map('GET', '/[:alias]/category/[i+:cid]/page/[i+:pagenum]', 'app/page/category-p');
$router->map('GET', '/[:alias]/tag/[:tag]', 'app/page/tag');
$router->map('GET|POST', '/[a:alias]/search', 'app/page/search');
$router->map('GET|POST', '/[+:alias]', 'app/page/name');
//$router->map('GET|POST', '@(?:/(?P<alias>.*))(?:\.html)?', 'app/page/name');

// 匹配当前请求参数
$match = $router->match();//debug(BASE_URL, $match);
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
//echo '<p>' . round(microtime(true) - $t1, 3) . '秒</p>';
//dump(get_included_files()); // 获取所有载入的文件