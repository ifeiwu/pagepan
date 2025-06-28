<?php
// 立即购买
return function () {
    $id = intval($_POST['id']);
    if ($id) {
        $quantity = intval($_POST['quantity']) ?: 1;
        $attrs = helper('cart/getGoodsAttrs', [$id, $_POST['specs']]);
        $items = [['id' => $id, 'quantity' => $quantity, 'attributes' => $attrs]];
        $total = $attrs['price'] * $quantity;
    } else {
        $items = [];
        $total = 0;
        $quantity = 0;
    }

    session('shop-buynow', ['items' => $items, 'total' => $total, 'quantity' => $quantity]);

    Response::success('立即购买');
};