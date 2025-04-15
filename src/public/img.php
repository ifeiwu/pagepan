<?php
define('WEB_ROOT', __DIR__ . '/');
define('ROOT_PATH', dirname(WEB_ROOT) . '/');

require ROOT_PATH . 'base.php';
require VEN_PATH . 'autoload.php';

\Co\async(function () {
    $server = Helper::glide_server();

    // 清理指定图片缓存
    if (isset($_GET['dc'])) {
        $server->deleteCache($_GET['path']);
    }

    // 为了安全起见只能使用预设，避免生成过多尺寸的图片。
    $filepath = preg_replace('/[<>:"|?*]+/', '', $_GET['path']);
    $preset = intval($_GET['p']);
    $server->outputImage($filepath, ['p' => $preset]);
});
\Co\wait();