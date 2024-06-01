<?php
return function () {
    if ( isset($_SERVER) )
    {
        if ( isset($_SERVER['HTTP_X_FORWARDED_FOR']) ) {
            $realip = $_SERVER['HTTP_X_FORWARDED_FOR'];
            $realip = explode(',', $realip);
            $realip = $realip[0];
            $realip = empty($realip) ? ($_SERVER['REMOTE_ADDR']) : ($realip);
        } elseif ( isset($_SERVER['HTTP_CLIENT_IP']) ) {
            $realip = $_SERVER['HTTP_CLIENT_IP'];
        } else {
            $realip = $_SERVER['REMOTE_ADDR'];
        }
    }
    else
    {
        if ( getenv('HTTP_X_FORWARDED_FOR') ) {
            $realip = getenv('HTTP_X_FORWARDED_FOR');
            $realip = explode(',', $realip);
            $realip = $realip[0];
            $realip = empty($realip) ? ($_SERVER['REMOTE_ADDR']) : ($realip);
        } elseif ( getenv('HTTP_CLIENT_IP') ) {
            $realip = getenv('HTTP_CLIENT_IP');
        } else {
            $realip = getenv('REMOTE_ADDR');
        }
    }

    return $realip;
};