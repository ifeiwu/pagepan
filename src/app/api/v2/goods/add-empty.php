<?php
return function ($request_data) {
    $db = db();
    $db->debug = false;
    $title = '重命名标题';
    $insert_id = $db->insert('goods', ['title' => $title, 'ctime' => time()]);
    if ($insert_id) {
        Response::success('添加空的商品成功', ['id' => $insert_id, 'title' => $title]);
    } else {
        Response::error('添加空的商品失败', 0);
    }
};