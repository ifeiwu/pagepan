RPanel.GroupLottieHover = {
    
    view: function () {
        
        return m('.group', [
            m('.label', '悬停动画'),
            m('.value', [
                m('input[name="hover"][id="hover1"][type="radio"][value=""][checked]', {
                    oncreate: function (vnode) {
                        vnode.attrs.onupdate(vnode);
                    },
                    onupdate: function (vnode) {
                        $(vnode.dom).prop('checked', ! $targetel.is('[hover]'));
                    },
                    onchange: function () {
                        $targetel.removeAttr('hover');
                    }
                }),
                m('label[for="hover1"]', '否'),
                m('input[name="hover"][id="hover2"][type="radio"][value="hover"]', {
                    oncreate: function (vnode) {
                        vnode.attrs.onupdate(vnode);
                    },
                    onupdate: function (vnode) {
                        $(vnode.dom).prop('checked', $targetel.is('[hover]'));
                    },
                    onchange: function () {
                        $targetel.attr({'hover': ''});
                    }
                }),
                m('label[for="hover2"]', '是')
            ])
        ])
    }
}