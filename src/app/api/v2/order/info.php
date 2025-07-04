<?php
return function ($request_data) {
    $id = $request_data['id'];

    $db = db();
    $order = $db->find('order', '*', ['id' , '=', $id]);
    $order['ctime'] = date('Y-m-d H:i', $order['ctime']);
    $address = explode(',', $order['address']);
//    $city = $address[1];
//    $district = $address[2];
//    $district = $district ?: $city;
    $road = $address[3];
    $house = $address[4];
    $order['address'] = "{$road}{$house}";
    if ($order) {
        $items = $db->select('order_detail', '*', ['order_id' , '=', $id]);
        Response::success('获取订单信息成功', [], ['order' => $order, 'items' => $items]);
    } else {
        Response::error('获取订单信息失败');
    }
};