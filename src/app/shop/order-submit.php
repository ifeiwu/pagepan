<?php
// 保存提交的订单
return function () {
    // 令牌验证
    $_token = preg_replace('/[^0-9a-z]+/', '', $_GET['_token']);
    if (!helper('form/token', [$_token])) {
        Response::error('invalid token');
    }

    $site = helper('site/kv', [
        ['shop_iconcaptcha', 'shop_delivery', 'shop_delivery_fields', 'shop_address', 'shop_limit_region']
    ]);

    // 开启地区访问限制
//    $limit_region = $site['shop_limit_region'];
//    if ($limit_region) {
//        $ip_info = helper('ip/info', [Request::ip()]);
//        if ($ip_info) {
//            if ($ip_info['prov'] != $limit_region) {
//                Response::error('您所在的省份无法下订单');
//            }
//            if ($ip_info['city'] != $limit_region) {
//                Response::error('您所在的城市无法下订单');
//            }
//            if ($ip_info['district'] != $limit_region) {
//                Response::error('您所在的地区无法下订单');
//            }
//        }
//    }

    // 图标验证
    if ($site['shop_iconcaptcha'] == 1) {
        loader_vendor();
        session_start();
        $options = Config::file('iconcaptcha');
        $captcha = new \IconCaptcha\IconCaptcha($options);
        $validation = $captcha->validate($_POST);
        if (!$validation->success()) {
            Response::error('点击图标验证失败', ['field' => 'iconcaptcha-widget']);
        }
    }

    // 提取会话信息
    $buynow = session('shop-buynow');
    if ($buynow != null) {
        $order_quantity = $buynow['quantity'];
        $order_total = $buynow['total'];
        $order_items = $buynow['items'];
    } else {
        $cart = cart();
        $order_quantity = $cart->getTotalQuantity();
        $order_total = $cart->getTotalWithDiscount();
        $order_items = $cart->getItems();
    }

    // 全局配送方式
    $delivery = $site['shop_delivery'];

    // 商品独立设置的配送方式
    if ($delivery == 4) {
        $delivery = $order_items[0]['attributes']['delivery'];
    }

    // 联系方式字段
    $delivery_fields = json_decode2($site['shop_delivery_fields'] ?: '[]');
    $delivery_fields = $delivery_fields[$delivery];
    $res = _verifyDeliveryFields($delivery_fields);
    if (is_array($res)) {
        if (!$res['err_msg']) {
            list($roads, $house, $linkman, $phone, $wechat, $qq, $email, $doortime) = $res['data'];
        } else {
            Response::error($res['err_msg'], ['field' => $res['err_name']]);
        }
    }

    // 订单备注
    $remark = post('remark', 'escape');
    $remark_length = mb_strlen($remark, 'UTF-8');
    if ($remark_length >= 200) {
        Response::error('订单备注长度 2-100 个字符', ['field' => 'remark']);
    }

    // 店铺地址
    $shop_address = $site['shop_address'];
    $shop_address = json_decode($shop_address, true);
    $province = $shop_address['province'];
    $city = $shop_address['city'];
    $district = $shop_address['district'];

    // 订单信息
    $order = [];
    $order['delivery'] = $delivery; // 配送方式
    $order['ctime'] = time(); // 创建时间
    $order['status'] = 0; // 订单状态：0未确认/1已确认/2已签收/3已取消
    $order['quantity'] = $order_quantity; // 商品总数量
    $order['total'] = $order_total; // 实付总额
    $order['remark'] = $remark; // 买家备注
    $order['linkman'] = $linkman; // 联系人
    $order['phone'] = $phone; // 手机号
    $order['wechat'] = $wechat; // 微信号
    $order['qq'] = $qq; // QQ号
    $order['email'] = $email; // 邮箱地址
    $order['doortime'] = $doortime; // 期望上门时间
    // 收货地址
    if ($roads || $house) {
        $order['address'] = "$province,$city,$district,$roads,$house";
    }

    try {
        $db = db();
        $db->pdo->beginTransaction();
        $order_id = $db->insert('order', $order);
        if ($order_id) {
            // 订单序号
            $sn = str_pad($order_id, 8, '0', STR_PAD_LEFT);
            if (false === $db->update('order', ['sn' => $sn], ['id', '=', $order_id])) {
                $db->pdo->rollBack();
                Response::error('更新订单号失败~', ['id' => 0]);
            }
            // 添加商品清单
            $is_add_items = true;
            foreach ($order_items as $item) {
                $quantity = $item['quantity'];
                $attrs = $item['attributes'];
                $specs = json_encode2($attrs['specs'] ?: '{}');
                $detail = [
                    'order_id' => $order_id,
                    'goods_id' => $item['id'],
                    'quantity' => $quantity,
                    'title' => $attrs['title'],
                    'specs' => $specs,
                    'price' => $attrs['price'],
                    'image' => $attrs['image'],
                    'path' => $attrs['path'],
                ];
                if (false === $db->insert('order_detail', $detail)) {
                    $is_add_items = false;
                    break;
                }
            }
            if ($is_add_items == true) {
                $db->pdo->commit();
                $order['sn'] = $sn;
                session('order_info', $order);
                // 清理订单会话
                if ($buynow != null) {
                    session('shop-buynow', null);
                } else {
                    $cart->clear();
                }
                Response::success('下单成功~', ['id' => $order_id, 'sn' => $sn]);
            } else {
                $db->pdo->rollBack();
                Response::error('添加订单商品失败~', ['id' => 0]);
            }
        } else {
            $db->pdo->rollBack();
            Response::error('下单失败，请稍候刷新页面重试~', ['id' => 0]);
        }
    } catch (Exception $e) {
        $db->pdo->rollBack();
        debug($e->getMessage());
        Response::error('下单失败，系统发生异常~', ['id' => 0]);
    }
};

