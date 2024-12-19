<?php
return function ($request_data) {
    $id = intval($request_data['id']);
    $status = intval($request_data['status']);

    $db = db();
    $db->debug = true;
    if ($db->update('order', ['status' => $status], ['id', '=', $id])) {
        Response::success('改变订单状态成功');
    } else {
        Response::error('改变订单状态失败');
    }
};