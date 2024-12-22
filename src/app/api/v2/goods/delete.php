<?php
return function ($request_data) {
    $id = intval($request_data['id']);

    $db = db();
    $db->debug = false;
    $table = 'goods';
    $item = $db->find($table, '*', ['id', '=', $id]);
    if ($item && $db->delete($table, ['id', '=', $id])) {
        helper('api/v2/addTrash', [$table, $item, $request_data]); // 回收站
        Response::success('删除商品成功');
    } else {
        Response::error('删除商品失败');
    }
};