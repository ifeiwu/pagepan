<?php
return function () {
    $id = get('id');
    $hash = get('hash');

    $cart = cart();
    if ($cart->remove($id, $hash)) {
        Response::success('', ['totalPrice' => $cart->getTotalWithDiscount()]);
    } else {
        Response::error('', ['totalPrice' => $cart->getTotalWithDiscount()]);
    }
};