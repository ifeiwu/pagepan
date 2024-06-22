<?php
// 输出完整文件链接
return function ($path, $name, $utime = false, $isfull = false) {

    if ( $name = trim($name) ) {
        // 站内上传的文件
        if ( ! preg_match('/^(https?:\/\/|\/\/)/i', $name) )
        {
            $name = view()->url(ltrim("$path/$name", '/'), $utime, $isfull);
        }
    }

    return $name;
};