define(function (require) {
    let $component;
    const setComponent = function ($_component) {
        $component = $_component;
    }

    const alerty = require('alerty');
    const Hammer = require('hammer');

    // 商品抽屉方式打开删除按钮
    const initDrawer = function () {
        let $drawers = $('.drawer');
        $drawers.each(function() {
            let $target = $(this);
            let hammer = new Hammer(this);
            // 长按/左边滑动打开抽屉
            hammer.on('press swipeleft', function(e) {
                let $li = $target.closest('li');
                $li.siblings().removeClass('open');
                $li.addClass('open');
            });
            // 轻触/点击/右边滑动关闭抽屉
            hammer.on('tap swiperight', function(e) {
                let $li = $target.closest('li');
                $li.removeClass('open');
            });
        });

        // 从购物车删除
        $('.remove').click(function (e) {
            e.preventDefault();
            let $li = $(this).closest('li');
            let id = $li.find('input[name="id"]').val();
            let hash = $li.find('input[name="hash"]').val();
            $.getJSON('./m/shop/cart-remove', {'id': id, 'hash': hash}, function (res) {
                if (res.code == 0) {
                    $component.find('.total-price').text(res.data.totalPrice);
                    $component.find('.total-item').text('(' + res.data.totalItem + ')');
                    $li.slideUp(200, function () {
                        let $ul = $li.closest('ul');
                        $li.remove();
                        if ($ul.children().length == 0) {
                            location.reload();
                        }
                    });
                }
            });
        });
    };

    // 设置购物车商品数量
    const updateCartQuantity = function ($number) {
        let $li = $number.closest('li');
        let id = $li.find('input[name="id"]').val();
        let hash = $li.find('input[name="hash"]').val();
        let quantity = $number.val();
        let stock = $number.data('stock');

        $.getJSON('./m/shop/cart-quantity', {'id': id, 'hash': hash, 'quantity': quantity}, function (res) {
            if (res.code == 0) {
                $number.val(quantity);
                let $drawer = $li.find('.drawer');
                $drawer.removeClass('open');
                $drawer.find('.minus').attr('disabled', false);
                if (quantity == stock) {
                    $drawer.find('.plus').attr('disabled', true);
                    alerty.toast(`最大库存（${stock}）`, {place:'top'});
                } else {
                    $drawer.find('.plus').attr('disabled', false);
                }
                $component.find('.total-price').text(res.data.totalPrice);
            }
        });
    }

    // 商品数量调整
    const initQuantitys = function () {
        $component.find('.quantity').each(function () {
            let $quantity = $(this);
            let $number = $quantity.find('.number');
            let stock = $number.data('stock');
            // 数量减 1
            $quantity.find('.minus').click(function () {
                let quantity = parseInt($number.val());
                if (quantity > 1 || isNaN(quantity)) {
                    $number.val(quantity - 1);
                    updateCartQuantity($number);
                } else {
                    $(this).attr('disabled', true);
                    let $li = $number.closest('li');
                    $li.siblings().removeClass('open');
                    $li.addClass('open');
                }
            });
            // 数量加 1
            $quantity.find('.plus').click(function () {
                let quantity = parseInt($number.val());
                if (quantity < stock || isNaN(quantity)) {
                    $number.val(quantity + 1);
                }
                updateCartQuantity($number);
            });
            // 输入数量
            $number.on('input', function () {
                let quantity = parseInt($(this).val());
                if (quantity <= 0 || isNaN(quantity)) {
                    $number.val('');
                } else if (quantity >= stock) {
                    $number.val(stock);
                    alerty.toast(`最大库存（${stock}）`, {place:'top'});
                } else {
                    $number.val(quantity);
                }
                updateCartQuantity($number);
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

    return {
        'setComponent': setComponent,
        'initQuantitys': initQuantitys,
        'initDrawer': initDrawer
    };
});