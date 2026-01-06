<?php
return function ($request_data) {
    $id = $request_data['id'];

    $db = db();
    $order = $db->find('order', '*', ['id', '=', $id]);
    $order['ctime'] = date('Y-m-d H:i', $order['ctime']);
    $address = explode(',', $order['address']);
    $province = $address[0];
    $city = $address[1];
    $district = $address[2];
    $road = $address[3];
    $house = $address[4];

    if ($road) {
        // 本地订单
        $order['address'] = "{$road}{$house}";
    } else {
        // 全国订单
        $order['address'] = "{$province},{$city},{$district}{$road}{$house}";
    }

    if ($order) {
        $items = $db->select('order_detail', '*', ['order_id', '=', $id]);
        Response::success('获取订单信息成功', [], ['order' => $order, 'items' => $items]);
    } else {
        Response::error('获取订单信息失败');
    }
};