<?php
// 数组所有值合成 class
return function ($data) {

    if ( is_array($data) ) {
        return implode(' ', array_values($data));
    } else {
        return $data;
    }
};