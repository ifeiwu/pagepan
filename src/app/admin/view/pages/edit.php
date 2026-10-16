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
        <iframe id="PageIFrame" src="about:blank" class="w:full h:full"></iframe>
    </div>
    <div id="split-code">
        <div id="editor" style="width:100%;height:100%"></div>
    </div>
</div>


<!--<script src="/assets/admin/lib/jquery.js"></script>-->
<script>
    const PageIFrame = document.getElementById('PageIFrame');

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
                id: config['blockId'] || '',
                type: config['blockType'] || '',
                path: config['blockPath'] || '',
                setting: config['blockSetting'] ? JSON.stringify(config['blockSetting']) : '',
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

        let page_iframe_loading = true;
        let timer;

        $(PageIFrame).on('load', function () {
            page_iframe_loading = false;
        }).attr('src', '/admin/builder/page?id=<?= $this->id ?>')

        function updateEditorValue() {
            $.get('/admin/builder/page-block/page-code', {'page_id':1}, function (res) {
                if (res.code === 0) {
                    editor.setValue(res.data);
                } else {
                    alert(res.message)
                }
            })
        }

        updateEditorValue();

        editor.onDidChangeModelContent(() => {
            if (page_iframe_loading) return;

            clearTimeout(timer);
            timer = setTimeout(() => {
                const blocks = getPageBlocks(editor.getValue())
                // 保存页面
                $.post('/admin/builder/page-block/save-code', {'page_id':1, 'blocks':blocks, 'html':editor.getValue()}, function(res) {
                    if (res.code === 0) {
                        PageIFrame.src = PageIFrame.src
                        if (res.data) {
                            page_iframe_loading = true;
                            editor.setValue(res.data);
                        }
                    } else {
                        console.log(res.message)
                    }
                })
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
        $('#PageIFrame').on('load', function () {
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