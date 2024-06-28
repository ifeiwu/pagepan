<?php
/**
 * 网站扩展程序入口
 * /extension/[:module]/[:action]?
 */
return function ($module, $action = 'main') {
    // 令牌验证
    $get_token = Request::get('token');
    $token = require APP_PATH . 'extension/token.php';
    if ( $token != $get_token ) {
        header($_SERVER["SERVER_PROTOCOL"] . ' 401 Unauthorized');
        exit;
    }

    $route_file = APP_PATH . "extension/{$module}/$action.php";
    if ( is_file($route_file) ) {
        (require $route_file)($module, $action);
    } else {
        Response::status(404);
    }
};