<?php
// 添加到购物车
return function () {
    $id = intval($_POST['id']);
    if ($id) {
        $attrs = helper('cart/getGoodsAttrs', [$id, $_POST['specs']]);
        $cart = cart();
        $quantity = $_POST['quantity'];
        if ($cart->has($id, $attrs)) {
            $cart->update($id, $quantity, $attrs);
        } else {
            $cart->add($id, $quantity, $attrs);
        }
        Response::success('', $cart->getTotalItem());
    } else {
        Response::error();
    }
};