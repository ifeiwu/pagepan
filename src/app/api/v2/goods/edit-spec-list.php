<?php
return function ($request_data) {
    $column = ['id', 'title'];
    $where = [['type', '=', 2], 'AND', ['state', '=', 1]];
    $order = ['sortby' => 'DESC', 'ctime' => 'DESC'];

    $db = db();
    $db->debug = false;
    $specs = $db->select('goods_spec', $column, $where, $order);

    if ($specs) {
        foreach ($specs as $i => $spec) {
            $specs[$i]['_child'] = $db->select('goods_spec', $column, [['pid', '=', $spec['id']], 'AND', ['state', '=', 1]], $order);
        }
    } else {
        $specs = [];
    }

    Response::success('商品编辑规格列表', $specs);
};