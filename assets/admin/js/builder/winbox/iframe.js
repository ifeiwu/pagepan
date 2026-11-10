var WinboxIframe = (function(window, document, $) {

    function open(url, title, onLoadCallback = null, onCloseCallback = null) {
        // 删除已经打开的窗口
        WinBox.stack().forEach((winbox) => {
            winbox.close()
        })

        let winbox = new WinBox(title, {
            url: url,
            x: 'center',
            y: 'center',
            width: '80%',
            minwidth: '900px',
            maxwidth: '1200px',
            height: '80%',
            border: 6,
            background: '#000',
            overflow: true,
            class: ['no-full', 'no-max', 'no-min', 'footbar'],
            oncreate: function() {
                $(this.body).append('<div class="wb-loading">页面加载中...</div>')
            },
            onload: function() {
                if (typeof onLoadCallback === 'function') {
                    onLoadCallback()
                }
            },
            onclose: function(force) {
                winbox.setUrl('about:blank')
                if (typeof onCloseCallback === 'function') {
                    onCloseCallback()
                }
            }
        })
    }

    return {
        open: open
    }
})(window, document, jQuery)