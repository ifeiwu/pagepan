var WinboxEditor = (function(window, document, $) {
    let value2
    let iframe

    // iframe页面通知加载完毕
    const messageHandler = function(e) {
        if (e.data.loaded == true) {
            iframe.contentWindow.setValue(value2)
        }
    }

    function open(url, title, value, onSaveCallback, onCloseCallback) {
        // 删除已经打开的窗口
        WinBox.stack().forEach((winbox) => {
            winbox.close()
        })

        value2 = value

        let winbox = new WinBox(title || '编辑内容', {
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
                let $footbar = $(`<div class="wb-footbar">
                                    <div><button id="save">应用</button></div>
                                    <div><button id="save_close" class="primary">应用&关闭</button></div>
                                </div>`).appendTo(this.body)
                let $save = $footbar.find('#save')
                let $save_close = $footbar.find('#save_close')
                $save.on('click', function(e, type) {
                    $save.attr('disabled', true)
                    $save_close.attr('disabled', true)

                    let value = iframe.contentWindow.getValue()

                    onSaveCallback(value, $save, $save_close)

                    if (type == 'close') {
                        winbox.close()
                    }
                })
                $save_close.on('click', function() {
                    $save.trigger('click', ['close'])
                })
            },
            onload: function() {
                iframe = this
                window.addEventListener('message', messageHandler)
            },
            onclose: function(force) {
                winbox.setUrl('about:blank')
                window.removeEventListener('message', messageHandler)
                onCloseCallback()
            }
        })
    }

    return {
        open: open
    }
})(window, document, jQuery)