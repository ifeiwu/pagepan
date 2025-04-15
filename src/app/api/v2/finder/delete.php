<?php
// 删除文件/目录
return function ($request_data) {
    $paths = $request_data['paths'];
    $failed = [];

    foreach ($paths as $path) {
        $path = rawurldecode($path);
        $filepath = "data/file/$path";
        $fullpath = WEB_ROOT . $filepath;
        // 删除文件
        if (is_file($filepath)) {
            if (!unlink($filepath)) {
                $failed[] = "【{$path}】删除失败";
            } else {
                helper('finder/delete-image-cache', [$filepath]);
            }
        } else {
            // 删除目录
            if (!rmdir($filepath)) {
                $failed[] = "【{$path}】目录下还有其它文件";
            }
        }
    }

    Response::success('删除成功', ['failed' => $failed]);
};