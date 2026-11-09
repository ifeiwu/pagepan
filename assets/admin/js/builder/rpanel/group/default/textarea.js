RPanel.GroupTextarea = {
    view: function (vnode) {
        let isbase64 = vnode.attrs['isbase64'];
        let placeholder = vnode.attrs['placeholder'] || '';
        let rows = vnode.attrs['rows'];
        let name = vnode.attrs['name'];
        let value = vnode.attrs['value'];
        let update_timeout_id = null;

        return m('.group', {'setting': name}, [
            m('.label', vnode.attrs['label']),
            m('.value', m('textarea', {
                oncreate: function (vnode) {
                    vnode.attrs.onupdate(vnode);
                },
                onupdate: function (vnode) {
                    $(vnode.dom).attr({'placeholder': placeholder, 'rows': rows});

                    if (value && isbase64 === true) {
                        value = Base64.decode(value);
                    }

                    $(vnode.dom).val(value);
                },
                oninput: function () {
                    let value = this.value;
                    if (value && isbase64 === true) {
                        value = Base64.encode(value);
                    }
                    // 动态组件添加设置
                    Component.setSetting(name, value);
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