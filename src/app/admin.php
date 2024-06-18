<?php
return function () {
    $server = Request::get('s');
    $scheme = Request::isSsl() ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?: $_SERVER['SERVER_NAME'];
    // host未指定端口号，尝试是否需要添加端口号。
    if ( strpos($host, ':') === false ) {
        $port = $_SERVER['SERVER_PORT'];
        if ( $port == '80' || $port == '443' ) {
        } else {
            $host = "{$host}:{$port}";
        }
    }
    // 拼接网站访问根域名
    $domain = str_replace('www.', '', dirname($host . $_SERVER['PHP_SELF']));
    // 网站后台管理域名
    $admin_domain = Config::load('admin', 'domain');
    $admin_domain = $scheme == 'https' ? "https://s$admin_domain" : "http://$admin_domain";

    Response::redirect("$admin_domain/main/login.verify?d=$domain&h=$scheme&s=$server");
};