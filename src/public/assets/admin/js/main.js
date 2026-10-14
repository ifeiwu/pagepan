// 滚动条占用宽度
const scrollbarWidth = (window.innerWidth - document.body.clientWidth) + 'px'
document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth)
// 离线提示
window.addEventListener('offline', () => toast.warning('当前无法连接网络'), false)

// DataStar 助手类
const DataStarHelper = {
    // 触发自定义事件
    // data-on:event="$isSubmit=evt.detail.isSubmit"
    event: function(selector, data = {}, event = 'myevent') {
        let el;
        if (typeof selector === 'string') {
            el = document.querySelector(selector);
        } else {
            el = selector;
        }
        el.dispatchEvent(new CustomEvent(event, { detail: data }));
    }
}
// DataStar 全局请求状态
document.addEventListener('datastar-fetch', ({ detail }) => {
    let el = detail.el
    let tagname = el.tagName.toLowerCase()
    if (tagname == 'button' || tagname == 'a') {
        detail.type == 'started' && el.classList.add('ds-fetch-started', el.dataset.loading)
        detail.type == 'finished' && el.classList.remove('ds-fetch-started')
    } else if (tagname === 'form') {
        let submit = Array.from(el.elements).find(e => e.type === 'submit');
        if (!submit || !submit.innerText) return
        // 请求开始
        if (detail.type == 'started') {
            sessionStorage.setItem('form-submit-text', submit.innerText)
            submit.setAttribute('disabled', true)
            submit.innerText = '提交中'
        } else if (detail.type == 'finished') {
            submit.removeAttribute('disabled')
            submit.innerText = sessionStorage.getItem('form-submit-text')
        }
    }
});

// 调用浏览器分享功能
async function shareUrl(title, text, url = null) {
    try {
        if (navigator.share) {
            await navigator.share({
                title: title,
                text: text,
                url: url || location.href
            })
            return true
        }
    } catch (err) {
        if (err.name !== 'AbortError') { // 用户取消不算错误
            console.error('分享失败:', err)
        }
    }

    // 降级：复制链接到剪贴板
    if (url) {
        await navigator.clipboard.writeText(url)
        alert('链接已复制到剪贴板')
    }
    return false
}

// 分享文件（图片/视频等）
// async function shareImage() {
//     const response = await fetch('https://example.com/image.jpg');
//     const blob = await response.blob();
//     const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
//
//     if (navigator.canShare && navigator.canShare({ files: [file] })) {
//         await navigator.share({
//             files: [file],
//             title: '分享图片',
//             text: '看看这张照片'
//         });
//     }
// }

/**
 * 返回上一页
 * @param fallback
 */
function goBack(fallback = null) {
    // 进入页面时记录：sessionStorage.setItem('prevPage', location.href);
    let prev = sessionStorage.getItem('prevPage')
    let current = location.href

    if (prev && prev !== current) {
        location.replace(prev) // 防止历史污染
        return
    }

    if (fallback) {
        location.replace(fallback)
        return
    }

    if (history.length > 1) {
        history.back()
        return
    }

    location.replace('/')
}

// 登录页返回上一页并刷新
if (location.pathname == '/auth/login') {
    let prevurl = document.referrer || ''
    // 必须同域
    if (!prevurl.startsWith(location.origin)) {
        prevurl = '/'
    }
    // 过滤不允许返回的页面
    let blockedPaths = ['/auth']
    if (blockedPaths.some(path => prevurl.startsWith(location.origin + path))) {
        prevurl = '/'
    }
    // 防止记录当前页（避免循环）
    if (prevurl === location.href) {
        prevurl = '/'
    }
    sessionStorage.setItem('prevPage', prevurl)
}

/*require(['lazy-image'], function(LazyImage) {
    new LazyImage({
        threshold: 0.01,
        rootMargin: '50px'
    })
})*/

// 打开模态窗口 <ku-modal>，并监听关闭事件
// 用户关闭窗口还原 <template> 标签
new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node.nodeType !== 1) continue;
            if (node.tagName === 'KU-MODAL') {
                node.addEventListener('ku-close', evt => {
                    let target = evt.target
                    // 替换标签为 template
                    let done = () => {
                        target.replaceWith(Object.assign(document.createElement('template'), { id: target.id }))
                    }
                    // 动画完成执行替换标签
                    let animations = target.shadowRoot.getAnimations()
                    if (animations.length) {
                        Promise.allSettled(animations.map(a => a.finished)).then(done)
                    } else {
                        requestAnimationFrame(done)
                    }
                })
            }
        }
    }
}).observe(document.body, {
    childList: true,
    subtree: true
})

