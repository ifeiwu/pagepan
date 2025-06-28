<?php
return function () {
    $id = get('id');
    $hash = get('hash');
    $quantity = get('quantity');

    $cart = cart();
    $is_update = $cart->update($id, $quantity, $hash);
    $data = ['totalPrice' => price_format($cart->getTotalWithDiscount())];
    if ($is_update) {
        Response::success('', $data);
    } else {
        Response::error('', $data);
    }
};