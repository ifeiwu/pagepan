// 滚动条占用宽度
const scrollbarWidth = (window.innerWidth - document.body.clientWidth) + 'px'
document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth)
// 离线提示
window.addEventListener('offline', () => toast.warning('当前无法连接网络'), false)

// DataStar 助手类
const DataStarHelper = {
    // 触发自定义事件
    // data-on:event="$isSubmit=evt.detail.isSubmit"
    event: function(selector, data = {}, event = 'event') {
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
    if (tagname === 'button' || tagname === 'a') {
        detail.type === 'started' && el.classList.add('ds-fetch-started', el.dataset.loading)
        detail.type === 'finished' && el.classList.remove('ds-fetch-started')
    } else if (tagname === 'form') {
        let submit = Array.from(el.elements).find(e => e.type === 'submit');
        if (!submit || !submit.innerText) return
        // 请求开始
        if (detail.type === 'started') {
            sessionStorage.setItem('form-submit-text', submit.innerText)
            submit.setAttribute('disabled', true)
            submit.innerText = '提交中'
        } else if (detail.type === 'finished') {
            submit.removeAttribute('disabled')
            submit.innerText = sessionStorage.getItem('form-submit-text')
        }
    }
});

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

const copyTextToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        alert('复制失败：' + error.message);
    }
};

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
