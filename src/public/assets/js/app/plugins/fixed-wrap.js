define(function (require) {

    // 获取当前窗口响应式断点后缀
    const getBreakpointSuffix = function () {

        let width = window.innerWidth;

        if ( width >= 1280 ) {
            return '-xl';
        } else if ( width >= 1024 ) {
            return '-lg';
        } else if ( width >= 768 ) {
            return '-md';
        } else if ( width >= 640 ) {
            return '-sm';
        }

        return '';
    }

    // 模仿 CSS 响应式断点
    const getBreakpointClass = function (selector) {

        let breakpoint_suffix = getBreakpointSuffix();

        let breakpoint_suffixs = ['-xl', '-lg', '-md', '-sm', ''];

        let breakpoint_class = [];

        let isBreakpoint = false;

        for (let i = 0; i < breakpoint_suffixs.length; i++) {

            if ( breakpoint_suffixs[i] == breakpoint_suffix )
            {
                isBreakpoint = true;
            }

            if ( isBreakpoint == true )
            {
                breakpoint_class.push('.' + selector + breakpoint_suffixs[i]);
            }
        }

        return breakpoint_class.join(',');
    }

    // 响应式窗口固定定位，不脱离文档流占用页面高度。
    const selectors = ['fixed-top2', 'fixed-bottom2'];

    selectors.forEach(function (selector) {

        $('[class*="' + selector + '"]').each(function (i, el) {

            let breakpoint_class = getBreakpointClass(selector);

            let $this = $(this);

            // 匹配有一个断点样式，添加定位高度外围
            if ( $this.is(breakpoint_class) )
            {
                let $parent = $this.parent('.fixed-wrap');

                if ( ! $parent.length )
                {
                    $this.wrap('<div class="fixed-wrap"></div>');

                    $parent = $this.parent('.fixed-wrap');

                    $this.addClass(selector.substring(0, selector.lastIndexOf('2')));
                }

                $parent.css('height', $this.outerHeight() + 'px');

                $parent[0].style.setProperty('--offset-top', $parent[0].offsetTop + 'px');
            }
            // 没有匹配断点样式，删除定位高度外围
            else
            {
                let $parent = $this.parent('.fixed-wrap');

                if ( $parent.length )
                {
                    $this.removeClass(selector.substring(0, selector.lastIndexOf('2')));

                    $this.unwrap('.fixed-wrap');
                }
            }
        });
    });

});