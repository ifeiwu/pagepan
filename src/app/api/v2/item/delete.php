<?php
return function ($request_data) {
    $failed_ids = $succeed_ids = [];

    $db = db();
    $ids = $request_data['ids'] ?: $request_data['id'];
    $ids = is_array($ids) ? $ids : [$ids];
    foreach ($ids as $id) {
        $item = $db->find('item', '*', ['id', '=', $id]);
        if ($item) {
            if ($db->delete('item', ['id', '=', $id])) {
                $succeed_ids[] = $id;
                // 触发事件
                Webhook::dataset('item.delete', null, $item);
                // 回收站
                helper('api/v2/addTrash', ['item', $item, $request_data]);
            } else {
                $failed_ids[] = $id;
            }
        } else {
            $failed_ids[] = $id;
        }
    }

    if (count($failed_ids) == 0) {
        Response::success('删除成功', ['succeed_ids' => $succeed_ids]);
    } else {
        Response::error('删除失败', ['failed_ids' => $failed_ids, 'succeed_ids' => $succeed_ids]);
    }
};