define(function (require) {
    let $component;
    const setComponent = function ($_component) {
        $component = $_component;
    }

    const alerty = require('alerty');

    // 添加到购物车
    const initAddCart = function () {
        $component.find('.addcart').click(function (e) {
            let data = getFormData(e);
            if (data !== false) {
                $.post('./m/shop/add-cart', data, function (res) {
                    if (res.code == 0) {
                        $('.cart-count').text(res.data).show();
                        let icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>';
                        alerty.toast(`${icon} 成功加入购物车`);
                    }
                });
            }
        });
    };

    // 立刻购买
    const initBuyNow = function () {
        $component.find('.buynow').click(function (e) {
            let data = getFormData(e);
            if (data !== false) {
                $.post('./m/shop/buy-now', data, function (res) {
                    if (res.code == 0) {
                        location.href = `shop-order-confirm?id=${data.id}`;
                    }
                });
            }
        });
    }

    // 获取表单数据
    function getFormData(e) {
        let goodsid = $component.find('#goods_id').val();
        let quantity = $component.find('#number').val();
        let specs = {};
        // 有多规格选择
        let $ols = $component.find('#specs ol');
        if ($ols.length) {
            $ols.each(function (i) {
                let $ol = $(this);
                let spec_name = $ol.data('specname');
                let $lis = $ol.find('li.selected');
                $lis.each(function () {
                    let spec_value = $(this).data('specvalue');
                    specs[spec_name] = spec_value;
                });
            });
            let $drawer = $component.find('#drawer');
            // 抽屉窗口显隐[加入购物车]或[立即购买]按钮
            if ($drawer.length) {
                if ($(e.target).is('.addcart')) {
                    $drawer.find('.buynow').hide();
                    $drawer.find('.addcart').show();
                } else {
                    $drawer.find('.addcart').hide();
                    $drawer.find('.buynow').show();
                }
            }
            if ($ols.length != Object.keys(specs).length) {
                // 是否使用抽屉窗口方式显示规格选择
                if ($drawer.length) {
                    if ($drawer.is('.open')) {
                        alerty.toast(`请选择商品规格`, {place:'top'});
                    } else {
                        $drawer.addClass('open');
                        $('body').css('overflow', 'hidden');
                    }
                } else {
                    alerty.toast(`请选择商品规格`, {place:'top'});
                }
                return false;
            } else {
                // 已完成规格选择，但是关闭了抽屉窗口。
                if ($drawer.length && !$drawer.is('.open')) {
                    $drawer.addClass('open');
                    return false;
                }
            }
        }
        return {'id': goodsid, 'quantity': quantity, 'specs': specs};
    }

    // 商品数量调整
    const initQuantitys = function () {
        let $quantitys = $component.find('.quantity');
        $quantitys.each(function (i, v) {
            let $quantity = $(this);
            let $number = $quantity.find('.number');
            // 数量减 1
            $quantity.find('.minus').click(function () {
                let quantity = parseInt($number.val());
                let stock = $number.data('stock');
                if (checkStockCount(stock)) {
                    if (quantity > 1 || isNaN(quantity)) {
                        $number.val(quantity - 1);
                    } else {
                        alerty.toast('数量不能再少啦~', {place: 'top'});
                    }
                }
            });
            // 数量加 1
            $quantity.find('.plus').click(function () {
                let quantity = parseInt($number.val());
                let stock = $number.data('stock');
                if (checkStockCount(stock)) {
                    if (quantity < stock || isNaN(quantity)) {
                        $number.val(quantity + 1);
                    } else {
                        alerty.toast('数量已经最大了~', {place:'top'});
                    }
                }
            });
            // 输入数量
            $number.on('input', function () {
                let quantity = parseInt($(this).val());
                let stock = $number.data('stock');
                if (quantity <= 0 || isNaN(quantity)) {
                    $number.val('');
                } else if (quantity >= stock) {
                    $number.val(stock);
                    alerty.toast(`最大库存（${stock}）`, {place:'top'});
                } else {
                    $number.val(quantity);
                }
            });
            // 检测库存
            $number.click(function (e) {
                let stock = $number.data('stock');
                if (!checkStockCount(stock)) {
                    $number.trigger('blur');
                }
            });
            // 默认数量
            $number.blur(function () {
                let quantity = parseInt($(this).val());
                if (quantity <= 0 || isNaN(quantity)) {
                    $number.val(1);
                }
            });
        });
        // 检测当前商品库存
        function checkStockCount(value) {
            if (value == -1) {
                alerty.toast('请选择规格选项', {place:'top'});
                return false
            }
            return true;
        }
    }

    // 分享链接
    const initShare = function () {
        $component.find('#share').click(function () {
            try {
                navigator.clipboard.writeText(window.location.href).then(function() {
                    alerty.toast('链接复制成功，快去分享给好友吧!');
                }).catch(err => {
                    alerty.toast('复制链接失败!');
                });
            } catch (e) {
                alerty.toast('复制链接失败!', {'bgColor': '#DB9600'});
            }
        });
    }

    /*const openWeChatAddFriend = function (wxhao) {
        require(['clipboard'], function (ClipboardJS) {
            let clipboard = new ClipboardJS('#open_wechat');
            clipboard.on('success', function(e) {
                alert("微信号复制成功，请进");
                window.location.href='weixin://';
                e.clearSelection();
            });
        });
    }*/

    return {
        'setComponent': setComponent,
        'initQuantitys': initQuantitys,
        'initAddCart': initAddCart,
        'initBuyNow': initBuyNow,
        'initShare': initShare,
    }
});