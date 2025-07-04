<?php
return function ($request_data) {
    $error = [];
    $remove_files = [];

    $db = db();
    $ids = $request_data['id'];
    foreach ($ids as $id) {
        $id = intval($id);
        $trash = $db->find('trash', '*', ['id', '=', $id]);
        $item = json_decode($trash['data'], true);
        if ($db->delete('trash', ['id', '=', $id])) {
            // 没有关联记录可以删除目录
            if ($item['jid'] === 0) {
                $item_id = $item['id'];
                if ($item_id) {
                    FS::rrmdir(WEB_ROOT . 'data/file/item/' . $item_id);
                }
            }
        } else {
            $error[] = $trash['title'];
        }
    }

    if (count($error) === 0) {
        Response::success('删除成功');
    } else {
        Response::error('删除失败');
    }
};