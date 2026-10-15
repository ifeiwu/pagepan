<?php $this->layout('admin-iframe') ?>

<style>
    html, body {
        height: 100%;
        overflow: hidden;
        scrollbar-width: none;
    }
    .gutter {
        background-color: #eee;
        background-repeat: no-repeat;
        background-position: 50%;
    }
    .gutter.gutter-vertical {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=');
        cursor: row-resize;
    }
</style>
<div class="split" style="height:100%">
    <div id="split-view">
        <iframe id="PageInFrame" src="about:blank" class="w:full h:full"></iframe>
    </div>
    <div id="split-code">
        <div id="editor" style="width:100%;height:100%"></div>
    </div>
</div>


<!--<script src="/assets/admin/lib/jquery.js"></script>-->
<script>
    const PageInFrame = document.getElementById('PageInFrame');

    function toBase64(str) {
        const bytes = new TextEncoder().encode(str);
        let binary = '';
        for (const byte of bytes) binary += String.fromCharCode(byte);
        return btoa(binary);
    }

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

        $container.children(':not(script, style, link)').each(function () {
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
                type: config['blockType'] || '',
                path: config['blockPath'] || '',
                setting: config['blockSetting'] || '',
                content,
            });
        });

        return blocks;
    }

    require(['split', 'vs/editor/editor.main', 'jquery'], function(Split) {
        Split(['#split-view', '#split-code'], {
            direction: 'vertical',
            minSize: 0,
            gutterSize: 20,
            onDrag: function (sizes) {
                editor.layout();
            },
        })

        const editor = monaco.editor.create(document.getElementById('editor'), {
            theme: 'vs-dark',
            minimap: { enabled: true },
            language: 'php',
        });

        let initializing = true;
        let timer;

        $(PageInFrame).on('load', function () {
            if (initializing === false) return;

            const page_source_code = $(this).contents().find('#__page_source_code__').text();

            initializing = true;
            editor.setValue(page_source_code);
            initializing = false;
        }).attr('src', '/admin/builder/page?id=<?= $this->id ?>')

        editor.onDidChangeModelContent(() => {
            if (initializing) return;

            clearTimeout(timer);
            timer = setTimeout(() => {
                const blocks = getPageBlocks(editor.getValue())
                console.log(blocks)
                // 保存页面
                $.post('/admin/builder/page-block/save-code', {'page_id':1, 'blocks':blocks, 'html':editor.getValue()}, function(res) {
                    if (res.code === 0) {
                        PageInFrame.src = PageInFrame.src
                    } else {
                        console.log(res.message)
                    }
                })
                /*$.ajax({
                    url: '/admin/builder/page-block/save-code',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ html: editor.getValue() }),
                    success: function (res) {
                        if (res.code === 0) {
                            PageInFrame.src = PageInFrame.src
                        } else {
                            console.log(res.message)
                        }
                    }
                });*/
            }, 1000);
        });

        /*// 父窗口获取值
        window.getValue = function() {
            return editor.getValue();
        };

        // 父窗口设置值
        window.setValue = function(content) {
            if ( content ) {
                editor.setValue(content);
            }
        };

        setTimeout(function() {
            window.parent.postMessage({ loaded: true }, '*')
        }, 200)*/
    });
</script>
<script>
    /*$(document).ready(function () {
        $('#PageInFrame').on('load', function () {
            const $body = $(this).contents().find('body');
            const $blocks = $body.children(':not(script, style, link)')
            const blocks = [];

            $.each($blocks, function () {
                const $block = $(this).clone(true)
                const config = $block.data()
                // 删除编辑时添加的属性
                $block.removeData();
                $block.find('[contenteditable]').removeAttr('contenteditable')
                $block.find('lottie-player').html('')

                const content = $block[0].outerHTML
                const setting = JSON.stringify(config['blockSetting'])

                blocks.push({
                    'type': config['blockType'] || '',
                    'path': config['blockPath'] || '',
                    'setting': setting || '',
                    'content': content,
                });
            })

            // 保存页面
            $.post('/admin/builder/page-block/save-code', {'page_id':1, 'blocks':blocks}, function(res) {
                if (res.code != 0) {
                    console.log(res.message)
                } else {

                }
            })
        });
    })*/
</script>