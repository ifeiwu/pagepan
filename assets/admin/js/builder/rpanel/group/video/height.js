RPanel.GroupVideoHeight = {
    
    view: function () {
        
        return m('.group', [
            m('.label', '视频高度'),
            m('.value', m('input[type="text"]', {
                oncreate: function (vnode) {
                    vnode.attrs.onupdate(vnode);
                },
                onupdate: function (vnode) {
                    $(vnode.dom).val($targetel.find('video').attr('height'));
                },
                oninput: function () {
                    $targetel.find('video').attr('height', this.value);
                }
            }))
        ])
    }
}