RPanel.GroupSvgHeight = {
    
    view: function () {
        
        return m('.group', [
            m('.label', '高度'),
            m('.value', m('input[type="text"][name="svg_height"]', {
                oncreate: function (vnode) {
                    
                    vnode.attrs.onupdate(vnode);
                },
                onupdate: function (vnode) {
                    
                    $(vnode.dom).val($targetel.attr('height'));
                },
                oninput: function () {
                    $targetel.attr('height', this.value ? this.value : 0);
                }
            }))
        ])
    }
}