<?php
require_once VEN_PATH . 'autoload.php';

use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Filesystem\Exception\IOException;

// 重命名文件/目录
return function ($request_data) {
    $curdir = $request_data['curdir'];
    $oldname = $request_data['oldname'];
    $newname = $request_data['newname'];

    if ($oldname && $newname) {
        $curpath = "data/file/$curdir";
        $fullpath = WEB_ROOT . $curpath;
        $oldname2 = "$fullpath/$oldname";
        $newname2 = "$fullpath/$newname";

        if (file_exists($newname2)) {
            Response::error("【{$newname}】文件在当前目录已存在");
        }

        try {
            $filesystem = new Filesystem();
            $filesystem->rename($oldname2, $newname2);
            // 删除图片缓存
            helper('finder/delete-image-cache', ["$curpath/$oldname", "$curpath/$newname"]);
        } catch (IOException $e) {
            Log::error($e->getMessage());
            Response::error('重命名失败');
        }

        Response::success();
    } else {
        Response::error('无效名称');
    }
};