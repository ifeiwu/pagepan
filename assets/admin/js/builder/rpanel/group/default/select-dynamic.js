// 动态组件属性设置下拉列表
RPanel.GroupSelectDynamic = {
    view: function(vnode) {
        let data = vnode.attrs['data']
        let name = vnode.attrs['name']
        let value = vnode.attrs['value']
        let label = vnode.attrs['label']
        let breakpoint = vnode.attrs['breakpoint']

        let callbacks = {
            onchange: function(value) {
                Component.setSetting(name, value)
                Uikit.updateDynamicComponent()
            }
        }

        return m(RPanel.GroupSelectDefault, {
            'breakpoint': breakpoint,
            'label': label,
            'name': name,
            'value': value,
            'data': data,
            'callbacks': callbacks
        })
    }
}