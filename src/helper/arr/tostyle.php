<?php
// 数组键值合成 style
return function ($data) {
    $style = '';

    if ( is_array($data) ) {
        foreach ($data as $key => $value) {
            $style .= $key . ':' . $value . ';';
        }
    } else {
        $style = $data;
    }

    return $style;
};