<?php
// /api/[:version]/[:module]/[:action]
return function ($version, $module, $action) {
    // 请求令牌
    $authorization = $_SERVER['HTTP_AUTHORIZATION'];
    if ( strpos($authorization, 'Bearer') === 0 ) {
        $token = substr($authorization, 7);
    }
    // 令牌验证
    $apikey = require ROOT_PATH . 'config/apikey.php';
    if ( $apikey != $token ) {
        header($_SERVER["SERVER_PROTOCOL"] . ' 401 Unauthorized');
        exit;
    }

    if ( $module == 'tools' ) {
        $route_file = APP_PATH . "api/{$version}/{$module}/{$action}/main.php";
    } else {
        $route_file = APP_PATH . "api/{$version}/{$module}/{$action}.php";
    }

    if ( is_file($route_file) ) {
        $request_data = Request::body() + $_GET;
        (require $route_file)($request_data);
    } else {
        Response::status(404);
    }
};