<?php
return function () {
    $server = Request::get('s');
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
    $admin = Config::file('admin');
    $admin_domain = $admin['domain'];
    $admin_version = $admin['version'];

    Response::redirect("https://$admin_domain/$admin_version/main/login.verify?d=$domain&s=$server");
};