<?php
// /api/[:version]/[:module]/[:action]
return function ($version, $module, $action) {
    // 非登录需要验证访问令牌
    if ( $module != 'admin' && $action != 'login') {
        // 请求令牌
        $authorization = $_SERVER['HTTP_AUTHORIZATION'];
        if ( strpos($authorization, 'Bearer') === 0 ) {
            $token = substr($authorization, 7);
        }
        // 令牌验证
        $apikey = require APP_PATH . 'api/token.php';
        if ( $apikey != $token ) {
            header($_SERVER["SERVER_PROTOCOL"] . ' 401 Unauthorized');
            exit;
        }
    }

    $route_file = APP_PATH . "api/{$version}/{$module}/{$action}.php";
    if ( is_file($route_file) ) {
        $request_data = Request::body() + $_GET;
        (require $route_file)($request_data);
    } else {
        Response::status(404);
    }
};