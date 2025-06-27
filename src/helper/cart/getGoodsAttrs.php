<?php
return function ($id = 0, $specs = null) {
    $db = db();
    $item = $db->find('goods', ['title', 'price', 'price_type', 'image', 'path', 'stock', 'delivery', 'utime'], [['id', '=', $id], 'AND', ['state', '=', 1]]);

    if (is_array($specs)) {
        $specs_json = json_encode2($specs);
        $sku = $db->find('goods_sku', ['price', 'price2'], [['goods_id', '=', $id], 'AND', ['specs', '=', json_encode2($specs)]]);
        $item['price'] = $sku['price'];
        $item['specs'] = $specs;
    }

    return $item;
};