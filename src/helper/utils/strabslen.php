<?php
// 计算字符串绝对长度，ASCII 字符（英文、数字、字母等）长度算 1
// 非 ASCII 字符（汉字等多字节字符）长度算 2
return function ($str) {
    return strlen(preg_replace("#[^\x{00}-\x{ff}]#u", '**', $str));
};