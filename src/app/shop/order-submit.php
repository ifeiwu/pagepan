<?php
// 保存提交的订单
return function () {
    // 令牌验证
    $_token = preg_replace('/[^0-9a-z]+/', '', $_GET['_token']);
    if (!helper('form/token', [$_token])) {
        Response::error('invalid token');
    }
    // 道路名
    $road = filter_var($_POST['road'], FILTER_SANITIZE_SPECIAL_CHARS);
    if (empty($road)) {
        Response::error('请选择道路名称', ['field' => 'road']);
    }
    // 门牌号
    $house = filter_var($_POST['house'], FILTER_SANITIZE_SPECIAL_CHARS);
    $house_length = mb_strlen($house, 'UTF-8');
    if ($house_length <= 2 || $house_length >= 30) {
        Response::error('门牌号长度 2-30 个字符', ['field' => 'house']);
    }
    // 联系人
    $linkman = filter_var($_POST['linkman'], FILTER_SANITIZE_SPECIAL_CHARS);
    $linkman_length = mb_strlen($linkman, 'UTF-8');
    if ($linkman_length <= 1 || $linkman_length >= 5) {
        Response::error('联系人长度 1-5 个字符', ['field' => 'linkman']);
    }
    // 手机号
    $phone = $_POST['phone'];
    if (!preg_match('/^1[0-9]{10}$/', $phone)) {
        Response::error('手机号码格式错误', ['field' => 'phone']);
    }
    // 微信号
    $wechat = $_POST['wechat'];
    if ($wechat) {
        if (!preg_match('/^[-_a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/', $wechat)) {
            Response::error('微信号格式错误', ['field' => 'wechat']);
        }
    }
    // 订单备注
    $remark = filter_var($_POST['remark'], FILTER_SANITIZE_SPECIAL_CHARS);
    $remark_length = mb_strlen($remark, 'UTF-8');
    if ($remark_length >= 200) {
        Response::error('订单备注长度 2-100 个字符', ['field' => 'remark']);
    }

    // 订单信息
    $order = [];
    $cart = cart();
    // 登录用户使用的地址
    /*$address_id = $post['address_id'];
    if ($address_id) {
        $user_id = session('user.id');
        $order['user_id'] = $user_id; // 用户ID
        // 获取用户收货地址
        $address = $db->find('user_address', '*', [['user_id', '=', $user_id], 'AND', ['address_id', '=', $address_id]]);
        $road = $address['road'];
        $house = $address['house'];
        $linkman = $address['linkman'];
        $phone = $address['phone'];
        $wechat = $address['wechat'];
    }*/

    $shop_range = db()->find('site', 'value', ['name', '=', 'shop_range'], null, 0);
    $shop_range = json_decode($shop_range, true);
    $province = $shop_range['province'];
    $city = $shop_range['city'];
    $district = $shop_range['district'];
    session('order_address', ['province' => $province, 'city' => $city, 'district' => $district, 'road' => $road, 'house' => $house]);

    $order['ctime'] = time(); // 创建时间
    $order['is_new'] = 0; // 0未读/1已读状态
    $order['is_read'] = 0; // 0未读/1已读状态
    $order['status'] = 1; // 订单状态：1正常/2关闭
    $order['quantity'] = $cart->getTotalQuantity(); // 商品总数量
    $order['total'] = $cart->getTotalWithDiscount(); // 实付总额
    $order['score'] = floatval($score); // 获得积分
    $order['remark'] = $remark; // 买家备注
    $order['linkman'] = $linkman; // 联系人
    $order['phone'] = $phone; // 手机号
    $order['wechat'] = $wechat; // 微信号
    $order['address'] = "$province,$city,$district,$road,$house"; // 收货地址

    $db = db();
    try {
        $db->pdo->beginTransaction();
        $order_id = $db->insert('order', $order);
        if ($order_id) {
            // 订单序号
            $sn = str_pad($order_id, 8, '0', STR_PAD_LEFT);
            $db->update('order', ['sn' => $sn], ['id', '=', $order_id]);
            // 添加商品清单
            $is_add_items = true;
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
                    $is_add_items = false;
                    break;
                }
            }
            if ($is_add_items == true) {
                $db->pdo->commit();
                $cart->clear();
                Response::success('下单成功', ['id' => $order_id, 'sn' => $sn]);
            } else {
                $db->pdo->rollBack();
                Response::error('添加订单商品失败', ['id' => 0]);
            }
        } else {
            $db->pdo->rollBack();
            Response::error('下单失败，请稍候再试。', ['id' => 0]);
        }
    } catch (Exception $e) {
        $db->pdo->rollBack();
        debug($e->getMessage());
        Response::error('下单失败');
    }
};