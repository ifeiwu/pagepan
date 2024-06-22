<?php
// item 图片输出
return function ($path, $image, $utime = false, $isfull = false) {

    if ( $image = trim($image) ) {
        // 站内上传的图片
        if ( ! preg_match('/^(https?:\/\/|\/\/)/i', $image) )
        {
            $image = view()->url(ltrim("$path/$image", '/'), $utime, $isfull);
        }
    } else {
        // 1像素透明图片，防止有些浏览器没有图片显示交叉图片占位符。
        $image = base64_decode('ZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBRUFBQUFCQ0FRQUFBQzFIQXdDQUFBQUMwbEVRVlI0QVdQNHp3QUFBZ0VCQUFidktNc0FBQUFBU1VWT1JLNUNZSUk9');
    }

    return $image;
};