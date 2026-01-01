<?php
/**
 * 自定义模块入口
 * /m/[:module]/[:action]
 */
return function ($module, $action) {
    $route_file = APP_PATH . "{$module}/{$action}.php";
    if ( is_file($route_file) ) {
        $callback = require $route_file;
        $response = $callback($module, $action);
        if ($response) {
            echo $response;
        }
    } else {
        Response::status(404);
    }
};