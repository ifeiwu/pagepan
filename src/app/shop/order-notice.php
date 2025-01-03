<?php
// 用户下单消息推送到手机 PushMe
return function () {
    $key = helper('site/find', ['shop_pushme']);
    if ($key) {
        if (isset($_POST['order_sn'])) {
            $title = '[s]线上店铺有新的订单';
            $content = "订单号: {$_POST['order_sn']}，请到后台查看订单详情。";
        } else {
            $title = '[f]线上店铺有用户下单失败';
            $content = "联系人: {$_POST['linkman']}\n手机号: {$_POST['phone']}\n微信号: {$_POST['wechat']}\n收货地址: {$_POST['road']}{$_POST['house']}\n备注信息: {$_POST['remark']}";
        }

        $res = file_get_contents('https://push.i-i.me/', false, stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => 'Content-type: application/x-www-form-urlencoded',
                'content' => http_build_query([
                    'push_key' => $key,
                    'title' => $title,
                    'content' => $content,
                ])
            ]
        ]));

        if ($res != 'success') {
            Log::pushme("推送失败:", $_POST);
        }
    } else {
        if (!isset($_POST['order_sn'])) {
            Log::order("下单失败:", $content);
        }
    }
};