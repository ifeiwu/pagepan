<?php
return function ($request_data) {
    $id = intval($request_data['id']);
    $status = intval($request_data['status']);

    $db = db();
    if ($db->update('order', ['status' => $status], ['id', '=', $id])) {
        // 已确认：商品减去库存
        if ($status == 1) {
            $items = $db->select('order_detail', ['goods_id', 'quantity', 'specs'], ['order_id', '=', $id]);
            foreach ($items as $item) {
                $goods_id = $item['goods_id'];
                $quantity = $item['quantity'];
                $specs = $item['specs'];
                $where = [['goods_id', '=', $goods_id], 'AND', ['specs', '=', $specs]];
                $sku = $db->find('goods_sku', ['stock', 'sale'], $where);
                // 有规格更新库存和销量
                if ($sku) {
                    $sku_sale = $sku['sale'];
                    $sku_stock = $sku['stock'];
                    $sku_sale = $sku_sale + $quantity;
                    $sku_stock = $sku_stock - $quantity;
                    $db->update('goods_sku', ['stock' => $sku_stock, 'sale' => $sku_sale], $where);
                    $sku_sum = $db->find('goods_sku', ['sum(sale) AS sum_sale', 'sum(stock) AS sum_stock'], ['goods_id', '=', $goods_id]);
                    $db->update('goods', ['stock' => $sku_sum['sum_stock'], 'sale' => $sku_sum['sum_sale']], ['id', '=', $goods_id]);
                }
                // 没规格更新库存和销量
                else {
                    $goods = $db->find('goods', ['stock', 'sale'], ['id', '=', $goods_id]);
                    $sale = intval($goods['sale']) + $quantity;
                    $stock = intval($goods['stock']) - $quantity;
                    $db->debug = true;
                    $db->update('goods', ['stock' => $stock, 'sale' => $sale], ['id', '=', $goods_id]);
                }
            }
        }
        Response::success('改变订单状态成功');
    } else {
        Response::error('改变订单状态失败');
    }
};