<?php

namespace app\shop\controller;

use support\Db;
use support\Request;

class Cart
{
    // 添加到购物车
    public function add(Request $request)
    {
        $id = intval($request->post('id'));
        if (!$id) {
            return json_error();
        }

        $cart = cart();
        $attrs = $this->getGoodsAttrs($id, $request->post('specs'));
        $quantity = intval($request->post('quantity'));

        if ($cart->has($id, $attrs)) {
            $cart->update($id, $quantity, $attrs);
        } else {
            $cart->add($id, $quantity, $attrs);
        }

        return json_success('ok', $cart->getTotalItem());
    }

    // 调整商品数量
    public function quantity(Request $request)
    {
        $id = $request->get('id');
        $hash = $request->get('hash');
        $quantity = $request->get('quantity');

        $cart = cart();
        $is_update = $cart->update($id, $quantity, $hash);
        $data = [
            'totalPrice' => price_format($cart->getTotalWithDiscount())
        ];

        if ($is_update) {
            return json_success('ok', $data);
        } else {
            return json_error('', $data);
        }
    }

    // 移除商品
    public function remove(Request $request)
    {
        $id = $request->get('id');
        $hash = $request->get('hash');

        $cart = cart();
        $is_remove = $cart->remove($id, $hash);
        $data = [
            'totalPrice' => $cart->getTotalWithDiscount(),
            'totalItem' => $cart->getTotalItem()
        ];

        if ($is_remove) {
            return json_success('ok', $data);
        } else {
            return json_error('', $data);
        }
    }

    // 立即购买
    public function buynow(Request $request)
    {
        $id = intval($request->post('id'));
        if ($id) {
            $quantity = intval($request->post('quantity')) ?: 1;
            $attrs = $this->getGoodsAttrs($id, $request->post('specs'));
            $items = [['id' => $id, 'quantity' => $quantity, 'attributes' => $attrs]];
            $total = $attrs['price'] * $quantity;
        } else {
            $items = [];
            $total = 0;
            $quantity = 0;
        }

        session('shop-buynow', ['items' => $items, 'total' => $total, 'quantity' => $quantity]);

        return json_success('立即购买');
    }

    private function getGoodsAttrs($id = 0, $specs = null)
    {
//        $db = db();
//    $item = $db->find('goods', ['title', 'price', 'price_type', 'image', 'path', 'stock', 'delivery', 'utime'], [['id', '=', $id], 'AND', ['state', '=', 1]]);
        $item = Db::table('shop_goods')
            ->select('title', 'price', 'price_type', 'image', 'path', 'stock', 'delivery', 'utime')
            ->where('id', '=', $id)
            ->where('state', '=', 1)
            ->first();
        if (is_array($specs)) {
            $sku = Db::table('shop_goods_sku')
                ->select('price', 'price2')
                ->where('goods_id', '=', $id)
                ->where('specs', '=', json_encode2($specs))
                ->first();
//        $sku = $db->find('goods_sku', ['price', 'price2'], [['goods_id', '=', $id], 'AND', ['specs', '=', json_encode2($specs)]]);
            $item['price'] = $sku['price'];
            $item['specs'] = $specs;
        }

        return $item;
    }
}