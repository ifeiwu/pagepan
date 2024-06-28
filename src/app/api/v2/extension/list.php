<?php
return function () {
    // 读取所有扩展程序目录
    $dirs = array_map('basename', glob(APP_PATH . 'extension/*', GLOB_ONLYDIR));
    $items = [];
    foreach ($dirs as $dir) {
        $items[$dir] = include APP_PATH . "extension/{$dir}/about.php";
    }

    // 生成访问令牌
    $token = bin2hex(random_bytes(32));
    file_put_contents(APP_PATH . 'extension/token.php', "<?php return '{$token}';");

    Response::success('页面查询', ['items' => $items, 'token' => $token]);
};