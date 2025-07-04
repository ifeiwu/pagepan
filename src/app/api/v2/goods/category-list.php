<?php
return function ($request_data) {
    $column = $request_data['column'] ?? ['id', 'title'];
    $where = $request_data['where'] ?? ['type', '=', 2] ;
    $order = $request_data['order'] ?? ['sortby' => 'DESC', 'ctime' => 'DESC'];

    $db = db();
    $items = $db->select('goods', $column, $where, $order);

    Response::success('商品分类查询', $items);
};