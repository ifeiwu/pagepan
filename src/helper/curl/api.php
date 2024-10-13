<?php
// 接口请求
return function ($url, $data = [], $token = '') {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Authorization: Bearer ' . $token
    ));

    $res = curl_exec($ch);

    if (curl_errno($ch)) {
        $error = curl_error($ch);
        $res = ['code' => 1, 'message' => $error];
    } else {
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if ($code == 200) {
            $res = json_decode($res, true);
        } else {
            $res = ['code' => 1, 'message' => "HTTP Status Code: $code"];
        }
    }

    if (!is_array($res)) {
        $res = json_encode(['code' => 1, 'message' => "Curl Error: $url"]);
    }

    curl_close($ch);

    return $res;
};