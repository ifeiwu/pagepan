<?php
// 判断是否是JSON格式
return function ($str) {
    json_decode($str);

    return json_last_error() == JSON_ERROR_NONE;
};