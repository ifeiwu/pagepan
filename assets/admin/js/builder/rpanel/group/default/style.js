// 响应式 CSS 样式变量输入设置
RPanel.GroupStyle = {
    view: function (vnode) {
        let placeholder = vnode.attrs['placeholder'] || '';
        let rows = vnode.attrs['rows'];
        let name = vnode.attrs['name'];
        let value = vnode.attrs['value'];
        let save_value = value ?? ''; // 保存原有的值
        let attrname = vnode.attrs['attrname'];
        let label = vnode.attrs['label'];
        let update_timeout_id = null;

        let breakpoint = vnode.attrs['breakpoint'] ?? false;
        if (breakpoint == true) {
            attrname = attrname + window.breakpoint;
            label = m.trust(label + '<span class="icon" title="' + window.breakpointText + '">' + window.breakpointIcon + '</span>');
        }

        // CSS样式字符串转换为一个对象
        function css2kv(cssstr) {
            let stylekv = {};
            let styles = cssstr.split(';').filter(style => style.trim() !== '');
            styles.forEach(style => {
                const [key, value] = style.split(':').map(s => s.trim());
                if (key && value) {
                    stylekv[key] = value;
                }
            });
            return stylekv;
        }

        // CSS样式对象转换回CSS样式字符串
        function kv2css(stylekv) {
            let cssstr = '';
            for (const [key, value] of Object.entries(stylekv)) {
                cssstr += `${key}:${value};`;
            }
            return cssstr.trim();
        }

        return m('.group', {'setting': name}, [
            m('.label', label),
            m('.value', m('textarea', {
                oncreate: function (vnode) {
                    vnode.attrs.onupdate(vnode);
                },
                onupdate: function (vnode) {
                    $(vnode.dom).attr({'placeholder': placeholder, 'rows': rows});
                    let stylekv = css2kv(save_value);
                    $(vnode.dom).val(stylekv[attrname]);
                },
                oninput: function () {
                    let value = this.value;
                    let stylekv = css2kv(save_value);
                    stylekv[attrname] = value;
                    // 动态组件添加设置
                    Component.setSetting(name, kv2css(stylekv));
                    // 停止一秒输入自动更新动态组件
                    clearTimeout(update_timeout_id);
                    update_timeout_id = setTimeout(function () {
                        Uikit.updateDynamicComponent();
                    }, 1000);
                }
            }))
        ])
    }
}