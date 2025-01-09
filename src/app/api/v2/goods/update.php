<?php
return function ($request_data) {
    $table = 'goods';
    // 库存小于0设置下架状态
    /*$inventory = intval($request_data['inventory']);
    if ($inventory <= 0) {
        $request_data['state'] = 0;
    }*/
    if (helper('api/v2/updateItem', [$table, $request_data])) {
        $db = db();
        $item = $db->find($table, '*', ['id', '=', $request_data['id']]);
        $pid = $item['pid'];
        if ($pid > 0) {
            $item['pid'] = $db->find($table, 'title', ['id', '=', $pid], [], 0);
        }
        Response::success('更新商品成功', $item);
    } else {
        Response::error('更新商品失败');
    }
};