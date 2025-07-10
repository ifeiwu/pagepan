<?php
return function ($request_data) {
    $table = $request_data['table'] ?: 'item';
    $column = $request_data['column'] ?: '*';
    $where = $request_data['where'] ?: '1 = 1';
    $order = $request_data['order'] ?: ['sortby' => 'DESC', 'id' => 'DESC'];

    $db = db();
    $items = $db->select($table, $column, $where, $order);
    foreach ($items as $i => $item) {
        $pid = $item['pid'];
        if (!empty($pid)) {
            $items[$i]['category'] = $db->find($table, 'title', ['id', '=', $pid], null, 0);
        }
        $ctime = $item['ctime'];
        if (!empty($ctime)) {
            $items[$i]['ctime'] = date('Y-m-d H:i:s', $ctime);
        }
        $utime = $item['utime'];
        if (!empty($utime)) {
            $items[$i]['utime'] = date('Y-m-d H:i:s', $utime);
        }
    }

    Response::success('', $items);
};