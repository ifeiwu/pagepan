<?php
return function ($request_data) {
    $goods_id = intval($request_data['goodsid']);

    $db = db();
    $db->debug = false;
    $specs = $db->select('goods_spec', ['id', 'name', 'value'], ['goods_id', '=', $goods_id], ['id' => 'ASC']);
    /*if ($specs) {
        foreach ($specs as $i => $spec) {
            $specs[$i]['_child'] = explode(',', $spec['value']);
        }
    } else {
        $specs = [];
    }*/

    $gskus = $db->select('goods_sku', '*', ['goods_id', '=', $goods_id]);

    Response::success('商品编辑规格列表', ['gskus' => $gskus, 'specs' => $specs]);
};