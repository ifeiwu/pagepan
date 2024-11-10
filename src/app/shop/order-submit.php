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

    // 订单信息
    $order = [];
    $cart = cart();
    // 登录用户使用的地址
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

    $order['sn'] = date('YmdHis') . substr(microtime(), 2, 6) . rand(1000, 9999); // 订单序号
    $order['ctime'] = time(); // 创建时间
    $order['is_new'] = 0; // 0未读/1已读状态
    $order['is_read'] = 0; // 0未读/1已读状态
    $order['status'] = 1; // 订单状态：1正常/2关闭
    $order['price'] = $cart->getTotalWithDiscount(); // 实付总额
    $order['score'] = floatval($score); // 获得积分
    $order['remark'] = $remark; // 买家备注
    $order['linkman'] = $linkman; // 联系人
    $order['phone'] = $phone; // 手机号
    $order['wechat'] = $wechat; // 微信号
    $order['address'] = $street . $house; // 收货地址

    $db = db();
    $order_id = $db->insert('order', $order);
    if ($order_id) {
        // 添加商品清单
        $is_add_item = true;
        $items = $cart->getItems();
        foreach ($items as $item) {
            $quantity = $item['quantity'];
            $attrs = $item['attributes'];
            $detail = [
                'order_id' => $order_id,
                'goods_id' => $item['id'],
                'quantity' => $quantity,
                'title' => $attrs['title'],
                'specs' => $attrs['specs'],
                'price' => $attrs['price'],
                'image' => $attrs['image'],
                'path' => $attrs['path'],
            ];
            if (!$db->insert('order_detail', $detail)) {
                $is_add_item = false;
                break;
            }
        }
        // 提交或回滚事务
        if ($is_add_item !== false) {
            $cart->clear();
            Response::success('添加订单成功', ['id' => $order_id]);
        } else {
            $db->delete('order', [['id', '=', $order_id]]);
            $db->delete('order_detail', [['order_id', '=', $order_id]]);
            Response::error('添加订单商品失败');
        }
    } else {
        Response::error('添加订单失败');
    }
};