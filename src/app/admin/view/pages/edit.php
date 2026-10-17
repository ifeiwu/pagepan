<?php $this->layout('admin-iframe') ?>

<style>
    html, body {
        scrollbar-width: none;
    }
    .gutter {
        background-color: #5d5d5d;
        background-repeat: no-repeat;
        background-position: 50%;
    }
    .gutter.gutter-vertical {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=');
        cursor: row-resize;
    }
</style>

<link href="/assets/admin/css/builder.css" rel="stylesheet">

    <div class="split" style="height:100vh">
        <div id="split-view" class="rel overflow:hidden">

            <div class="pb-header">
                <div class="history">
                    <button class="ghost" popovertarget="history-dropdown" aria-label="历史记录" data-tooltip="bottom">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw-clock preview-icon"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
                    </button>
                    <div id="history-dropdown" popover>
                        <menu>
                            <li>2026/10/17 16:23:07</li>
                            <li>2026/10/17 15:35:53</li>
                            <li>2026/10/17 15:35:35</li>
                        </menu>
                    </div>
                </div>
                <a class="button ghost" href="https://support.qq.com/products/65308" target="_blank" aria-label="意见反馈" data-tooltip="bottom">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle-text preview-icon"><path d="M3.086 17.509a2 2 0 00-.094-1.167 10 10 0 114.777 4.719 2 2 0 00-1.099-.092l-3.413.998a1 1 0 01-1.236-1.168z"/><path d="M8 12h9"/><path d="M8 16h5"/><path d="M8 8h7"/></svg>
                </a>
                <div class="title">test</div>
                <div class="ml:auto flex gap:5">
                    <div class="preview pr:10">
                        <a class="button ghost" id="preview" href="https://site.pagepan.test/test" target="_blank" aria-label="预览效果" data-tooltip="bottom">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play preview-icon"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>
                        </a>
                        <div class="qrcode-open"></div>
                    </div>
                    <button id="publish">发布</button>
                    <button id="close_modal" data-on:click="parent.EditDialog.close()">关闭</button>
                </div>
            </div>
            <div class="pb-ruler active">
                <div class="xl">
                    <div class="left"></div>
                    <div class="right"></div>
                </div>
                <div class="lg">
                    <div class="left"></div>
                    <div class="right"></div>
                </div>
                <div class="md">
                    <div class="left"></div>
                    <div class="right"></div>
                </div>
                <div class="sm">
                    <div class="left"></div>
                    <div class="right"></div>
                </div>
                <div class="xs active">
                    <div class="left"></div>
                    <div class="size">768 x 836</div>
                    <div class="right"></div>
                </div>
            </div>
            <div class="pb-body">
            <div class="pb-board">
                <div class="pb-resize ease" style="width: 360px;">
                    <div class="resize-left"></div>
                    <div class="browser-header">
                        <div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div><input readonly=""></div>
                        <div>
                            <a target="_blank" title="预览效果" href="https://site.pagepan.test/test">
                                <svg class="w:18 h:18" viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="M3.512 15h4.66A25.567 25.567 0 0 1 8 12c0-1.044.06-2.052.172-3h-4.66A8.985 8.985 0 0 0 3 12c0 1.052.18 2.062.512 3Zm.424 1a9.017 9.017 0 0 0 6.092 4.783c-.78-1.06-1.376-2.746-1.714-4.783H3.936Zm16.552-1A8.985 8.985 0 0 0 21 12c0-1.052-.18-2.062-.512-3h-4.66c.113.948.172 1.956.172 3s-.06 2.052-.172 3h4.66Zm-.424 1h-4.378c-.338 2.037-.935 3.723-1.714 4.783A9.017 9.017 0 0 0 20.064 16Zm-10.88-1h5.632c.118-.938.184-1.947.184-3s-.066-2.062-.184-3H9.184A24.046 24.046 0 0 0 9 12c0 1.053.066 2.062.184 3Zm.151 1c.522 2.968 1.583 5 2.665 5s2.143-2.032 2.665-5h-5.33Zm-5.4-8h4.379c.338-2.037.935-3.723 1.714-4.783A9.017 9.017 0 0 0 3.936 8Zm16.13 0a9.017 9.017 0 0 0-6.093-4.783c.78 1.06 1.376 2.746 1.714 4.783h4.378ZM9.334 8h5.33C14.143 5.032 13.082 3 12 3S9.857 5.032 9.335 8ZM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <iframe id="PageIFrame" src="about:blank" class="w:full h:full"></iframe>
                    <div class="resize-right"></div>
                </div>
            </div>
            </div>
        </div>
        <div id="split-code">
            <div class="flex w:full h:full">
                <div class="p:3 bg:gray-80">
                    <button class="ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-save preview-icon"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></svg>
                    </button>
                </div>
                <div class="flex-grow:1">
                    <div id="editor" style="width:100%;height:100%"></div>
                </div>
            </div>
        </div>
    </div>

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

    require(['split', 'vs/editor/editor.main', 'jquery'], function(Split) {

        Split(['#split-view', '#split-code'], {
            direction: 'vertical',
            minSize: 0,
            gutterSize: 20,
            onDrag: function (sizes) {
                editor.layout();
            },
        })

        let page_iframe_loading = true;
        let editor_change_timer;
        let editor_readonly_message = '';

        $(PageIFrame).on('load', function () {
            page_iframe_loading = false;
        }).attr('src', '/admin/builder/page?id=<?= $this->id ?>')

        const editor = monaco.editor.create(document.getElementById('editor'), {
            theme: 'vs-dark',
            minimap: { enabled: true },
            language: 'php'
        });

        editor.onDidAttemptReadOnlyEdit(() => {
            alert(editor_readonly_message);
        });

        editor.onDidChangeModelContent(() => {
            if (page_iframe_loading) return;

            clearTimeout(editor_change_timer);
            editor_change_timer = setTimeout(() => {
                const blocks = getPageBlocks(editor.getValue())
                // 保存页面
                $.post('/admin/builder/page-block/save-code', {'page_id':1, 'blocks':blocks}, function(res) {
                    if (res.code === 0) {
                        PageIFrame.src = PageIFrame.src
                        if (res.data) {
                            page_iframe_loading = true;
                            editor.setValue(res.data);
                        }
                    } else {
                        alert(res.message);
                    }
                })
            }, 3000);
        });

        function updateEditorValue() {
            $.get('/admin/builder/page-block/page-code', {'page_id':1}, function (res) {
                if (res.code === 0) {
                    editor.setValue(res.data);
                } else {
                    editor.updateOptions({readOnly: true});
                    editor_readonly_message = res.message
                    alert(editor_readonly_message)
                }
            })
        }

        updateEditorValue();




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

    require(['js/builder/resize'], function() {

    })
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