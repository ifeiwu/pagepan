<?php
return function ($request_data) {
    $column = $request_data['column'] ?? '*';
    $where = $request_data['where'];
    $order = $request_data['order'] ?: ['ctime' => 'DESC'];
    $limit = $request_data['limit'];
    $number = $request_data['number'];

    $db = db();
    $db->debug = false;
    $total = $db->count('order', $where);
    $items = $db->select('order', $column, $where, $order, $limit, $number);

    // 获取订单表列，清空有新订单通知目录。
    FS::rrmdir(DATA_PATH . 'order/new', false);

    Response::success('订单查询', $items, ['total' => $total]);
};