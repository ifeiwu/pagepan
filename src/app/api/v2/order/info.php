<?php
return function ($request_data) {
    $id = $request_data['id'];

    $db = db();
    $db->debug = false;
    $order = $db->find('order', '*', ['id' , '=', $id]);
    $order['ctime'] = date('Y-m-d H:i', $order['ctime']);
    $order['address'] = implode('', array_slice(explode(',', $order['address']), -2));
    if ($order) {
        $items = $db->select('order_detail', '*', ['order_id' , '=', $id]);
        Response::success('获取订单信息成功', [], ['order' => $order, 'items' => $items]);
    } else {
        Response::error('获取订单信息失败');
    }
};