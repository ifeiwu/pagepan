define(function (require) {

    const init = function ($component) {
        // 订单备注文本域自动高度
        $component.find('textarea[name="notes"]').on('input', function () {
            let padding = parseInt($(this).css('paddingTop')) * 2;
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight + padding) + 'px';
        });

        $component.find('form').submit(function (e) {
            e.preventDefault();
            let formData = $(this).serializeArray();
            $.ajax({
                url: 'm/shop/order-submit',
                type: 'POST',
                data: formData,
                success: function(res) {
                    if (res.code == 0) {
                        location.href = 'order-success';
                    } else {
                        alert(res.message);
                        $component.find('[name="'+res.data.field+'"]')[0].focus();
                    }
                },
                error: function(error) {
                    console.error('Error submitting form:', error);
                }
            });
        });
    }

    return {
        'init': init
    };
});