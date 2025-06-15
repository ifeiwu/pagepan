<?php
return function ($request_data) {
    $id = intval($request_data['id']);

    $db = db();
    $db->pdo->beginTransaction();
    if ($db->delete('order', ['id', '=', $id])) {
        if ($db->delete('order_detail', ['order_id', '=', $id])) {
            $db->pdo->commit();
            Response::success('删除订单成功');
        } else {
            $db->pdo->rollBack();
            Response::error('删除订单失败');
        }
    } else {
        Response::error('删除订单失败');
    }
};