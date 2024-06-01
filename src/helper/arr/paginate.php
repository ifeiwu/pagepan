<?php
// 数组分页
return function ($data, $perpage, $pagenum) {
    $chunk_array = array_chunk($data, $perpage, true);
    $_data = [];
    
    if ( is_numeric($pagenum) ) {
        if ( $chunk_array[$pagenum - 1] ) {
            foreach ($chunk_array[$pagenum - 1] as $key => $text) {
                $_data[$key] = $text;
            }
        }
    }
    
    return ['data' => $_data, 'total_page' => count($chunk_array)];
};