RPanel.GroupLottieAutoplay = {
    
    view: function () {
        
        return m('.group', [
            m('.label', '自动播放'),
            m('.value', [
                m('input[name="autoplay"][id="autoplay1"][type="radio"][value=""][checked]', {
                    oncreate: function (vnode) {
                        vnode.attrs.onupdate(vnode);
                    },
                    onupdate: function (vnode) {
                        $(vnode.dom).prop('checked', ! $targetel.is('[autoplay]'));
                    },
                    onchange: function () {
                        $targetel.removeAttr('autoplay');
                    }
                }),
                m('label[for="autoplay1"]', '否'),
                m('input[name="autoplay"][id="autoplay2"][type="radio"][value="autoplay"]', {
                    oncreate: function (vnode) {
                        vnode.attrs.onupdate(vnode);
                    },
                    onupdate: function (vnode) {
                        $(vnode.dom).prop('checked', $targetel.is('[autoplay]'));
                    },
                    onchange: function () {
                        $targetel.attr({'autoplay': ''});
                    }
                }),
                m('label[for="autoplay2"]', '是')
            ])
        ])
    }
}