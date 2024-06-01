<?php
// 字符串加密
return function ($str, $key) {
    $result = '';

    for ($i = 0; $i < strlen($str); $i ++)
    {
        $char = substr($str, $i, 1);
        $keychar = substr($key, ($i % strlen($key)) - 1, 1);
        $char = chr(ord($char) + ord($keychar));
        $result .= $char;
    }
    
    return base64_encode($result);
};