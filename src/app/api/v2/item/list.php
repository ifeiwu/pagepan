<?php
return function ($request_data) {
    $table = $request_data['table'] ?: 'item';
    $column = $request_data['column'] ?: '*';
    $where = $request_data['where'] ?: '1 = 1';
    $order = $request_data['order'] ?: ['sortby' => 'DESC', 'id' => 'DESC'];
    $perpage = $request_data['perpage'] ?: 0;

    $db = db();
    // 数据分页
    if ($perpage > 0) {
        $pagenum = $request_data['pagenum'] ?: 1;
        $pagenum = $pagenum ? $pagenum - 1 : 0;
        $total = $db->count($table, $where);
        $list = $db->select($table, $column, $where, $order, [$pagenum * $perpage, $perpage]);

        foreach ($list as $i => $item) {
            $pid = $item['pid'];
            if ($pid > 0) {
                $_category = $db->find($table, ['id', 'title', 'alias'], [['id', '=', $pid]]);
                $list[$i]['_category'] = json_encode($_category);
            }
        }

        $data = ['list' => $list, 'total' => $total, 'perpage' => $perpage, 'pagenum' => $pagenum];
    } else {
        if ($limit = $request_data['limit']) {
            $data = $db->select($table, $column, $where, $order, $limit);
        } else {
            $data = $db->select($table, $column, $where, $order);
        }
    }

    Response::success('', $data);
};