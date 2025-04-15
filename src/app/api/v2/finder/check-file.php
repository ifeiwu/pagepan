<?php
// 文件是否存在
return function ($request_data) {
    $name = $request_data['name'];

    if (file_exists("data/file/$name")) {
        $name = basename($name);
        Response::error("【{$name}】文件已存在");
    } else {
        Response::success();
    }
};