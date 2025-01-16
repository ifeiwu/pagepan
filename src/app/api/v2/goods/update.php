<?php
return function ($request_data) {
    // 库存小于0设置下架状态
    /*$inventory = intval($request_data['inventory']);
    if ($inventory <= 0) {
        $request_data['state'] = 0;
    }*/
    $request_data['price'] = price_format($request_data['price']);
    if (helper('api/v2/updateItem', ['goods', $request_data])) {
        $db = db();
        $db->debug = false;

        $goods_id = $request_data['id'];
        $specs = $request_data['specs'];
        if (is_array($specs)) {
            /*$specs = $request_data['specs'];
            $prices = $request_data['prices'];
            $stocks = $request_data['stocks'];
            foreach($skuids as $i => $skuid) {
                $data = [
                    'goods_id' => $goods_id,
                    'specs' => json_encode($specs[$i], JSON_UNESCAPED_UNICODE),
                    'price' => intval($prices[$i]),
                    'stock' => intval($stocks[$i])
                ];
                if ($db->has('goods_sku', ['id', '=', $skuid])) {
                    if (!$db->update('goods_sku', $data, ['id', '=', $skuid])) {
                        Response::error('更新商品规格失败');
                    }
                } else {
                    if (!$db->insert('goods_sku', $data)) {
                        Response::error('添加商品规格失败');
                    }
                }
            }*/
            // 删除商品之前所有规格，再重新添加规格
            if ($db->delete('goods_sku', ['goods_id', '=', $goods_id])) {
                $prices = $request_data['prices'];
                $stocks = $request_data['stocks'];
                $sku_values = [];
                foreach($specs as $i => $spec) {
                    $sku_values[$i] = [$goods_id, json_encode($spec, JSON_UNESCAPED_UNICODE), price_format($prices[$i]), intval($stocks[$i])];
                }
                $ids = $db->inserts('goods_sku', ['goods_id', 'specs', 'price', 'stock'], $sku_values);
                if (count($ids) !== count($sku_values)) {
                    Response::error('添加商品规格失败');
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