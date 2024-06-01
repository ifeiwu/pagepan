<?php
return function ($request_data) {
    $table = $request_data['table'];
    $columns = $request_data['columns'] ?? '*';
    $wheres = $request_data['wheres'];
    $order = $request_data['order'];
    $limit = $request_data['limit'];
    $number = $request_data['number'];

    $db = DB::new(['debug' => false, 'type' => 'sqlite', 'file' => 'data/sqlite/demo.db', 'prefix' => '']);

    $data = $db->select($table, $columns, $wheres, $order, $limit, $number);

    Response::success('', $data);
};