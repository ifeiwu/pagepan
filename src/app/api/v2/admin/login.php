<?php
return function ($request_data) {
    $name = $request_data['name'];
    $pass = $request_data['pass'];

    $db = db();
    $admin = $db->find('admin', '*', [['state', '=', 1], 'AND', ['name', '=', $name]]);
    if ( ! $admin ) {
        Response::error('用户名或密码不正确');
    }

    if ( ! password_verify($pass, $admin['pass']) ) {
        Response::error('用户名或密码不正确');
    }

    // 更新登录信息
    $_more = json_decode($admin['_more'], true);
    $_more['login_time'] = date('Y-m-d H:i');
    $_more['login_ip'] = Request::ip();
    $_more['login_count'] = $_more['login_count'] + 1;

    $db->update('admin', array('_more' => json_encode($_more)), array('id', '=', $admin['id']));

    $token = bin2hex(random_bytes(32));
    if ( ! file_put_contents(APP_PATH . 'api/token.php', "<?php return '{$token}';") ) {
        Response::error('生成安全令牌失败');
    }

    $admin['token'] = $token;
    unset($admin['pass']);
    Response::success('ok', $admin);
};