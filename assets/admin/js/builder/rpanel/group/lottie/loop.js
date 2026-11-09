RPanel.GroupLottieLoop = {
    
    view: function () {
        
        return m('.group', [
            m('.label', '循环播放'),
            m('.value', [
                m('input[name="loop"][id="loop1"][type="radio"][value=""][checked]', {
                    oncreate: function (vnode) {
                        vnode.attrs.onupdate(vnode);
                    },
                    onupdate: function (vnode) {
                        $(vnode.dom).prop('checked', ! $targetel.is('[loop]'));
                    },
                    onchange: function () {
                        $targetel.removeAttr('loop');
                    }
                }),
                m('label[for="loop1"]', '否'),
                m('input[name="loop"][id="loop2"][type="radio"][value="loop"]', {
                    oncreate: function (vnode) {
                        vnode.attrs.onupdate(vnode);
                    },
                    onupdate: function (vnode) {
                        $(vnode.dom).prop('checked', $targetel.is('[loop]'));
                    },
                    onchange: function () {
                        $targetel.attr({'loop': ''});
                    }
                }),
                m('label[for="loop2"]', '是')
            ])
        ])
    }
}