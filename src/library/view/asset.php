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
    $domain = $this->site['domain3'];
    if ( $isfull == false ) {
        $domain =  $domain ?: ROOT_URL;
    } else {
        $domain = $domain ?: $this->site['domain'];
    }

    $name = ltrim($name, '/');
    if ( strpos($name, '?') === false ) {
        return "{$domain}{$name}?{$this->site['timestamp']}";
    }

    return "{$domain}{$name}";
};