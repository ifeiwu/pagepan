<?php
return function () {
    $columns = '*';
    $wheres = "1=1";
    $orders = "ctime DESC";

    $db = db();
    $db->debug = false;

    $table = $db->prefix . 'order';
    $items = $db->queryAll("SELECT {$columns} FROM `{$table}` WHERE {$wheres} ORDER BY {$orders}");
//    debug("SELECT {$columns} FROM {$table} WHERE {$wheres} ORDER BY {$orders}");
    foreach ($items as $key => $item)
    {

    }

    Response::success('订单查询', $items);
};