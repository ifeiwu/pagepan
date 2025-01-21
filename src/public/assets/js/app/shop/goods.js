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
        let goodsid = $('#goods_id').val();
        let quantity = $('#number').val();
        let specs = {};
        // 选择的规格
        let $ols = $('.specs ol');
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
                alerty.toast(`请选择商品规格`);
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
                }
            });
            // 数量加 1
            $quantity.find('.plus').click(function () {
                let quantity = parseInt($number.val());
                if (quantity < 99 || isNaN(quantity)) {
                    $number.val(quantity + 1);
                }
            });
            //输入数量
            $number.on('input', function () {
                let quantity = parseInt($(this).val());
                if (quantity <= 0 || isNaN(quantity)) {
                    $number.val(1);
                } else if (quantity >= 99) {
                    $number.val(99);
                } else {
                    $number.val(quantity);
                }
            });
        });
    }

    // 规格选择初始化
    const specsInit = function (skus) {
        let $ols = $('.specs ol');
        let ols_count = $ols.length;
        // 商品只有一个规格，查找库存是0的禁用li选项
        if (ols_count == 1) {
            for (skukey in skus) {
                let sku = skus[skukey];
                if (sku.stock == 0) {
                    let sku_specs = sku.specs;
                    for (let key in sku_specs) {
                        $ols.find(`li[data-specvalue="${sku_specs[key]}"]`).addClass('disabled');
                    }
                }
            }
        }
        // 对象键值升序排序
        function ksort(obj) {
            const keys = Object.keys(obj).sort();
            const sortedObj = {};
            for (let key of keys) {
                sortedObj[key] = obj[key];
            }
            return sortedObj;
        }
        // 点击任意规格选项
        $('.specs ol li').click(function () {
            let $li = $(this);
            if ($li.hasClass('disabled')) {
                return;
            }
            // 选中和取消选中
            if ($li.is('.selected')) {
                $li.removeClass('selected');
            } else {
                $li.addClass('selected');
            }
            $li.siblings().removeClass('selected');
            // 记录每个规格属性选中的值
            let $selected_lis = $ols.find('li.selected');
            let selected_specs = {};
            let selected_count = 0;
            $selected_lis.each(function(i) {
                let $li = $(this);
                let spec_name = $li.parent().data('specname');
                let spec_value = $li.data('specvalue');
                Object.assign(selected_specs, {[spec_name]: spec_value})
                selected_count++;
            });
            // 规格可用和禁用状态
            $ols.each(function() {
                let $ol = $(this);
                let spec_name = $ol.data('specname');
                let $lis = $ol.find('li');
                $lis.removeClass('disabled');
                $lis.each(function() {
                    let $li = $(this);
                    let spec_value = $li.data('specvalue');
                    let temp_specs = {...selected_specs};
                    temp_specs[spec_name] = spec_value;
                    if (Object.keys(temp_specs).length == ols_count) {
                        for (skukey in skus) {
                            let sku = skus[skukey];
                            let sku_specs = skus[skukey].specs;
                            if (JSON.stringify(ksort(temp_specs)) == JSON.stringify(ksort(sku_specs))) {
                                if (sku.stock == 0) {
                                    $li.addClass('disabled');
                                }
                            }
                        }
                    }
                });
            });
            // 完成规格选择，获取价格
            if (selected_count === $ols.length) {
                for (skukey in skus) {
                    let sku = skus[skukey];
                    let sku_specs = skus[skukey].specs;
                    if (JSON.stringify(ksort(selected_specs)) == JSON.stringify(ksort(sku_specs))) {
                        $('#price').text(sku.price);
                        break;
                    }
                }
            }
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
        'specsInit': specsInit,
        'shareInit': shareInit,
    }
});