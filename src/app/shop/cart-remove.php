<?php
return function () {
    $id = get('id');
    $hash = get('hash');

    $cart = cart();
    if ($cart->remove($id, $hash)) {
        Response::success('', ['totalPrice' => price_format($cart->getTotalWithDiscount())]);
    } else {
        Response::error('', ['totalPrice' => price_format($cart->getTotalWithDiscount())]);
    }
};