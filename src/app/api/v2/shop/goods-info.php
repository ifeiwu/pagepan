<?php
return function ($request_data) {
    $id = $request_data['id'];

    $db = db();
    $db->debug = false;
    $item = $db->find('goods', '*', ['id' , '=', $id]);

    if ($item) {
        Response::success('获取商品信息成功', $item);
    } else {
        Response::error('获取商品信息失败');
    }
};