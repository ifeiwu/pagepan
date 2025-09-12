<?php
return function ($request_data) {
    $db = db();
    $title = '重命名';
    $sortby = intval($db->column('goods', 'sortby', [], 'sortby DESC'));
    $sortby = ($sortby ?: 99) + 1;
    $goods_id = $db->insert('goods', ['title' => $title, 'sortby' => $sortby, 'ctime' => time()]);
    if ($goods_id) {
        $goods = $db->find('goods', '*', ['id', '=', $goods_id]);
        Response::success('添加商品成功', $goods);
    } else {
        Response::error('添加商品失败', 0);
    }
};