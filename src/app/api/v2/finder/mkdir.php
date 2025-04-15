<?php
// 创建目录
return function ($request_data) {
    $curdir = rtrim($request_data['curdir'], '/');
    $newdir = trim($request_data['newdir']);
    $newdir = preg_replace('/[<>:"|?*]+/', '', $newdir);

    if (!$newdir) {
        Response::error('无效名称');
    }

    $fullpath = WEB_ROOT . "data/file/$curdir/$newdir";
    if (is_dir($fullpath)) {
        Response::error("【{$newdir}】文件夹已存在");
    }

    if (!mkdir($fullpath, 0775, true)) {
        Response::error('创建文件夹失败');
    }

    Response::success();
};