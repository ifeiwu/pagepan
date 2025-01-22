<?php
return function ($request_data) {
    // 库存小于0设置下架状态
    /*$inventory = intval($request_data['inventory']);
    if ($inventory <= 0) {
        $request_data['state'] = 0;
    }*/
//    $request_data['price'] = price_format($request_data['price']);
    if (helper('api/v2/updateItem', ['goods', $request_data])) {
        $db = db();
        $db->debug = false;

        $goods_id = $request_data['id'];
        $specs = $request_data['specs'];
        if (is_array($specs)) {
            // 删除商品之前所有规格，再重新添加规格
            if ($db->delete('goods_sku', ['goods_id', '=', $goods_id])) {
                $prices = $request_data['prices'];
                $stocks = $request_data['stocks'];
                $sku_values = [];
                foreach($specs as $i => $spec) {
                    $sku_values[$i] = [$goods_id, json_encode2($spec), $prices[$i], intval($stocks[$i])];
                }
                $ids = $db->inserts('goods_sku', ['goods_id', 'specs', 'price', 'stock'], $sku_values);
                if (count($ids) !== count($sku_values)) {
                    Response::error('添加商品规格失败');
                }
                $goods_sku = $db->find('goods_sku', ['max(price) AS max_price', 'min(price) AS min_price'], ['goods_id', '=', $goods_id]);
                if ($goods_sku) {
                    $data = ['max_price' => $goods_sku['max_price'], 'min_price' => $goods_sku['min_price']];
                    if (!$db->update('goods', $data, ['id', '=', $goods_id])) {
                        Response::error('更新商品价格区间失败');
                    }
                } else {
                    Response::error('获取商品规格价格区间失败');
                }
            } else {
                Response::error('删除商品规格失败');
            }
        }

        $item = $db->find('goods', '*', ['id', '=', $goods_id]);
        $pid = $item['pid'];
        if ($pid > 0) {
            $item['pid'] = $db->find('goods', 'title', ['id', '=', $pid], [], 0);
        }
        Response::success('更新商品成功', $item);
    } else {
        Response::error('更新商品失败');
    }
};