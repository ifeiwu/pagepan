<?php
return function () {
    $domain = $_SERVER['HTTP_HOST'] ?: $_SERVER['SERVER_NAME'];
    if (isset($_SERVER['HTTP_X_FORWARDED_FOR']) || isset($_SERVER['HTTP_X_REAL_IP'])) {
        // 请求通过反向代理发送
    } else {
        // host未指定端口号，尝试是否需要添加端口号。
        if (strpos($domain, ':') === false) {
            $port = $_SERVER['SERVER_PORT'];
            if ($port == '80' || $port == '443') {
            } else {
                $domain = "{$domain}:{$port}";
            }
        }
    }
    // 拼接网站访问根域名
    $rooturl = $_SERVER['SCRIPT_NAME'] ?: $_SERVER['PHP_SELF'];
    $_POST['domain'] = str_replace('www.', '', dirname($domain . $rooturl));

    $yun_url = Config::file('admin', 'url');
    $yun_url = rtrim($yun_url, '/');
    $yun_login_url = rtrim($yun_url, '/') . '/main/login.auth2';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $yun_login_url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($_POST));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

    $response = curl_exec($ch);
    if (curl_errno($ch)) {
        Response::error('ok', curl_error($ch));
    }
    curl_close($ch);

    $res = json_decode($response, true);
    if ($res['code'] == 0) {
        $data = $res['data'];
        $res['login_token_url'] = "$yun_url/main/login.verify?token={$data['token']}&domain={$data['domain']}";
    }

    Response::json($res);
};