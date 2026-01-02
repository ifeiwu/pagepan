<?php
// admin/[:action]
return function ($action = 'login') {
    $route_file = APP_PATH . "admin/{$action}.php";
    if (is_file($route_file)) {
        $callback = require $route_file;
        $callback($action);
    } else {
        Response::status(404);
    }
};