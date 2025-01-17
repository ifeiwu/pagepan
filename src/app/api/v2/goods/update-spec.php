<?php
return function ($request_data) {
    $goods_id = intval($request_data['goodsid']);
    $spec_id = intval($request_data['specid']);
    $spec_name = filter_var($request_data['specname'], FILTER_SANITIZE_SPECIAL_CHARS);
    $spec_value = filter_var($request_data['specvalue'], FILTER_SANITIZE_SPECIAL_CHARS);;
    $where = [['id', '=', $spec_id], 'AND', ['goods_id', '=', $goods_id]];
    $data = ['goods_id' => $goods_id];

    if ($spec_name) {
        $data['name'] = $spec_name;
    }
    if ($spec_value) {
        $data['value'] = $spec_value;
    }

    $db = db();
    $db->debug = false;
    if ($db->update('goods_spec', $data, $where)) {
        Response::success('更新商品规格成功');
    } else {
        Response::error('更新商品规格失败');
    }
};