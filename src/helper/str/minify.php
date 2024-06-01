<?php
// CSS,JS 压缩
return function ($code, $lang = 'css') {
    
    if ( $lang == 'css' ) {
        $minifier = new \MatthiasMullie\Minify\CSS($code);
    } elseif ( $lang == 'js' ) {
        $minifier = new \MatthiasMullie\Minify\JS($code);
    }

    return $minifier->minify();
};