<?php
return function ($request_data) {
    $callback = require '_save.php';
    if ($callback($request_data) === true) {
        Response::success('保存成功');
    } else {
        Response::error('保存失败');
    }
};