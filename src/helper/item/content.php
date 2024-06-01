<?php
// item 内容输出
return function ($content, $content_type = 'md') {

    if ( $content_type == 'md' )
    {
        $content = helper('str/parsedown', [html_decode($content)]);

        $content = preg_replace('/<a(.*?)>(.*?)<\/a>/i', "<a $1 target=\"_blank\">$2</a>", $content);
    }
    else
    {
        $content = html_decode($content);
    }

    return preg_replace('/<img.+?src=[\'"](.+?\.(jpg|jpge|gif|svg|apng|png|webp))[\'"](.*?)>/i', "<img class=\"lazyload zooming\" data-src=\"$1\" src=\"assets/image/loading.svg\" data-expand=\"-20\" $3>", $content);
};