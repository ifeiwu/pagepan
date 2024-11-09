<?php
return function () {
    $id = get('id');
    $hash = get('hash');
    $quantity = get('quantity');

    $cart = cart();
    if ($cart->update($id, $hash, $quantity)) {
        Response::success('', ['totalPrice' => price_format($cart->getTotalWithDiscount())]);
    } else {
        Response::error('', ['totalPrice' => price_format($cart->getTotalWithDiscount())]);
    }
};