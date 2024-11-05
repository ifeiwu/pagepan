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

            $.getJSON('./m/shop/add-cart', {'id': goodsid, 'quantity': quantity, 'specs': specs}, function (json) {
                if (json.code == 'success') {
                    /*$('.topbar .cart-count').text(json.count).show();
                    $('.toolbar-user__tabs .cart-count').attr('data-count', json.count).show();

                    if ($('.add-cart-tip').length) {
                        $('.add-cart-tip .cart-count').text(json.count);
                        $('.add-cart-tip').show();
                    }

                    if ($this.data('url')) {
                        location.href = $this.data('url');
                    }*/
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
            // let init_number_width = $number.width();
            // $number2 = $number.clone().css('width', '0px');
            // $number.after($number2);
            // let init_font_width = $number2[0].scrollWidth;
            // $number2.remove();

            // 数量减 1
            $quantity.find('.minus').click(function () {
                let quantity = parseInt($number.val());
                if (quantity > 1 || isNaN(quantity)) {
                    $number.val(quantity - 1);
                }
                // inputAutoWidth($number, init_font_width, init_number_width);
            });

            // 数量加 1
            $quantity.find('.plus').click(function () {
                let quantity = parseInt($number.val());
                if (quantity < 999 || isNaN(quantity)) {
                    $number.val(quantity + 1);
                }
                // inputAutoWidth($number, init_font_width, init_number_width);
            });

            //输入数量
            $number.on('input', function () {
                let quantity = parseInt($(this).val());
                if (quantity <= 0 || isNaN(quantity)) {
                    $number.val(1);
                } else if (quantity >= 999) {
                    $number.val(999);
                } else {
                    $number.val(quantity);
                }
                // inputAutoWidth($number, init_font_width, init_number_width);
            });
        });
        // 输出框自动宽度
        // function inputAutoWidth($number, font_width, number_width) {
        //     let width = $number.val().length * font_width;
        //     if ( width > number_width ) {
        //         $number.width(width);
        //     }
        // }
    }


    return {
        'quantitysInit': quantitysInit,
        'addShopCartInit': addShopCartInit
    }
});