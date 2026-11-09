RPanel.GroupIframeWidth = {
    
    view: function () {
        
        return m('.group', [
            m('.label', '宽度'),
            m('.value', m('input[type="text"]', {
                oncreate: function (vnode) {
                    vnode.attrs.onupdate(vnode);
                },
                onupdate: function (vnode) {
                    $(vnode.dom).val($targetel.find('iframe').attr('width'));
                },
                oninput: function () {
                    $targetel.find('iframe').attr('width', this.value);
                }
            }))
        ])
    }
}