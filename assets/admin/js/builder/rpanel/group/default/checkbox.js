RPanel.GroupCheckbox = {
    view: function(vnode) {
        let name = vnode.attrs['name']
        let text = vnode.attrs['text']
        let value = vnode.attrs['value']
        let default_value = vnode.attrs['default_value']

        return m('.group', { 'setting': name }, [
            m('.value', [
                m('input[type="checkbox"]', {
                    oncreate: function(vnode) {
                        vnode.attrs.onupdate(vnode)
                    },
                    onupdate: function(vnode) {
                        if (value) {
                            $(vnode.dom).prop('checked', true)
                        } else {
                            $(vnode.dom).prop('checked', false)
                        }
                    },
                    onchange: function() {
                        let value = this.checked ? this.value : ''
                        // 动态组件添加设置
                        Component.setSetting(name, value)
                        Uikit.updateDynamicComponent()
                    }
                }),
                m('label', text)
            ])
        ])
    }
}