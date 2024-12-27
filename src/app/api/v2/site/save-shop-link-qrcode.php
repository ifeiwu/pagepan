<?php
return function ($request_data) {
    $bool = true;
    $qrcode_data = $request_data['qrcode_data'];
    if ($qrcode_data) {
        $data = str_replace('data:image/png;base64,', '', $qrcode_data);
        $bool = file_put_contents(WEB_ROOT . 'shop-qrcode.png', base64_decode($data));
    }
    if ($bool !== false) {
        return Response::success('保存商店二维码图片成功');
    } else {
        return Response::error('保存商店二维码图片失败');
    }
};