require(['dialog'], function() {
    /**
     * https://github.com/bukacekd/dialog
     * @param content string | AsyncFunction | Function | HTMLElement
     */
    window.dialog = (content, options = {}) => {
        let sheet = new CSSStyleSheet()
        sheet.replaceSync(`
            dialog.custom {background:transparent;}
            dialog.custom::backdrop {pointer-events:none;background-color:rgba(0,0,0,.5);}
            dialog.custom,dialog.custom::backdrop {opacity:0;transition:opacity .3s;}
            dialog.custom[data-dialog-state="open"],dialog.custom[data-dialog-state="open"]::backdrop {opacity:1;}
        `)
        if (typeof (content) === 'string') {
            content = `<div class="fixed top:10 left:50% translateX(-50%) bg:gray-94 p:15 r:8 shadow:0|0|5|gray">
                        <div class="f:14 mb:15 pt:10 w:250 lh:1.5">${content}</div>
                        <div class="flex jc:end">
                            <button class="btn bg:black f:white" data-dialog-action="reject close">确定</button>
                        </div>
                      </div>`
        }
        return new Dialog({
            constructableSheets: [sheet],
            className: 'custom',
            content: content,
            ...options
        })
    }
})

require(['jquery'], function() {
    // Ajax 请求错误处理
    $(document).ajaxError(function (event, xhr) {
        switch (xhr.status) {
            case 401:
                window.location.href = '/auth/login'
                break
            default:
                toast.warning(xhr.responseJSON.message)
        }
    })

    // 图片灯箱
    window.scrollbarGutter = window.getComputedStyle(document.documentElement).scrollbarGutter
    window.lightboxInit = function() {
        require(['lightbox'], function(Lightbox) {
            let lb = Lightbox.init()
            let scrollTopButton = $('ku-scroll-top')[0].shadowRoot.querySelector('button');
            // 修复页面在保留滚动条宽度情况下，自动切换。
            lb.on('open', (e) => {
                if (scrollbarGutter == 'stable') {
                    document.documentElement.style.scrollbarGutter = 'auto'
                    $('.topnav').css('right', scrollbarWidth)
                    scrollTopButton.style.right = (parseInt(scrollbarWidth) + 20) +'px'
                }
            }).on('closed', (e) => {
                document.documentElement.style.scrollbarGutter = scrollbarGutter
                $('.topnav').css('right', '')
                scrollTopButton.style.right = '';
            })
        })
    }

    if ($('[data-lightbox]').length) {
        window.lightboxInit()
    }

    // 通用浮动窗口
    if ($('[data-popover-ele=""]').length) {
        require(['popover'], function() {
            PopoverComponent.init({
                ele: '[data-popover-ele=""]',
                position: 'bottom right',
                afterShow: function() {
                    let $input = $(this.target).find('input[autofocus]')
                    if ($input.length) {
                        $input[0].focus()
                    }
                }
            })
        })
    }

    // 通用导航菜单
    if ($('.navmenu').length || $('.dropdown').length) {
        require(['navmenu'], function(navmenu) {
            if ($('.navmenu').length) {
                navmenu.initCollapse('.navmenu')
            }
            navmenu.initDropdown('.dropdown')
        })
    }

    // 回到顶部
    if ($('ku-scroll-top').length) {
        require(['ku-scroll-top'])
    }

    // 安装网站到桌面
    if ($('[data-install="webapp"]').length) {
        require(['pwa-install'])
    }
})

// 吐司通知
require(['toast'], function() {
    toast.info = function (message, options = {}) {
        return toast({
            message,
            borderRadius: '8px',
            border: '2px solid #333',
            showIcon: true,
            iconType: "info",
            showProgressBar: false,
            ...options
        })
    }

    toast.error = function (message, options = {}) {
        return toast({
            message,
            borderRadius: '8px',
            border: '2px solid #dc2626',
            background: '#fef2f2',
            showIcon: true,
            iconType: 'error',
            iconBackground: "#dc2626",
            closeButtonColor: "#dc2626",
            showProgressBar: false,
            ...options
        })
    }

    toast.warning = function (message, options = {}) {
        return toast({
            message,
            borderRadius: '8px',
            border: '2px solid #d97706',
            background: '#fffbeb',
            showIcon: true,
            iconType: 'warn',
            iconBackground: "#d97706",
            closeButtonColor: "#d97706",
            showProgressBar: false,
            ...options
        })
    }

    toast.success = function (message, options = {}) {
        return toast({
            message,
            borderRadius: '8px',
            border: '2px solid #17a34a',
            background: '#f0fdf4',
            showIcon: true,
            iconType: 'success',
            iconBackground: "#17a34a",
            closeButtonColor: "#17a34a",
            showProgressBar: false,
            ...options
        })
    }

    toast.loading = function (message, options = {}) {
        return toast({
            message,
            borderRadius: '8px',
            border: '2px solid #333',
            showProgressBar: false,
            duration: 0,
            showIcon: true,
            iconType: 'loader',
            ...options
        })
    }
    // toast.info('Hello world')
    // toast.success('Saved!')
    // toast.error('Failed')
    // toast.warning('Watch out')
    // toast.loading('Processing...')
})

/*
require(['overlayscrollbars'], function() {
    var {
        OverlayScrollbars,
        ScrollbarsHidingPlugin,
        SizeObserverPlugin,
        ClickScrollPlugin
    } = OverlayScrollbarsGlobal;
    const osInstance = OverlayScrollbars(document.querySelector('#category>div'), {});
})*/
