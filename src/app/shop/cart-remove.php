<?php
return function () {
    $id = get('id');
    $hash = get('hash');

    $cart = cart();
    if ($cart->remove($id, $hash)) {
        Response::success('', ['totalPrice' => price_format($cart->getTotalPrice())]);
    } else {
        Response::error('', ['totalPrice' => price_format($cart->getTotalPrice())]);
    }
};