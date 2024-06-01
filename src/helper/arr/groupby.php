<?php
// 通过 key 给二维数组分组
return function ($array, $key = 'pid') {
    $group = [];

    foreach ($array as $value) {
        $group[$value[$key]][] = $value;
    }

    return $group;
};