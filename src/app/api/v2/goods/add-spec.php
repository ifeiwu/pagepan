<?php
return function ($request_data) {
    $goods_id = intval($request_data['goodsid']);
    $data = ['goods_id' => $goods_id, 'name' => '重命名', 'value' => ''];

    $db = db();
    $db->debug = false;
    $id = $db->insert('goods_spec', $data);
    if ($id) {
        Response::success('添加商品规格成功', ['id' => $id]);
    } else {
        Response::error('添加商品规格失败');
    }
};