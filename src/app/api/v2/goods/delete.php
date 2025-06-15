<?php
return function ($request_data) {
    $id = intval($request_data['id']);

    $db = db();
    $item = $db->find('goods', '*', ['id', '=', $id]);
    $db->pdo->beginTransaction();
    if ($db->delete('goods', ['id', '=', $id])) {
        $is_del_spec = $db->delete('goods_spec', ['goods_id', '=', $id]);
        $is_del_sku = $db->delete('goods_sku', ['goods_id', '=', $id]);
        if ($is_del_spec && $is_del_sku) {
            if (FS::rrmdir(WEB_ROOT . $item['path'])) {
                $db->pdo->commit();
                Response::success('删除商品成功');
            } else {
                Response::error('删除商品图片目录失败');
            }
        } else {
            $db->pdo->rollBack();
            Response::error('删除商品失败');
        }
    } else {
        Response::error('删除商品失败');
    }
};