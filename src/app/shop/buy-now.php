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
        $total = '0.00';
    }

    session('shop-buy-now', ['items' => $items, 'total' => $total]);

    Response::success('立即购买');
};