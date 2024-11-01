define(function(require) {

	// 添加到购物车
	if($('.add-cart').length){
		$('.add-cart').click(function(){
			var
			$this = $(this),
			id = $this.data('id'),
			quantity = $('#number').val(),
			specs = new Array();

			//选择的规格
			if( $('.specs ul').length ) {
				$('.specs ul').each(function(i){
					var $li = $(this).find('li');
					$li.each(function(){
						if( $(this).hasClass('selected') ) {
							specs[i] = $(this).data('value');
						}
					});
				});

				if( $('.specs ul').length != specs.length ) {
					alert('请选择您要购买的商品规格！');
					return;
				}
			}

			$.getJSON('./shopcart/add', {'id':id,'quantity':quantity,'specs':specs}, function(json){
				if( json.code=='success' ) {

					$('.topbar .cart-count').text(json.count).show();
					$('.toolbar-user__tabs .cart-count').attr('data-count',json.count).show();

					if( $('.add-cart-tip').length ) {
						$('.add-cart-tip .cart-count').text(json.count);
						$('.add-cart-tip').show();
					}

					if( $this.data('url') ) {
						location.href = $this.data('url');
					}
				}
			});
		});
	}


	// 数量减 1
	if($('.quantity').length){
		$('.quantity .minus').click(function(){
			var $this = $(this),
				quantity = parseInt($('.quantity').find('#number').val());

			if( quantity<=1 || isNaN(quantity) ) {
				alert('亲，数量至少为1哦~');
				return false;
			}

			$('#number').val(quantity-1);
		});

		// 数量加 1
		$('.quantity .plus').click(function(){
			var $this = $(this),
				quantity = parseInt($('.quantity').find('#number').val());

			if( isNaN(quantity) ) {
				alert('亲，你输入的是无效数字~');
				return false;
			}

			$('#number').val(quantity+1);
		});

		//输入数量
		$('.quantity #number').keyup(function(e){
			var $this = $(this),
				quantity = parseInt($this.val());

			if( quantity<=0 || isNaN(quantity) ) {
				alert('亲，你输入的是无效数字~');
				return false;
			}

			$('#number').val(quantity);
		});
	}
});