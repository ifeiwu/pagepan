<?php
return function ($request_data) {
    $id = intval($request_data['id']);

    $db = db();
    $db->debug = false;
    if ($db->delete('goods', ['id', '=', $id])) {
        Response::success('删除商品成功');
    } else {
        Response::error('删除商品失败');
    }
};