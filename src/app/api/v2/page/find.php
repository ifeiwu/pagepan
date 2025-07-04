<?php
return function ($request_data) {
    $db = db();

    $id = $request_data['id'];
    $column = $column ?: '*';
    $page = $db->find('page', $column, ['id', '=', $id]);

    Response::success('获取页面信息', $page);
};