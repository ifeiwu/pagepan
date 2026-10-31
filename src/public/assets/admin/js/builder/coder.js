define(['vs/editor/editor.main'], function (Split) {
    const iframe = document.querySelector('#iframe');

    document.querySelector('#workspace').addEventListener("sp-resize", (e) => {
        editor.layout();
    });

    let iframe_loading = true;
    let editor_change_timer;
    let editor_readonly_message = '';

    $(iframe).on('load', function () {
        iframe_loading = false;
    }).attr('src', '/admin/builder/page?id=1')

    const coder = document.querySelector('#coder');
    const editor = monaco.editor.create(coder, {
        theme: 'vs-dark',
        language: 'php',
        minimap: { enabled: true },
        stickyScroll: {
            enabled: false
        },
    });

    coder.editor = editor;

    editor.onDidAttemptReadOnlyEdit(() => {
        alert(editor_readonly_message);
    });

    editor.onDidChangeModelContent(() => {
        // if (iframe_loading) return;
    });


    // Ctrl + S 保存
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, savePageBlocks);

    $('#save_code').on('click', function () {
        savePageBlocks()
    })

    // 保存代码
    function savePageBlocks() {
        const blocks = getPageBlocks(editor.getValue())
        // 保存页面
        $.post('/admin/builder/save-page-block', {'page_id': 1, 'blocks': blocks}, function (res) {
            if (res.code === 0) {
                iframe.contentWindow.location.reload();
                if (res.data) {
                    iframe_loading = true;
                    editor.setValue(htmlentities_decode(res.data));
                }
            } else {
                alert(res.message);
            }
        })
    }

    // 获取页面内容块数组
    function getPageBlocks(html) {
        const phpBlocks = [];

        // 保护 PHP 代码，避免被浏览器解析
        html = html.replace(/<\?php[\s\S]*?\?>|<\?=[\s\S]*?\?>/g, match => {
            const token = `PHP_BLOCK_${phpBlocks.length}_TOKEN`;
            phpBlocks.push(match);
            return token;
        });

        const $container = $('<div>').html(html);
        const blocks = [];

        $container.children(/*':not(script, style, link)'*/).each(function () {
            const $block = $(this).clone(true);
            $block.find('[contenteditable]').removeAttr('contenteditable');
            $block.find('lottie-player').html('');

            // 还原 PHP 代码
            let content = $block[0].outerHTML;
            content = content.replace(
                /PHP_BLOCK_(\d+)_TOKEN/g,
                (_, index) => phpBlocks[Number(index)]
            );
            const config = $(content).data();
            blocks.push({
                id: config['blockId'] || '',
                type: config['blockType'] || '',
                path: config['blockPath'] || '',
                setting: config['blockSetting'] ? JSON.stringify(config['blockSetting']) : '',
                content,
            });
        });

        return blocks;
    }

    // 字符转换为 HTML 实体
    function htmlentities_encode(str) {
        let textarea = document.createElement('textarea')
        textarea.innerHTML = str
        return textarea.innerHTML
    }

    // 实体转换为 HTML 字符
    function htmlentities_decode(str) {
        let textarea = document.createElement('textarea')
        textarea.innerHTML = str
        return textarea.value
    }

    // 初始化代码编辑器内容
    $.get('/admin/builder/page-block-code', {'page_id': appvar.page.id}, function (res) {
        if (res.code === 0) {
            editor.setValue(htmlentities_decode(res.data));
        } else {
            editor.updateOptions({readOnly: true});
            editor_readonly_message = res.message
            alert(editor_readonly_message)
        }
    })
})