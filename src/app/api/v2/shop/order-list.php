<?php
return function ($request_data) {
    $column = $request_data['column'] ?? '*';
    $where = $request_data['where'];
    $order = $request_data['order'];
    $limit = $request_data['limit'];
    $number = $request_data['number'];

    $db = db();
    $db->debug = false;
    $total = $db->count('order', $where);
    $items = $db->select('order', $column, $where, $order, $limit, $number);

    foreach ($items as $key => $item) {
//        $items[$key]['number'] = $db->count('order_detail', ['order_id', '=', $item['id']]);
//        $items[$key]['ctime'] = date('Y/m/d H:i', $item['ctime']);
    }

    Response::success('订单查询', $items, ['total' => $total]);
};