<?php
return function ($request_data) {
    $db = db();
    $db->debug = false;
    $title = '重命名标题';
    $goods_id = $db->insert('goods', ['title' => $title, 'ctime' => time()]);
    if ($goods_id) {
        if (!$db->insert('goods_sku', ['goods_id' => $goods_id])) {
            Response::error('添加商品规格失败', 0);
        }
        $item = $db->find('goods', '*', ['id', '=', $goods_id]);
        Response::success('添加商品成功', $item);
    } else {
        Response::error('添加商品失败', 0);
    }
};