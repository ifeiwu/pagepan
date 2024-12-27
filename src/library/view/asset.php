<?php
/**
 * 资源文件加载
 */
return function ($name = '', $isfull = false) {
    // 站外链接
    if ( preg_match('/^(https?:\/\/|\/\/)/i', $name) ) {
        return $name;
    }
    // 加速域名或网站域名
    $domain3 = SITE['domain3'];
    if ( $domain3 ) {
        $domain = $domain3;
    } else {
        if ( $isfull == false ) {
            $domain = ROOT_URL;
        } else {
            $domain = SITE['domain'];
        }
    }

    $name = ltrim($name, '/');
    if ( strpos($name, '?') === false ) {
        return "{$domain}{$name}?" . SITE['timestamp'];
    }

    return "{$domain}{$name}";
};