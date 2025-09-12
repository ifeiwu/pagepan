<?php
return function ($request_data) {
    $db = db();
    $title = '重命名';
    $sortby = intval($db->column('item', 'sortby', [], 'sortby DESC'));
    $sortby = ($sortby ?: 99) + 1;
    $item_id = $db->insert('item', ['title' => $title, 'sortby' => $sortby, 'ctime' => time()]);
    if ($item_id) {
        $item = $db->find('item', '*', ['id', '=', $item_id]);
        Response::success('添加成功', $item);
    } else {
        Response::error('添加失败', 0);
    }
};