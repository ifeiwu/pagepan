<?php
// 保存提交的订单
return function () {
    // 令牌验证
    $_token = preg_replace('/[^0-9a-z]+/', '', $_GET['_token']);
    if (!helper('form/token', [$_token])) {
        Response::error('invalid token');
    }
    // 配送方式是送货上门才需要填写地址
    $db = db();
    $delivery = $db->column('site', 'value', ['name', '=', 'shop_delivery']);
    if ($delivery == 1) {
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

    // 服务范围
    $shop_range = $db->column('site', 'value', ['name', '=', 'shop_range']);
    $shop_range = json_decode($shop_range, true);
    $province = $shop_range['province'];
    $city = $shop_range['city'];
    $district = $shop_range['district'];

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

    // 订单信息
    $order = [];
    $order['delivery'] = $delivery;
    $order['ctime'] = time(); // 创建时间
    $order['status'] = 0; // 订单状态：0未确认/1已确认/2已签收/3已取消
    $order['quantity'] = $order_quantity; // 商品总数量
    $order['total'] = $order_total; // 实付总额
    $order['remark'] = $remark; // 买家备注
    $order['linkman'] = $linkman; // 联系人
    $order['phone'] = $phone; // 手机号
    $order['wechat'] = $wechat; // 微信号
    if ($delivery == 1) {
        $order['address'] = "$province,$city,$district,$road,$house"; // 收货地址
    }

    try {
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