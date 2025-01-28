define(function (require) {
    let $component;
    const setComponent = function ($_component) {
        $component = $_component;
    }

    const init = function () {
        // 订单备注文本域自动高度
        $component.find('textarea[name="notes"]').on('input', function () {
            let padding = parseInt($(this).css('paddingTop')) * 2;
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight + padding) + 'px';
        });
        // 提交订单
        $component.find('form').submit(function (e) {
            e.preventDefault();
            let $submit = $('button[form="orderForm"]');
            let $form = $(this);
            let token = $form.data('token');
            let formData = $form.serializeArray();
            $submit.attr('disabled', true);
            $.ajax({
                url: 'm/shop/order-submit?_token=' + token,
                type: 'POST',
                data: formData,
                success: function(res) {
                    if (res.code == 0) {
                        $.post('m/shop/order-notice', {'order_sn': res.data.sn}, function () {
                            location.href = 'shop-order-success';
                        });
                    } else {
                        let data = res.data;
                        if (data) {
                            if (data.field) {
                                $component.find('[name="'+data.field+'"]')[0].focus();
                                $submit.attr('disabled', false);
                            } else if (data.id == 0) {
                                $submit.attr('disabled', true);
                                $.post('m/shop/order-notice', formData, function () {});
                            }
                        }
                        alert(res.message);
                    }
                },
                error: function(error) {
                    console.error(error);
                }
            });
        });
        // 保存填写表单数据
        require(['form-storage'], function (FormStorage) {
            const formStorage = new FormStorage('#orderForm', {
                name: 'form-order',
                includes: ['select','input','textarea'],
                text: '[type="text"]'
            });
            formStorage.apply();
            // 每秒钟保存
            setInterval(() => {
                formStorage.save();
            }, 1000);
        });
    }

    return {
        'setComponent': setComponent,
        'init': init
    };
});