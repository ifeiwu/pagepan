<?php
// 前端跨域请求
return function () {debug('cors');
    // 如果已经在 Web 服务器上配置 CORS，请添加以下代码以避免重复设置问题。
    // Apache: RequestHeader set X-Custom-Access-Control "Ignore PHP CORS settings"
    // Nginx: more_set_headers "X-Custom-Access-Control: Ignore PHP CORS settings";
    if (!isset($_SERVER['HTTP_X_CUSTOM_ACCESS_CONTROL'])) {
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        } else {
            header('Access-Control-Allow-Origin: *');
        }

        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
                header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
            }
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
            }
            header('Access-Control-Max-Age: 86400');
            exit(0);
        }
    }
};