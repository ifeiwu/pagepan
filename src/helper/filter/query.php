<?php
// 过滤只保留中文，英文以及数字
return function ($str) {
    $pattern = '/[\x{4e00}-\x{9fa5}a-zA-Z0-9-_\s]/u';
    preg_match_all($pattern, $str, $result);

    return join('', $result[0]);
};