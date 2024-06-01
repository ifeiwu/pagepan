<?php
// 字符串解密
return function ($str, $key) {
    $result = '';
    $str = base64_decode($str);
    
    for ($i = 0; $i < strlen($str); $i ++)
    {
        $char = substr($str, $i, 1);
        $keychar = substr($key, ($i % strlen($key)) - 1, 1);
        $char = chr(ord($char) - ord($keychar));
        $result .= $char;
    }
    
    return $result;
};