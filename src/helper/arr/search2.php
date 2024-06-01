<?php
// 查找二维组键和值匹配并返回值或下标
return function ($list, $key, $value, $return = 'value') {
    $list = is_array($list) ? $list : [];
    // 获取二维数组键列表
    $list2 = array_column($list, $key);
    $index = array_search($value, $list2);

    if ( $return == 'value' ) {
        return $list[$index];
    } else {
        return $index;
    }
};