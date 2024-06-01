<?php
// 解压内容
return function ($str) {
    return $str ? gzdecode(base64_decode($str)) : '';
};