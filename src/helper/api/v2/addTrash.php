<?php
return function ($table, $item, $request_data) {
    $data = [];
    $data['admin_id'] = $request_data['admin']['id'];
    $data['admin_name'] = $request_data['admin']['name'];
    $data['note'] = $request_data['note'] ?: '';
    $data['title'] = isset($item['title']) ? $item['title'] : $item['name'];
    $data['table'] = $table;
    $data['data'] = json_encode($item);
    $data['state'] = 0;
    $data['ctime'] = time();

    $db = db();
    $db->debug = false;

    return $db->insert('trash', $data);
};