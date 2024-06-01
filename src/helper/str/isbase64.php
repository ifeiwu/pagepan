<?php
// 是否 base64 编码
return function ($str) {
    return $str == base64_encode(base64_decode($str)) ? true : false;
};