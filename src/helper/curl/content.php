<?php
return function ($url, $params = [], $password = false, $format = 'json') {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_FAILONERROR, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

    if ( ! empty($params) ) {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
    }

    if ( $password !== false ) {
        curl_setopt($ch, CURLOPT_USERPWD, $password);
    }

    $content = curl_exec($ch);

    if ( curl_errno($ch) ) {
        return false;
        // throw new Exception(curl_error($ch));
    }

    curl_close($ch);

    if ( $format == 'json' ) {
        return json_decode($content, true);
    } else {
        return $content;
    }
};