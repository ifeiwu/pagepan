<?php
// 压缩内容
return function ($str) {
    return $str ? base64_encode(gzencode($str)) : '';
};