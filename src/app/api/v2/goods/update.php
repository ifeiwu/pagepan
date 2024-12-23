<?php
return function ($request_data) {
    $table = 'goods';
    if (helper('api/v2/updateItem', [$table, $request_data])) {
        $db = db();
        $item = $db->find($table, '*', ['id', '=', $request_data['id']]);
        $pid = $item['pid'];
        $path = $item['path'];
        $image = $item['image'];
        $item['image'] = $path ? "$path/$image" : $image;
        if ( $pid > 0 ) {
            $item['pid'] = $db->find($table, 'title', ['id', '=', $pid], [], 0);
        }
        Response::success('更新商品成功', $item);
    } else {
        Response::error('更新商品失败');
    }
};