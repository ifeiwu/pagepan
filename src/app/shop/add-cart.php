<?php
// 添加到购物车
return function () {
    $id = intval($_GET['id']);
    if ($id) {
        $attrs = helper('cart/getGoodsAttrs', [$id]);
        $cart = cart();
        $quantity = intval($_GET['quantity']);
        $quantity = $quantity ? $quantity : 1;
        if ($cart->isItemExists($id, $attrs)) {
            $cart->update($id, $quantity, $attrs);
        } else {
            $cart->add($id, $quantity, $attrs);
        }
        Response::success('', $cart->getTotalItem());
    } else {
        Response::error();
    }
};