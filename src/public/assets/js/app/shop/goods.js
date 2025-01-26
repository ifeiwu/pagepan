define(function (require) {
    const alerty = require('alerty');

    let $component;
    const setComponent = function ($_component) {
        $component = $_component;
    }

    // 添加到购物车
    const addCartInit = function () {
        $component.find('#addcart').click(function () {
            let data = getFormData();
            $.post('./m/shop/add-cart', data, function (res) {
                if (res.code == 0) {
                    $('.cart-count').text(res.data).show();
                    let icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>';
                    alerty.toast(`${icon} 成功加入购物车`);
                }
            });
        });
    };

    // 立刻购买
    const buyNowInit = function () {
        $component.find('#buynow').click(function () {
            let data = getFormData();
            let specs = btoa(JSON.stringify(data.specs));
            location.href = `order-confirm?id=${data.id}&quantity=${data.quantity}&specs=${specs}`;
        });
    }

    // 获取表单数据
    function getFormData() {
        let goodsid = $component.find('#goods_id').val();
        let quantity = $component.find('#number').val();
        let specs = {};
        // 选择的规格
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
            if ($ols.length != Object.keys(specs).length) {
                let $drawer = $component.find('#drawer');
                if ($drawer.length) {
                    if ($drawer.is('.open')) {
                        alerty.toast(`请选择商品规格`, {place:'top'});
                    } else {
                        $drawer.addClass('open');
                    }
                } else {
                    alerty.toast(`请选择商品规格`, {place:'top'});
                }
                return;
            }
        }

        return {'id': goodsid, 'quantity': quantity, 'specs': specs};
    }

    // 数量减 1
    const quantitysInit = function () {
        let $quantitys = $component.find('.quantity');
        $quantitys.each(function (i, v) {
            let $quantity = $(this);
            let $number = $quantity.find('.number');
            // 数量减 1
            $quantity.find('.minus').click(function () {
                let quantity = parseInt($number.val());
                if (quantity > 1 || isNaN(quantity)) {
                    $number.val(quantity - 1);
                } else {
                    alerty.toast('数量不能再少啦~', {place:'top'});
                }
            });
            // 数量加 1
            $quantity.find('.plus').click(function () {
                let quantity = parseInt($number.val());
                if (quantity < 99 || isNaN(quantity)) {
                    $number.val(quantity + 1);
                } else {
                    alerty.toast('数量已经最大了~', {place:'top'});
                }
            });
            // 输入数量
            $number.on('input', function () {
                let quantity = parseInt($(this).val());
                if (quantity <= 0 || isNaN(quantity)) {
                    $number.val('');
                } else if (quantity >= 99) {
                    $number.val(99);
                } else {
                    $number.val(quantity);
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
    }

    // 分享链接
    const shareInit = function () {
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
        'quantitysInit': quantitysInit,
        'addCartInit': addCartInit,
        'buyNowInit': buyNowInit,
        'shareInit': shareInit,
    }
});