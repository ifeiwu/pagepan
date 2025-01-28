<?php
// 立即购买
return function () {
    $id = intval($_POST['id']);
    if ($id) {
        $quantity = intval($_POST['quantity']) ?: 1;
        $attrs = helper('cart/getGoodsAttrs', [$id, $_POST['specs']]);
        $items = [['quantity' => $quantity, 'attributes' => $attrs]];
        $total = price_format($attrs['price'] * $quantity);
    } else {
        $items = [];
        $total = 0;
        $quantity = 0;
    }

    session('shop-buynow', ['items' => $items, 'total' => $total, 'quantity' => $quantity]);

    Response::success('立即购买');
};