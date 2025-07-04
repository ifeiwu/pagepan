<?php
return function ($request_data) {
    $error = [];

    $db = db();
    $ids = $request_data['id'];
    foreach ($ids as $id) {
        $trash = $db->find('trash', '*', ['id', '=', $id]);
        $table = $trash['table'];
        $isadd = $db->insert($table, json_decode($trash['data'], true));
        if ($isadd === false) {
            $error[] = $trash['title'];
        } else {
            $db->delete('trash', ['id', '=', $id]);
        }
    }

    if (count($error) === 0) {
        Response::success('还原成功');
    } else {
        Response::error('还原失败', $error);
    }
};