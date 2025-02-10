<?php
/**
 * 文件下载
 */
return function ($url_file, $save_file) {
    $fp = @fopen($save_file, 'w+');
    if (!$fp) {
        $error = error_get_last();
        return $error['message'];
    } else {
        $ch = curl_init($url_file);
        curl_setopt($ch, CURLOPT_FILE, $fp);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        curl_setopt($ch, CURLOPT_TIMEOUT, 300);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

        if (curl_exec($ch) === false) {
            return curl_error($ch);
        }

        if (curl_getinfo($ch, CURLINFO_HTTP_CODE) == 200) {
        } else {
            unlink($save_file);
        }

        fclose($fp);
        curl_close($ch);
    }

    return true;
};