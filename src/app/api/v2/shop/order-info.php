<?php
return function ($request_data) {
    $id = $request_data['id'];
    $status_text = ['0'=>'未确认', '1'=>'已确认', '2'=>'已签收', '3'=>'已取消'];

    $db = db();
    $db->debug = false;
    $order = $db->find('order', '*', ['id' , '=', $id]);
    $order['status'] = $status_text[$order['status']];
    $order['ctime'] = date('Y-m-d H:i', $order['ctime']);
    $order['address'] = implode('', array_slice(explode(',', $order['address']), -2));

    $goods = $db->select('order_detail', '*', ['order_id' , '=', $id]);

    if ($order) {
        Response::success('获取订单信息成功', [], ['order' => $order, 'goods' => $goods]);
    } else {
        Response::error('获取订单信息失败');
    }
};