// 验证表单字段
function _verifyDeliveryFields($delivery_fields) {
    $message = null;
    $data = [];
    foreach ($delivery_fields as $name => $field) {
        if ($field['enabled'] == 0) {
            continue;
        }
        $required = $field['required'];
        $value = post($name, 'escape');
        $data[$name] = $value;
        switch ($name) {
            case 'roads':
                // 道路名
                if ($required == 1 && empty($value)) {
                    $message = '请选择道路名称';
                }
                break;
            case 'house':
                // 门牌号
                if ($required == 1 || !empty($value)) {
                    $house_length = mb_strlen($value, 'UTF-8');
                    if ($house_length <= 2 || $house_length >= 30) {
                        $message = '门牌号长度 2-30 个字符';
                    }
                }
                break;
            case 'linkman':
                // 联系人
                if ($required == 1 || !empty($value)) {
                    $linkman_length = mb_strlen($value, 'UTF-8');
                    if ($linkman_length <= 1 || $linkman_length >= 5) {
                        $message = '联系人长度 1-5 个字符';
                    }
                }
                break;
            case 'phone':
                // 手机号
                if ($required == 1 || !empty($value)) {
                    if (!preg_match('/^1[0-9]{10}$/', $value)) {
                        $message = '手机号码格式错误';
                    }
                }
                break;
            case 'wechat':
                // 微信号
                if ($required == 1 || !empty($value)) {
                    if (!preg_match('/^[-_a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/', $value)) {
                        $message = '微信号格式错误';
                    }
                }
                break;
            case 'qq':
                // QQ号
                if ($required == 1 || !empty($value)) {
                    if (!preg_match('/^[1-9][0-9]{4,12}$/', $value)) {
                        $message = 'QQ号格式错误';
                    }
                }
                break;
            case 'email':
                if ($required == 1 || !empty($value)) {
                    if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                        $message = '邮箱地址格式错误';
                    }
                }
                break;
            case 'doortime':
                if ($required == 1 && empty($value)) {
                    $message = '请选择期望上门时间';
                }
                break;
        }
        if ($message) {
            break;
        }
    }

    if ($message) {
        return ['data' => $data, 'err_msg' => $message, 'err_name' => $name];
    } else {
        return null;
    }
}