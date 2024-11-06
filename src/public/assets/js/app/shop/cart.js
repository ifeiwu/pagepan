define(function (require) {
    let $component;
    const setComponent = function ($_component) {
        $component = $_component;
    }

    // 价格格式化
    const price_format = function (number, decimals) {
        decimals = decimals > 0 && decimals <= 20 ? decimals : 2;
        number = parseFloat((number + "").replace(/[^\d\.-]/g, "")).toFixed(decimals) + "";
        var l = number.split(".")[0].split("").reverse(),
            r = number.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    }

    //从购物车删除
    $('.remove-item').click(function (e) {
        e.preventDefault();
        var $this = $(this);
        $.getJSON('./shopcart/remove', {'ids': $this.data('id')}, function (json) {
            if (json.code == 'success') {
                $('#cart_count').text(json.count);
                $('#cart_total').text(json.cart_total);

                $this.parents('tr').fadeOut('slow', function () {
                    $(this).remove();
                });
                if (!$('.shopcart-items tr').length) {
                    location.reload();
                }
            }
        });
    });

    //设置购物车商口数量
    const updateCartQuantity = function ($number) {
        let id = $number.data('id');
        let hash = $number.data('hash');
        let quantity = $number.val();

        $.getJSON('./m/shop/update-cart-quantity', {'id': id, 'hash': hash, 'quantity': quantity}, function (res) {
            if (res.code == 0) {
                $number.val(quantity);
                $component.find('.total-price').text(res.data.totalPrice);
            }
        });
    }

    // 双击商品抽屉方式打开删除按钮
    const drawerInit = function () {
        let $drawers = $('.drawer');
        $drawers.dblclick(function(e) {
            e.preventDefault();
            let $target = $(e.target);
            // 排除双击商品内的元素
            if ($target.closest('.quantity').length ||
                $target.closest('.delete').length ||
                $target.closest('img').length) {
                return false;
            }
            // 打开当前双击商品的删除按钮
            let $drawer = $(e.target).closest('.drawer');
            $drawer.toggleClass('open');
            // 关闭其它商品打开的删除按钮
            let $lis = $drawer.closest('li').siblings();
            $lis.each(function () {
                let $drawer = $(this).find('.drawer');
                if ($drawer.is('.open')) {
                    $drawer.removeClass('open');
                }
            });
        });
    };

    const quantitysInit = function () {
        $component.find('.quantity').each(function (i, v) {
            let $quantity = $(this);
            let $number = $quantity.find('.number');
            // 数量减 1
            $quantity.find('.minus').click(function () {
                let quantity = parseInt($number.val());
                if (quantity > 1 || isNaN(quantity)) {
                    $number.val(quantity - 1);
                    updateCartQuantity($number);
                } else {

                }
            });

            // 数量加 1
            $quantity.find('.plus').click(function () {
                let quantity = parseInt($number.val());
                if (quantity < 99 || isNaN(quantity)) {
                    $number.val(quantity + 1);
                }
                updateCartQuantity($number);
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
                updateCartQuantity($number);
            });
        });
    }

    return {
        'setComponent': setComponent,
        'quantitysInit': quantitysInit,
        'drawerInit': drawerInit
    };
});