<?php
/**
 * 构建超链接
 */
return function ($name = '', $isfull = false) {
    // 站外链接
    if ( preg_match('/^(https?:\/\/|\/\/)/i', $name) ) {
        return $name;
    }
    // 是否添加域名
    if ( $isfull == false ) {
        $domain = ROOT_URL;
    } else {
        $domain = $this->site['domain'];
    }

    return "{$domain}{$name}";
};