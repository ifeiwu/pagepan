<?php
return function () {
    $id = get('id');
    $hash = get('hash');
    $quantity = get('quantity');

    $cart = cart();
    if ($cart->update($id, $quantity, $hash)) {
        Response::success('', ['totalPrice' => price_format($cart->getTotalWithDiscount(), 2)]);
    } else {
        Response::error('', ['totalPrice' => price_format($cart->getTotalWithDiscount(), 2)]);
    }
};