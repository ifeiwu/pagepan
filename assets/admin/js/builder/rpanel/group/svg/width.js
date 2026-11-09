RPanel.GroupSvgWidth = {
    
    view: function () {
        
        return m('.group', [
            m('.label', '宽度'),
            m('.value', m('input[type="text"][name="svg_width"]', {
                oncreate: function (vnode) {
                    
                    vnode.attrs.onupdate(vnode);
                },
                onupdate: function (vnode) {
                    
                    $(vnode.dom).val($targetel.attr('width'));
                },
                oninput: function () {
                    $targetel.attr('width', this.value ? this.value : 0);
                }
            }))
        ])
    }
}