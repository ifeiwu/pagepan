<?php
// 用户下单消息通知
return function () {
    $order_sn = $_POST['order_sn'];
    // 系统通知：后台订单管理页面定时检查是否有新订单
    if ($order_sn) {
        $savedir = DATA_PATH . 'order/new';
        FS::rmkdir($savedir);
        FS::write("{$savedir}/{$order_sn}", time());
    } else {
        $data = ['联系人' => $_POST['linkman'], '手机号' => $_POST['phone'], '微信号' => $_POST['wechat'], '收货地址' => "{$_POST['road']}{$_POST['house']}", '备注信息' => $_POST['remark']];
        $savedir = DATA_PATH . 'order/err';
        FS::rmkdir($savedir);
        FS::json("{$savedir}/" . uniqid() . '.json', $data);
    }

    // 微信推送通知
    _pushwx($order_sn, $data);

    // pushme推送通知
    _pushme($order_sn, $data);
};

/**
 * 微信推送通知
 * @param $order_sn
 * @param $data
 * @return void
 */
function _pushwx($order_sn = '', $data = []) {
    $pushwx_url = helper('site/value', ['shop_pushwx']);
    if ($pushwx_url) {
        if ($order_sn) {
            $title = "SOHO店有新的订单：{$order_sn}";
            $content = "订单号: {$order_sn}，请到后台查看订单详情。";
        } else {
            $title = 'SOHO店有用户下单失败';
            $content = '';
            foreach ($data as $key => $value) {
                $content .= "{$key}: {$value}\n";
            }
        }
        // 推送信息
        $json = file_get_contents($pushwx_url, false, stream_context_create([
            'http' => [
                'method' => 'POST',
                'content' => http_build_query([
                    'title' => $title,
                    'content' => $content,
                ])
            ]
        ]));

        $res = json_decode2($json);
        if ($res['error_code'] != 0) {
            Log::pushwx("推送失败：{$res['error_message']}", $_POST);
        }
    }
}

/**
 * pushme推送通知
 * @param $order_sn
 * @param $data
 * @return void
 */
function _pushme($order_sn = '', $data = []) {
    $pushme_key = helper('site/value', ['shop_pushme']);
    if ($pushme_key) {
        if ($order_sn) {
            $title = "[s]SOHO店有新的订单：{$order_sn}";
            $content = "订单号: {$order_sn}，请到后台查看订单详情。";
        } else {
            $title = '[f]SOHO店有用户下单失败';
            $content = '';
            foreach ($data as $key => $value) {
                $content .= "{$key}: {$value}\n";
            }
        }
        // 推送信息
        $res = file_get_contents('https://push.i-i.me/', false, stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => 'Content-type: application/x-www-form-urlencoded',
                'content' => http_build_query([
                    'push_key' => $pushme_key,
                    'title' => $title,
                    'content' => $content,
                ])
            ]
        ]));

        if ($res != 'success') {
            Log::pushme("推送失败:", $_POST);
        }
    }
}