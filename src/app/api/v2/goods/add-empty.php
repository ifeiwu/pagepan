<?php
return function ($request_data) {
    $db = db();
    $db->debug = false;

    $title = '重命名标题';
    $sortby = $db->column('goods', 'sortby', [], 'sortby DESC');
    $goods_id = $db->insert('goods', ['title' => $title, 'sortby' => $sortby, 'ctime' => time()]);
    if ($goods_id) {
        $item = $db->find('goods', '*', ['id', '=', $goods_id]);
        Response::success('添加商品成功', $item);
    } else {
        Response::error('添加商品失败', 0);
    }
};