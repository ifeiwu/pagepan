<?php
// 获取分类 url
return function ($category) {

    $link_url = view()->setting['category.link.url'];

    if ( $link_url !== false )
    {
        if ( is_string($link_url) ) {
            return helper('url/parseStrGet', [$link_url]);
        } else {
            return helper('db/getPageAlias') . '/category/' . $category['id'] . '.html';
        }
    }
    else {
        return 'javascript:;';
    }
};