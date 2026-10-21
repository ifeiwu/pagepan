define(['device'], function () {
    // 页面自适应，通过浏览器调整窗口宽度大小，自动添加或修改地址栏 URL 参数 (window_width)
    // fixed_width 默认 false 每次调整窗口大小都会更新参数(window_width)加载页面。
    // 如果宽度是数字，那么只有在大于或小于的宽度更新参数加载页面。
    return function (fixed_width = false) {
        if (!pagevar.isBuilder) {
            let timeout_id = null;
            let searchParams = new URLSearchParams(location.search);
            let get_new_search_url = function (name, value) {
                if (name && value) {
                    searchParams.set(name, value);
                } else {
                    searchParams.delete(name);
                }

                let search_params = searchParams.toString();

                return location.pathname + (search_params ? '?' + search_params : '');
            };

            let window_resize = function () {
                let window_width = window.innerWidth;
                if (fixed_width !== false) {
                    if (window_width < fixed_width && !searchParams.has('window_width')) {
                        $(window).off('resize');
                        location.href = get_new_search_url('window_width', window_width);
                    } else if (window_width > fixed_width && searchParams.has('window_width')) {
                        $(window).off('resize');
                        location.href = get_new_search_url('window_width');
                    }
                } else {
                    $(window).off('resize');
                    location.href = get_new_search_url('window_width', window_width);
                }
            };

            $(window).on('resize', function () {
                // 控制刷新页面频率
                clearTimeout(timeout_id);
                timeout_id = setTimeout(function () {
                    window_resize();
                }, 1000);
            });

            if (device.desktop()) {
                if (fixed_width === false && !searchParams.has('window_width')) {
                    window_resize();
                } else if ($(window).width() < fixed_width && !searchParams.has('window_width')) {
                    window_resize();
                } else if ($(window).width() > fixed_width && searchParams.has('window_width')) {
                    window_resize();
                }
            }
        }
    };
});