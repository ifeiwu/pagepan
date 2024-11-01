define(function (require) {
    //从购物车删除
    $('.remove-item').click(function(e){
        e.preventDefault();

        var $this = $(this);
        $.getJSON('./shopcart/remove', {'ids':$this.data('id')}, function(json){
            if( json.code=='success' ) {
                $('#cart_count').text(json.count);
                $('#cart_total').text(json.cart_total);

                $this.parents('tr').fadeOut('slow', function() {
                    $(this).remove();
                });
                if( !$('.shopcart-items tr').length ) {
                    location.reload();
                }
            }
        });
    });

    $('.remove-items').click(function(e){
        e.preventDefault();

        var $ids = $('.ids:checked');

        if( $ids.length==0 ) { alert('请选择要从购物车删除的商品！'); }

        $.getJSON('./shopcart/remove', $ids.serialize(), function(json){
            if( json.code=='success' ) {
                $('#cart_count').text(json.count);
                $('#cart_total').text(json.cart_total);

                $.each($ids, function(i,o) {
                    $(o).closest('tr').fadeOut('slow', function() {
                        $(this).remove();
                    });
                });
                if( !$('.shopcart-items tr').length ) {
                    location.reload();
                }
            }
        });
    });

    //设置购物车商口数量
    var setCartQuantity = function( $this, quantity ){
        var id = $this.data('id'),
            $tr = $this.parents('tr');

        $.getJSON('./shopcart/quantity', {'id':id, 'quantity':quantity}, function(json){
            if( json.code=='success' ) {
                $tr.find('.number').val(quantity);
                $tr.find('.item-total').text(json.item_total);
                //      		$('#cart_total').text(json.cart_total);

                updateCartTotal();
            }
        });
    }

    //价格格式化
    var number_format = function(number, decimals) {
        decimals = decimals > 0 && decimals <= 20 ? decimals : 2;
        number = parseFloat((number + "").replace(/[^\d\.-]/g, "")).toFixed(decimals) + "";
        var l = number.split(".")[0].split("").reverse(),
            r = number.split(".")[1];
        t = "";
        for(i = 0; i < l.length; i ++ )
        {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    }

    //购物车总价，只计算被勾选的商品
    var updateCartTotal = function() {
        var ids = $('.ids:checked');
        var cart_total = 0;
        $.each(ids, function(i,o){
            $total = $(o).closest('tr').find('.item-total').text();
            cart_total += parseFloat($total.replace(/,*/g,''));
        });
        $('#cart_total').text(number_format(cart_total,2));
    }

    //数量减1
    $('.shopcart-quantity .minus').click(function(){
        var $this = $(this),
            quantity = parseInt($this.parents('.shopcart-quantity').find('.number').val());

        if( quantity<=1 || isNaN(quantity) ) {
            alert('亲，数量至少为1哦~');
            return false;
        }

        setCartQuantity( $this, quantity-1 );
    });

    //数量加1
    $('.shopcart-quantity .plus').click(function(){
        var $this = $(this),
            quantity = parseInt($this.parents('.shopcart-quantity').find('.number').val());

        if( isNaN(quantity) ) {
            alert('亲，你输入的是无效数字~');
            return false;
        }

        setCartQuantity( $this, quantity+1 );
    });

    //输入数量
    $('.shopcart-quantity .number').keyup(function(e){
        var $this = $(this),
            quantity = parseInt($this.val());

        if( quantity<0 || isNaN(quantity) ) {
            alert('亲，你输入的是无效数字~');
            return false;
        }

        setCartQuantity( $this, quantity );
    });

    //选择购物车的商品
    if( $('.checks').length )
    {
        //全选
        $('.checks').click(function(){
            var ischecked = false;
            if( $(this).is(':checked') ) {
                ischecked = true;
            }
            $('.ids').each(function(){
                this.checked = ischecked;
            });
            $('.checks').each(function(){
                this.checked = ischecked;
            });
            $('#check_count').text($('.ids:checked').length);
            updateCartTotal();
        });

        //单个选择
        $('.ids').click(function(){
            $('.checks').each(function(){
                this.checked = false;
            });
            $('#check_count').text($('.ids:checked').length);
            updateCartTotal();
        });

        //选择的数量
        $('#check_count').text($('.ids:checked').length);

        //默认全选
        //		$('.checks:eq(0)').trigger('click');
    }
});