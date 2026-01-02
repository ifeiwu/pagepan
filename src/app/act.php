<?php
// /[!|act]/[:action]?
return function ($action = '') {
    $route_file = APP_PATH . "act/{$action}.php";
    if (is_file($route_file)) {
        $callback = require $route_file;
        $callback($action);
    } else {
        Response::status(404);
    }
};