<?php
// item 返回图标图片，支持返回svg源代码
return function ($path, $image, $title = '', $utime = false) {
    // 如果没有图片，则返回标题名称。
    if ( ! $image = trim($image) ) return $title;

    // 如果是svg源代码，则直接返回。
    if ( preg_match('/\<svg.*?\>.*/i', $image) )
    {
        return urldecode($image);
    }

    // 站内上传的图片
    if ( ! preg_match('/^(https?:\/\/|\/\/)/i', $image) )
    {
        $image = view()->url(ltrim("$path/$image", '/'), $utime, true);
    }

    // 如是是svg图片，则返回源代码
    if ( preg_match('/.+?\.svg/i', $image) )
    {
//            return file_get_contents($image, false, stream_context_create(['ssl'=>['verify_peer'=>false, 'verify_peer_name'=>false]])); // 图标很多的时间，速度会很慢。
        return '<img src="'.$image.'" alt="" onload="fetch(\''.$image.'\').then(response => response.text()).then(data => {this.parentNode.innerHTML=data})">';
    }
    // 其它图片格式，返回图片标签。
    else
    {
        return '<img src="' . $image . '" alt="' . $title . '" loading="lazy">';
    }
};