<?php
// 接口请求
return function ($url, $data = [], $token = '') {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Authorization: Bearer ' . $token
    ));

    $res = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if ( $code != 200 ) {
        $res = json_encode(['code' => 1, 'message' => $code]);
    } elseif ( $res === false ) {
        $error = curl_error($ch);
        $res = json_encode(['code' => 1, 'message' => "Api($url): $error"]);
    }

    curl_close($ch);

    return json_decode($res, true);
};