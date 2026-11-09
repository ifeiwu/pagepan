RPanel.GroupLottieControls = {
    
    view: function () {
        
        return m('.group', [
            m('.label', '动画控制'),
            m('.value', [
                m('input[name="controls"][id="controls1"][type="radio"][value=""][checked]', {
                    oncreate: function (vnode) {
                        vnode.attrs.onupdate(vnode);
                    },
                    onupdate: function (vnode) {
                        $(vnode.dom).prop('checked', ! $targetel.is('[controls]'));
                    },
                    onchange: function () {
                        $targetel.removeAttr('controls');
                    }
                }),
                m('label[for="controls1"]', '否'),
                m('input[name="controls"][id="controls2"][type="radio"][value="controls"]', {
                    oncreate: function (vnode) {
                        vnode.attrs.onupdate(vnode);
                    },
                    onupdate: function (vnode) {
                        $(vnode.dom).prop('checked', $targetel.is('[controls]'));
                    },
                    onchange: function () {
                        $targetel.attr({'controls': ''});
                    }
                }),
                m('label[for="controls2"]', '是')
            ])
        ])
    }
}