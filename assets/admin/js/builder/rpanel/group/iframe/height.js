RPanel.GroupIframeHeight = {
    view: function() {
        return m('.group', [
            m('.label', '高度'),
            m('.value', m('input[type="text"]', {
                oncreate: function(vnode) {
                    vnode.attrs.onupdate(vnode)
                },
                onupdate: function(vnode) {
                    $(vnode.dom).val($targetel.find('iframe').attr('height'))
                },
                oninput: function() {
                    $targetel.find('iframe').attr('height', this.value)
                }
            }))
        ])
    }
}