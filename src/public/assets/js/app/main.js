require(['jquery', 'device', 'smoothscroll', 'picturefill'], function() {

    // 记录滚动条宽度在 CSS 变量，用于 .w-expand-screen 计算。
    const setScrollbarWidth = function() {
        document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.body.clientWidth) + 'px')
    }

    // 窗口改变大小事件
    $(window).resize(function() {
        setScrollbarWidth()

        if ($('[class*="fixed-top2"],[class*="fixed-bottom2"]').length) {
            require(['app/plugins/fixed-wrap'])
        }

        if ($('[class*="h-grow"]').length) {
            require(['app/plugins/h-grow'])
        }
    })

    $(window).trigger('resize')

    // 在 PBuilder 里不加载的插件
    if (!pagevar.isBuilder) {
        // 分类滚动定位
        if ($('[data-scroll-category]').length) {
            require(['app/plugins/scroll-category'])
        }
        // 滚动到指定位置
        if ($('[data-scrollto]').length) {
            require(['app/plugins/scrollto'])
        }
        // 锚点定位滚动导航
        if ($('[data-scrollnav]').length) {
            require(['app/plugins/scrollnav'])
        }
    }

    // gif图片hover播放动画
    if ($('.freezeframe').length) {
        require(['freezeframe'], function(Freezeframe) {
            new Freezeframe()
        })
    }

    // 延加载图片
    if ($('.lazyload').length) {
        require(['lazyload'], function(LazyLoad) {
            new LazyLoad({
                elements_selector: '.lazyload',
                callback_error: function(el) {
                    el.src = 'assets/image/broken-image.png'
                }
            })
        })
    }

    // 点击图片放大
    if ($('.zooming').length) {
        require(['zooming'], function(Zooming) {
            new Zooming({ scaleBase: 0.8, zIndex: 1040 }).listen('.zooming')
        })
    }

    // 过去时间
    if ($('time[format="timeago-cn"]').length) {
        require(['timeago/zh-cn'], function() {
            $('time[format="timeago-cn"]').timeago()
        })
    }

    if ($('time[format="timeago"]').length) {
        require(['timeago/timeago'], function() {
            $('time[format="timeago"]').timeago()
        })
    }

    // 代码高亮
    if ($('pre>code').length) {
        require(['app/plugins/highlight'])
    }

    // JSON 动画播放器
    if ($('lottie-player').length) {
        require(['lottie-player'])
    }

    // 搜索高亮
    const $markjs = $('[data-markjs]')
    if ($markjs.length) {
        require(['mark'], function() {
            $markjs.mark($markjs.data('markjs'))
        })
    }

    // 滚动动画
    if ($('[data-sal]').length) {
        require(['sal/sal', 'css!sal/sal'], function(sal) {
            sal({ threshold: 1, once: false })
        })
    }

    // 链接模态窗口
    if ($('[data-modal],a[target="_modal"]').length) {
        require(['app/plugins/link-modal'])
    }

    // 加载视频插件
    if ($('audio.plyr, video.plyr').length) {
        require(['app/plugins/plyr'])
    }

    if ($('video.video-js').length) {
        require(['app/plugins/video'])
    }

    // 多语言支持
    if ($('[data-lang]').length) {
        require(['util/i18n'], function(i18n) {
            i18n()
            $('[data-lang]').click(function(e) {
                e.preventDefault()
                i18n($(this).data('lang'))
            })
        })
    }

    // 页面访问和事件跟踪
    require(['ahoy'], function(ahoy) {
        let params = {
            'item_id': pagevar.get_id,
            'page_id': pagevar.page_id,
            'page_url': pagevar.baseurl
        }
        ahoy.configure({
            visitsUrl: 'stats.php',
            eventsUrl: 'stats.php',
            visitParams: params
        })
        ahoy.track('$page', params)
        // ahoy.reset()
    })

    // 手机页面前端调试面板
    if (/debug/.test(window.location)) {
        require(['eruda'], function(eruda) {
            eruda.init()
        })
    }
})