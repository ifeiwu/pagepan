define(function (require) {
    let $component;
    const setComponent = function ($_component) {
        $component = $_component;
    }

    const alerty = require('alerty');
    const price_format = require('util/price-format');

    // 规格选择初始化
    const initTabs = function (skus) {
        let $ols = $component.find('#specs ol');
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
        $component.find('#specs ol li').click(function () {
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
            // 规格库存数量设置，用于调整数量提示。
            let $number = $component.find('#number');
            $number.data('stock', -1);
            // 完成规格选择，获取价格
            if (selected_count === $ols.length) {
                for (skukey in skus) {
                    let sku = skus[skukey];
                    let sku_specs = skus[skukey].specs;
                    if (JSON.stringify(ksort(selected_specs)) == JSON.stringify(ksort(sku_specs))) {
                        $component.find('#price').hide();
                        $component.find('#spec_price').text(price_format(sku.price)).show();
                        let quantity = parseInt($number.val());
                        if (quantity > sku.stock) {
                            $number.val(sku.stock);
                            alerty.toast('超出购买的数量~');
                        }
                        $number.data('stock', sku.stock); // 设置当前规格库存
                        break;
                    } else {
                        $component.find('#price').show();
                        $component.find('#spec_price').hide();
                    }
                }
            }
        });
    }

    // 抽屉方式显示选择规格
    const initDrawer = function (skus) {
        let $drawer = $component.find('#drawer').show();
        $drawer.click(function (e) {
            if ($(e.target).is(this)) {
                $(this).removeClass('open');
                $('body').css('overflow', '');
            }
        });
        $drawer.find('.close').click(function () {
            $drawer.removeClass('open');
        });
        let $content = $drawer.find('>div');
        $content.css('--specs-box-height', $content.outerHeight() + 'px');
    }

    return {
        setComponent: setComponent,
        initTabs: initTabs,
        initDrawer: initDrawer
    }
});