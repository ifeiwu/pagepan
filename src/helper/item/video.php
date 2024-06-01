<?php
// item 视频输出
return function ($path, $video, $utime = false, $isfull = false) {

    if ( $video = trim($video) )
    {
        // 站内上传的视频
        if ( ! preg_match('/^(https?:\/\/|\/\/)/i', $video) )
        {
            $video = view()->url($path . '/' . $video, $utime, $isfull);
        }
    }

    return $video;
};