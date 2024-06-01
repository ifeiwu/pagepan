define(function (require) {

    // 滚动到指定位置 https://github.com/flesler/jquery.scrollTo
    // data-scrollto="<?=htmlentities('{"target":100, "duration":2000, "axis":"y"}', ENT_QUOTES); ?>"
    const $scrollto = $('[data-scrollto]');

    let events = $._data($scrollto[0], 'events');

    // 未绑定 click 事件
    if ( events == undefined || ! events['click'] )
    {
        require(['scrollto'], function () {

            $scrollto.click(function (e) {
                e.preventDefault();

                this.blur();

                const $this = $(this);

                $this.addClass('active').attr('active', '');
                $this.siblings().removeClass('active').removeAttr('active');

                let setting = $this.data('scrollto') || {};
                let target = setting.target || 0;
                let duration = setting.duration || 'swing';

                $(window).scrollTo(target, duration, setting);
            });

        });
    }
});