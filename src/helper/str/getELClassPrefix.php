<?php
// 获取原子html元素 class 前缀：如:bg-mix-10 => bg-mix, bg-mix-10-lg => bg-mix-lg, f-8 => f, relative-lg => relative-lg
// 注意：目前没有使用地方
return function ($class) {
    $breakpoints = ['sm', 'md', 'lg', 'xl', '2xl', '3xl'];
    $splits = explode('-', $class);
    $breakpoint = end($splits);

    if ( in_array($breakpoint, $breakpoints) )
    {
        if ( count($splits) == 2 || count($splits) == 3 ) {
            $prefix = "{$splits[0]}-{$breakpoint}";
        } elseif ( count($splits) == 4 ) {
            $prefix = "{$splits[0]}-{$splits[1]}-{$breakpoint}";
        }
    }
    else
    {
        if ( count($splits) == 1 || count($splits) == 2 ) {
            $prefix = "{$splits[0]}";
        } elseif ( count($splits) == 3 ) {
            $prefix = "{$splits[0]}-{$splits[1]}";
        }
    }

    return $prefix;
};