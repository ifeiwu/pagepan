<!DOCTYPE html>
<html>
<head>
    <?php $this->insert('layout/head'); ?>
    <style>
        html, body {
            height: 100%;
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
</head>
<body>
<div style="width:100%;height:calc(100% - 1px);border-bottom: 1px solid #e1e1e0">
    <div class="split" style="height:100%">
        <div id="split-1">
            <div id="editor" style="width:100%;height:100%"></div>
        </div>
        <div id="split-2">
            <div class="flex items-center justify-center h-full">
                <div id="preview"></div>
            </div>
        </div>
    </div>
</div>
    <script>
        require(['split', 'vs/editor/editor.main'], function(Split) {
            Split(['#split-1', '#split-2'], {
                direction: 'vertical',
                onDrag: function (sizes) {
                    editor.layout();
                },
            })

            const editor = monaco.editor.create(document.getElementById('editor'), {
                theme: 'vs-dark',
                minimap: {
                    enabled: false
                },
                language: 'xml',
                wordWrap: 'on'
            });
            editor.onDidChangeModelContent(() => {
                document.getElementById('preview').innerHTML = editor.getValue();
            });

            // 父窗口获取值
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
            }, 200)
        });
    </script>
</body>
</html>