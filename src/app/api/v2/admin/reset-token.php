<?php
// 重置接口密钥
return function ($request_data) {
    $token = bin2hex(random_bytes(32));
    if ( ! file_put_contents(APP_PATH . 'api/token.php', "<?php return '{$token}';") ) {
        Response::error('重置接口密钥失败');
    }
    Response::success();
};