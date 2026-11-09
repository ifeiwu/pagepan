RPanel.GroupId = {
    view: function() {
        return m('.group', [
            m('.label', '元素 ID'),
            m('.value',
                m('input[type="text"][placeholder=""]', {
                    oncreate: function(vnode) {
                        vnode.attrs.onupdate(vnode)
                    },
                    onupdate: function(vnode) {
                        $(vnode.dom).val($targetel.attr('id'))
                    },
                    oninput: function() {
                        if (this.value) {
                            $targetel.attr('id', this.value)
                        } else {
                            $targetel.removeAttr('id')
                        }
                        // 动态组件添加id
                        Component.setSetting('component.id', this.value)
                    }
                })
            )
        ])
    }
}