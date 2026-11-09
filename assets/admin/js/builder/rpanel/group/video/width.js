RPanel.GroupVideoWidth = {
    
    view: function () {
        
        return m('.group', [
            m('.label', '视频宽度'),
            m('.value', m('input[type="text"]', {
                oncreate: function (vnode) {
                    vnode.attrs.onupdate(vnode);
                },
                onupdate: function (vnode) {
                    $(vnode.dom).val($targetel.find('video').attr('width'));
                },
                oninput: function () {
                    $targetel.find('video').attr('width', this.value);
                }
            }))
        ])
    }
}