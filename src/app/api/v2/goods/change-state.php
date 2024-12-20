<?php
return function ($request_data) {
    $id = intval($request_data['id']);
    $state = intval($request_data['state']);

    $db = db();
    $db->debug = false;
    if ($db->update('goods', ['state' => $state], ['id', '=', $id])) {
        Response::success('改变商品状态成功');
    } else {
        Response::error('改变商品状态失败');
    }
};