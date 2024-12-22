<?php
return function ($request_data) {
    $db = db();
    $db->debug = false;
    $table = 'goods';
    $title = '重命名标题';
    $insert_id = $db->insert($table, ['title' => $title, 'ctime' => time()]);
    if ($insert_id) {
        $item = $db->find($table, '*', ['id', '=', $insert_id]);
        Response::success('添加空的商品成功', $item);
    } else {
        Response::error('添加空的商品失败', 0);
    }
};