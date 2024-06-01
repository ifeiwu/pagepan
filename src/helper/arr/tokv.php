<?php
// 数组转键值对数组对象
return function ($data, $key_name = 'name', $value_name = 'value') {
    $_data = [];

    foreach ($data as $ov) {
        $value = $ov[$value_name];
        if ( $value ) {
            $_data[$ov[$key_name]] = $value;
        }
    }

    return $_data;
};