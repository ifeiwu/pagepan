<?php
return function () {
    $goods_id = post('goodsid');
    $specs = post('specs');
    $db = db();
    $where = [['goods_id', '=', $goods_id], 'AND', ['specs', '=', $specs]];
    $sku = $db->find('goods_sku', ['stock', 'price'], $where);

    Response::success('', $sku);
};