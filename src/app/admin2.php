<?php
return function () {
    $upgrade = isset($_GET['upgrade']) ? '&upgrade=1' : '';
    $domain = $_SERVER['HTTP_HOST'] ?: $_SERVER['SERVER_NAME'];

    if ( isset($_SERVER['HTTP_X_FORWARDED_FOR']) || isset($_SERVER['HTTP_X_REAL_IP']) ) {
        // 请求通过反向代理发送
    } else {
        // host未指定端口号，尝试是否需要添加端口号。
        if ( strpos($domain, ':') === false ) {
            $port = $_SERVER['SERVER_PORT'];
            if ( $port == '80' || $port == '443' ) {
            } else {
                $domain = "{$domain}:{$port}";
            }
        }
    }
    // 拼接网站访问根域名
    $rooturl = $_SERVER['SCRIPT_NAME'] ? : $_SERVER['PHP_SELF'];
    $domain = str_replace('www.', '', dirname($domain . $rooturl));
    // 网站后台管理域名
    $admin_url = Config::file('admin', 'url');
    // 重定向登录页面
    Response::redirect("{$admin_url}main/login?d={$domain}{$upgrade}");
};