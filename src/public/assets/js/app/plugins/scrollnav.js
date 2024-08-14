define(function (require) {
    // 锚点定位滚动导航
    const $scrollnav = $('[data-scrollnav]');
    let events = $._data($scrollnav[0], 'events');

    // 未绑定 click 事件
    if (events == undefined || !events['click']) {
        let isEventScroll = true; // 点击链接不触发滚动事件
        let data = $scrollnav.data('scrollnav').toString().split(';');
        let $links = $scrollnav.find('.nav>li>a');
        // 点击导航链接滚动定位
        $links.click(function (e) {
            e.preventDefault();
            isEventScroll = false;
            let offsetTop = data[0] || $scrollnav.outerHeight(true);
            let $this = $(this);
            let $target = $($this.prop('hash'));

            $('html,body').animate({scrollTop: $target.offset().top - offsetTop}, 500, function () {
                let $li = $this.parent('li');
                $li.siblings().removeClass('active');
                $li.addClass('active');

                setTimeout(() => {
                    isEventScroll = true;
                }, 200);
            });
        });

        let callbackScroll = function () {
            if (isEventScroll == false) {
                return;
            }

            let offsetTop = data[0] || $scrollnav.outerHeight(true);
            let pageScrollTop = $('html,body').scrollTop();

            $links.each(function (index) {
                let $this = $(this);
                let $li = $this.parent('li');
                let $first = $($links.first().prop('hash'));
                let $last = $($links.last().prop('hash'));
                let isfirst = false;
                let islast = false;

                // 是否滚动离开第一个元素
                if ($first.length) {
                    isfirst = Math.round($first.offset().top - offsetTop) > pageScrollTop;
                }

                // 是否滚动离开最后一个元素
                if ($last.length) {
                    islast = Math.round($last.offset().top + $last.outerHeight()) < pageScrollTop;
                }

                // 滚动离开第一或最后一个元素删除样式
                if (isfirst || islast) {
                    $li.siblings().removeClass('active');
                    return;
                }

                // 给导航链接添加当前定位活动样式
                let $target = $($this.prop('hash'));
                if ($target.length) {
                    if (Math.round($target.offset().top - pageScrollTop) <= Math.round(offsetTop)) {
                        $li.siblings().removeClass('active');
                        $li.addClass('active');
                    }
                }
            });
        }

        $(window).on('scroll', callbackScroll);

        callbackScroll();
    }
});