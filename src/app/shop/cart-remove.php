<?php
return function () {
    $id = get('id');
    $hash = get('hash');

    $cart = cart();
    $is_remove = $cart->remove($id, $hash);
    $data = [
        'totalPrice' => $cart->getTotalWithDiscount(),
        'totalItem' => $cart->getTotalItem()
    ];
    if ($is_remove) {
        Response::success('', $data);
    } else {
        Response::error('', $data);
    }
};