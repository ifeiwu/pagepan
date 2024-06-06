define(function (require) {
    // 网格瀑布流
    const display = function (ukid, setting, callback = null) {

        require(['macy'], function (Macy) {
            const $component = $('[' + ukid + ']');
            const $container = $component.find('>div');
            const rootStyle = getComputedStyle(document.documentElement);
            const rootFontSize = parseFloat(rootStyle.getPropertyValue('font-size'));
            const scrollbarWidth = window.innerWidth - document.body.clientWidth;
            const paddingX = parseInt($container.css('padding-left')) * 2 + scrollbarWidth;
            const breakpoints = {'sm': 560 - paddingX, 'md': 768 - paddingX, 'lg': 1024 - paddingX, 'xl': 1280 - paddingX};

            // 计算网格间隔
            function getCalcGap(value) {
                spaceValue = parseFloat(rootStyle.getPropertyValue('--space-' + value));
                return spaceValue * rootFontSize;
            }

            let options = {
                container: '[' + ukid + '] .dataview',
                useContainerForBreakpoints: true, // 使用容器查询
                mobileFirst: true,
                waitForImages: false,
                cancelLegacy: true,
                margin: {x: 0, y: 0},
                columns: 1,
                breakAt: {}
            };

            if ( setting.gapx ) { options.margin.x = getCalcGap(setting.gapx); }
            if ( setting.gapy ) { options.margin.y = getCalcGap(setting.gapy); }
            if ( setting.cols ) { options.columns = setting.cols; }

            for (const key in breakpoints)
            {
                let gapx = setting['gapx' + key];
                let gapy = setting['gapy' + key];
                let cols = setting['cols' + key];
                let bpvalue = breakpoints[key];

                options.breakAt[bpvalue] = {margin: {}};

                if ( setting['gapx' + key] ) { options.breakAt[bpvalue].margin.x = getCalcGap(gapx); }
                if ( setting['gapy' + key] ) { options.breakAt[bpvalue].margin.y = getCalcGap(gapy); }
                if ( setting['cols' + key] ) { options.breakAt[bpvalue].columns = cols; }
            }

            const macy = Macy(options);

            if ( callback != null ) {
                callback(macy);
            }
        });
    };

    return {
        'display': display
    }
});