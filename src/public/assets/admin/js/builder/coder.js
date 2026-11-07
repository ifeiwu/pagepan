define(['vs/editor/editor.main'], function (monaco) {
    const $save = $('#save_code');
    const $editor = $('#editor');
    const $app = $('#app');

    let lastSavedValue = '';
    let readonlyMessage = '';
    let isSaving = false;

    // 初始化 Monaco 编辑器
    const editor = monaco.editor.create($editor[0], {
        theme: 'vs-dark',
        language: 'php',
        minimap: { enabled: true },
        stickyScroll: { enabled: false }
    });

    // 编辑器容器尺寸变化时重新计算布局
    $app[0].addEventListener('sp-resize', () => editor.layout());

    // 尝试修改只读内容时提示原因
    editor.onDidAttemptReadOnlyEdit(() => {
        if (readonlyMessage) alert(readonlyMessage);
    });

    // 监听内容变化，更新保存按钮状态
    editor.onDidChangeModelContent(() => {
        $save.prop('disabled', isSaving || editor.getValue() === lastSavedValue);
    });

    // 加载页面源代码
    $.get('/admin/builder/page-block-code', { page_id: appvar.page.id }, function (res) {
        if (res.code === 0) {
            lastSavedValue = res.data;
            editor.setValue(lastSavedValue);
            $save.prop('disabled', true);
        } else {
            readonlyMessage = res.message;
            editor.updateOptions({ readOnly: true });
            $save.prop('disabled', true);
            alert(readonlyMessage);
        }
    }).fail(function () {
        readonlyMessage = '代码加载失败，请刷新页面重试。';
        editor.updateOptions({ readOnly: true });
        $save.prop('disabled', true);
        alert(readonlyMessage);
    });

    // 注册 Ctrl + S / Command + S 保存快捷键
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, savePageBlocks);

    // 点击按钮保存
    $save.on('click', savePageBlocks);

    /**
     * 保存页面内容块代码。
     */
    function savePageBlocks() {
        if (isSaving || editor.getValue() === lastSavedValue) return;

        const content = editor.getValue();
        isSaving = true;
        $save.prop('disabled', true);

        $.post('/admin/builder/save-page-block', {
            page_id: appvar.page.id,
            content: content
        }, function (res) {
            if (res.code === 0) {
                lastSavedValue = content;
                iframe.contentWindow.location.reload();
            } else {
                alert(res.message);
            }
        }).fail(function () {
            alert('保存失败，请稍后重试。');
        }).always(function () {
            isSaving = false;
            $save.prop('disabled', editor.getValue() === lastSavedValue);
        });
    }

    /**
     * 将字符串中的特殊字符转换为 HTML 实体。
     *
     * @param {string} str 原始字符串
     * @returns {string} HTML 实体字符串
     */
    function htmlentities_encode(str) {
        const textarea = document.createElement('textarea');
        textarea.textContent = str;
        return textarea.innerHTML;
    }

    /**
     * 将 HTML 实体解码为普通字符串。
     *
     * @param {string} str HTML 实体字符串
     * @returns {string} 解码后的字符串
     */
    function htmlentities_decode(str) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = str;
        return textarea.value;
    }
});