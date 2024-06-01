<?php
// URL模板 $_GET 参数替换，格式：products?cid=[get.cid]&title=[get.title]
return function ($url) {

    if ( $url !== false )
    {
        preg_match_all("/\[get\.(\w*?)]/i", $url, $matches, PREG_SET_ORDER);

        if ( !empty($matches) )
        {
            foreach ($matches as $matche)
            {
                $name = $matche[1];
                $url = str_replace('[get.' . $name . ']', $_GET[$name], $url);
            }
        }
    }

    return $url;
};