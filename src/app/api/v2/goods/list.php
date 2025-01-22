<?php
return function ($request_data) {
    $column = $request_data['column'] ?? 'id,pid,ctime,utime,state,sortby,sale,title,price,path,image';
    $where = $request_data['where'];
    $order = $request_data['order'] ?: ['sortby' => 'DESC', 'ctime' => 'DESC'];
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
        if ( $pid > 0 ) {
            $items[$i]['pid'] = $db->find('goods', 'title', ['id', '=', $pid], [], 0);
        }
    }

    Response::success('商品查询', $items, ['total' => $total]);
};