<?php
require_once VEN_PATH . 'autoload.php';

// 删除图片缓存
return function () {
    $pattern = '/\.(jpg|jpeg|png|webp|gif|svg|avif)$/i';
    $files = func_get_args();
    foreach ($files as $file) {
        if (preg_match($pattern, $file)) {
            $server = helper('glide/server');
            $server->deleteCache($file);
        }
    }
};