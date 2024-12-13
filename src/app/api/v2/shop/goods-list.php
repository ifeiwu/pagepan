<?php
return function ($request_data) {
    $column = $request_data['column'] ?? '*';
    $where = $request_data['where'];
    $order = $request_data['order'];
    $limit = $request_data['limit'];
    $number = $request_data['number'];

    $db = db();
    $db->debug = false;
    $total = $db->count('goods', $where);
    $items = $db->select('goods', $column, $where, $order, $limit, $number);

    foreach ($items as $i => $item) {
        $pid = $item['pid'];
        $path = $item['path'];
        $image = $item['image'];
        $items[$i]['image'] = $path ? "$path/$image" : $image;
        if ( $pid > 0 ) {
            $items[$i]['ctitle'] = $db->find('goods', 'title', ['id', '=', $pid], [], 0);
        }
    }


    foreach ($list as $i => $item) {

    }
    Response::success('商品查询', $items, ['total' => $total]);
};