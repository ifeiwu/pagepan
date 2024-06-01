define(function (require) {

    require(['in-view', 'scrollto'], function (inView) {

        $('[data-scroll-category]').each(function () {
            const $component = $(this);
            const $items = $component.find('.dataview>li');
            const $categorys = $component.find('.category>li');

            const setting = $component.data('scroll-category') || {};
            const duration = setting.duration || 'swing';

            $component.find('.category').parents('[number]').addClass('sticky-top');

            // 点击分类滚动到导航页
            $categorys.each(function () {
                const $this = $(this);
                const cid = '#cid' + $this.data('id');

                $this.attr('data-scroll-id', cid);

                $this.click(function (e) {
                    e.preventDefault();

                    $(window).scrollTo(cid, duration, setting);
                });
            });

            // 检测导航页当前位置来选中左边指定的分类
            $items.each(function () {
                const $this = $(this);

                if ( $this.is('[id]') && inView.is($this[0]) )
                {
                    $component.find('.category>li[data-scroll-id="#' + $this.attr('id') + '"]').attr('active', '');

                    return false;
                }
            });


            $(window).on('scroll', function () {
                // 分类很多出现滚动条时，滚动页面时检查选中的分类是否可见，如果不可见就自动滚动可显示位置
                let $category_active = $component.find('.category>li[active]');

                if ( setting.offset ) {
                    inView.offset((setting.offset.top * -2));
                }

                if ( ! inView.is($category_active[0]) )
                {
                    $component.find('.scroll-area').scrollTo($category_active)
                }

                // 滚动页面时自动选中左边对应的分类
                $items.each(function () {
                    const $this = $(this);

                    inView.offset(0);

                    if ( $this.is('[id]') && inView.is($this[0]) )
                    {
                        let $category = $component.find('.category>li[data-scroll-id="#' + $this.attr('id') + '"]');

                        $category.siblings().removeAttr('active');
                        $category.attr('active', '');

                        return false;
                    }
                });
            });

        });
    });
});