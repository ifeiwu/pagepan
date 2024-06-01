<?php
// 随机字符串
return function ($length, $type = 0) {

    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_ []{}<>~`+=,.;:/?|';

    switch ($type) {
        case 1:
            $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            break;
        case 2:
            $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            break;
        case 3:
            $chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
            break;
        case 4:
            $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            break;
        case 5:
            $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            break;
        case 6:
            $chars = 'abcdefghijklmnopqrstuvwxyz';
            break;
        case 7:
            $chars = '0123456789';
            break;
    }
    
    $str = '';
    for ( $i = 0; $i < $length; $i++ ) {
    	$str .= $chars[ mt_rand(0, strlen($chars) - 1) ];
    }
    
    return $str;
};