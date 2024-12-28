define(function (require) {
    // 添加到购物车
    const addShopCartInit = function ($component) {
        $component.find('.add-cart').click(function () {
            let $button = $(this);
            let goodsid = $button.data('id');
            let quantity = $('#number').val();
            let specs = new Array();

            //选择的规格
            if ($('.specs ul').length) {
                $('.specs ul').each(function (i) {
                    var $li = $(this).find('li');
                    $li.each(function () {
                        if ($(this).hasClass('selected')) {
                            specs[i] = $(this).data('value');
                        }
                    });
                });

                if ($('.specs ul').length != specs.length) {
                    alert('请选择您要购买的商品规格！');
                    return;
                }
            }

            $.getJSON('./m/shop/add-cart', {'id': goodsid, 'quantity': quantity, 'specs': specs}, function (res) {
                if (res.code == 0) {
                    $('.cart-count').text(res.data).show();
                }
            });
        });
    };

    // 数量减 1
    const quantitysInit = function ($component) {
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

    const openWeChatAddFriend = function (wxhao) {
        require(['clipboard'], function (ClipboardJS) {
            let clipboard = new ClipboardJS('#open_wechat');
            clipboard.on('success', function(e) {
                alert("微信号复制成功，请进");
                window.location.href='weixin://';
                e.clearSelection();
            });
        });
    }

    return {
        'quantitysInit': quantitysInit,
        'addShopCartInit': addShopCartInit,
        'openWeChatAddFriend': openWeChatAddFriend
    }
});