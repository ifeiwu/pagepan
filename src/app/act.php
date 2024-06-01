<?php
// /[!|act]/[:action]?
return function ($action = '') {
    $route_file = APP_PATH . "act/{$action}.php";

    if ( is_file($route_file) ) {
        (require $route_file)();
    } else {
        Response::status(404);
    }
};