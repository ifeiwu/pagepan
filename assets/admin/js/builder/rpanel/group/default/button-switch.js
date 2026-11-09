RPanel.GroupButtonSwitch = {
    view: function(vnode) {
        let group_class = vnode.attrs['group.class'] || ''
        let name = vnode.attrs['name']
        let text = vnode.attrs['text']
        let title = vnode.attrs['title']
        let value = vnode.attrs['value'] || ''

        // 设置有值状态颜色
        const updateButtonStatus = function(el, value) {
            if (value === true) {
                $(el).addClass('active')
            } else {
                $(el).removeClass('active')
            }
        }

        return m('.group' + group_class, { 'setting': name }, [
            m('button[type="button"].btn', {
                'title': title,
                oncreate: function(vnode) {
                    vnode.attrs.onupdate(vnode)
                },
                onupdate: function(vnode) {
                    if (value) {
                        $(vnode.dom).data('checked', true)
                    } else {
                        $(vnode.dom).data('checked', '')
                    }
                    updateButtonStatus(vnode.dom, value)
                },
                onclick: function() {
                    let value = $(this).data('checked')
                    value = value == '' ? true : ''

                    $(this).data('checked', value)

                    updateButtonStatus(this, value)

                    Component.setSetting(name, value)
                }
            }, text)
        ])
    }
}