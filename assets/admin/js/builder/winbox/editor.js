export function open(url, title, value, onSaveCallback, onCloseCallback) {
    // 关闭已经打开的窗口
    WinBox.stack().forEach(winbox => winbox.close());

    // 保存编辑器初始值及 iframe 引用
    let value2 = value;
    let iframe;

    // 监听 iframe 加载完成消息
    const messageHandler = function (e) {
        if (e.data?.loaded === true && iframe?.contentWindow) {
            iframe.contentWindow.setValue(value2);
        }
    };

    // 创建窗口
    const winbox = new WinBox(title || '编辑内容', {
        url,
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

        // 窗口创建后初始化底部工具栏
        oncreate: function () {
            const $body = $(this.body);

            // 加载提示
            $body.append(`
                <div class="wb-loading">页面加载中...</div>
            `);

            // 底部操作栏模板
            const $footbar = $(`
                <div class="wb-footbar">
                    <div>
                        <button type="button" id="save">应用</button>
                    </div>
                    <div>
                        <button type="button" id="save_close" class="primary">应用&关闭</button>
                    </div>
                </div>
            `).appendTo($body);

            // 获取操作按钮
            const $save = $footbar.find('#save');
            const $saveClose = $footbar.find('#save_close');

            // 应用编辑内容
            $save.on('click', function (e, type) {
                // 防止重复提交
                $save.add($saveClose).prop('disabled', true);

                // 获取 iframe 中的编辑内容
                const value = iframe.contentWindow.getValue();

                // 执行保存回调
                onSaveCallback?.(value, $save, $saveClose);

                // 保存后关闭窗口
                if (type === 'close') {
                    winbox.close();
                }
            });

            // 应用并关闭
            $saveClose.on('click', function () {
                $save.trigger('click', ['close']);
            });
        },

        // iframe 加载完成后绑定消息监听
        onload: function () {
            iframe = this;

            window.addEventListener('message', messageHandler);
        },

        // 窗口关闭时清理资源
        onclose: function () {
            winbox.setUrl('about:blank');

            window.removeEventListener('message', messageHandler);

            onCloseCallback?.();
        }
    });

    return winbox;
}