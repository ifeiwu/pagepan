RPanel.GroupModalTarget = {
    view: function() {
        return m('.group', [
            m('.label', '弹出窗口'),
            m('.value',
                m('input[type="text"][placeholder="元素ID或页面链接"]', {
                    oncreate: function(vnode) {
                        vnode.attrs.onupdate(vnode)
                    },
                    onupdate: function(vnode) {
                        $(vnode.dom).val($targetel.attr('data-modal'))
                    },
                    oninput: function() {
                        if (this.value) {
                            $targetel.attr('data-modal', this.value)
                        } else {
                            $targetel.removeAttr('data-modal')
                        }
                    }
                })
            )
        ])
    }
}