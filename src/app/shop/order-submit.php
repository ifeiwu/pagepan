<?php
return function () {
    // 街道名称
    $street = post('street');
    if (strlen($street) <= 2 || strlen($street) >= 20) {
        Response::error('街道名称长度 2-20 个字符', ['field' => 'street']);
    }
    // 门牌号
    $house = post('house');
    if (strlen($house) <= 5 || strlen($house) >= 100) {
        Response::error('门牌号长度 5-100 个字符', ['field' => 'house']);
    }
    // 联系人
    $linkman = post('linkman');
    if (strlen($linkman) <= 1 || strlen($linkman) >= 10) {
        Response::error('联系人长度 1-10 个字符', ['field' => 'linkman']);
    }
    // 手机号
    $phone = post('phone');
    if (!preg_match('/^1[0-9]{10}$/', $phone)) {
        Response::error('无效的手机号码', ['field' => 'phone']);
    }
    // 微信号
    $wechat = post('wechat');
    if (!preg_match('/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/', $wechat)) {
        Response::error('微信号格式错误', ['field' => 'wechat']);
    }
    // 订单备注
    $remark = post('remark');
    if (strlen($remark) >= 200) {
        Response::error('订单备注长度 1-200 个字符', ['field' => 'remark']);
    }

    $order = [];
    $address_id = post('address_id');
    if ($address_id) {
        $user_id = session('user.id');
        $order['user_id'] = $user_id; // 用户ID
        // 获取用户收货地址
        $address = $db->find('user_address', '*', [['user_id', '=', $user_id], 'AND', ['address_id', '=', $address_id]]);
        $street = $address['street'];
        $house = $address['house'];
        $linkman = $address['linkman'];
        $phone = $address['phone'];
        $wechat = $address['wechat'];
    }

    // 订单信息
    $order['sn'] = date('YmdHis') . substr(microtime(), 2, 6) . rand(1000, 9999); // 订单序号
    $order['ctime'] = time(); // 创建时间
    $order['is_new'] = 0; // 未读/已读状态
    $order['is_read'] = 0; // 未读/已读状态
    $order['status'] = 1; // 订单状态：1正常，2关闭
    $order['total'] = cart()->getTotalWithDiscount(); // 商品总额
    $order['score'] = floatval($score); // 获得积分
    $order['remark'] = $remark; // 买家备注

    // 收货地址
    $order['linkman'] = $linkman;
    $order['phone'] = $phone;
    $order['wechat'] = $wechat;
    $order['address'] = $street . $house;

    $db = db();
    $db->insert();
};