// 编辑静态组件代码
RPanel.GroupButtonHtml = {
    view: function(vnode) {
        let name = vnode.attrs['name']

        // 字符转换为 HTML 实体
        function htmlentities_encode(str) {
            let textarea = document.createElement('textarea')
            textarea.innerHTML = str
            return textarea.innerHTML
        }

        // HTML 实体转换为字符
        function htmlentities_decode(str) {
            let textarea = document.createElement('textarea')
            textarea.innerHTML = str
            return textarea.value
        }

        // 所有 url() 背景图片路径替换单引号。解决浏览器自动添加上双引号或没有加单引号，导致图片无法显示。
        function style_url_double_quotes_replace(content) {
            content = content.replace(/(url\(".*?"\))/gi, function(match, p1) {
                return p1.replaceAll('"', '\'')
            })
            return content
        }

        // 代码高亮转换实体
        function pre_code_entity_replace(content) {
            content = content.replace(/<pre><code(.*?)>([\s\S]*?)<\/code><\/pre>/gi, function(match, p1, p2) {
                return '<pre><code' + p1 + '>' + htmlentities_encode(p2) + '</code></pre>'
            })
            return content
        }

        // 更新按钮状态
        vnode.attrs['updateButtonStatus'] = function(el, value) {
        };

        // iframe通知消息事件内容处理回调函数
        vnode.attrs['getValueCallback'] = function(value) {
            let $component = Component.getComponent().clone()
            $component.removeAttr('_name contenteditable')
            $component.find('[contenteditable]').removeAttr('contenteditable')
            $component.find('[_name]').removeAttr('_name')

            let content = $component[0].outerHTML
            content = htmlentities_decode(content)
            content = style_url_double_quotes_replace(content)

            return content
        };

        // 点击应用按钮回调函数
        vnode.attrs['onClickSaveCallback'] = function(value, $save, $save_close) {
            let $source = $(value);
            let $component = Component.getComponent();
            let $handle = Component.getHandle();
            // 除了布局组件，如果编辑的是整个组件，那么必需有组件容器
            if ($handle.find('[layout-content]').length == 0) {
                if (!$source.find('>[class*="container"]').length) {
                    notyf.warning('组件里必需有容器标签，本次修改已撤销！');
                } else {
                    $component.replaceWith($source);
                    Component.toFrameEditable($handle)
                    $source.trigger('click');
                }
            }

            $save.attr('disabled', false)
            $save_close.attr('disabled', false)
        }

        return m(RPanel.GroupButtonEditor, vnode.attrs)
    }
}