<?php
return function ($request_data) {
    $table = $request_data['table'];
    $columns = $request_data['columns'] ?? '*';
    $wheres = $request_data['wheres'];
    $order = $request_data['order'];
    $number = $request_data['number'];

    $db = db();
    $db->debug = false;
    $data = $db->find($table, $columns, $wheres, $order, $number);

    Response::success('', $data);
};