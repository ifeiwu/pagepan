RPanel.GroupVideoAutoplay = {
    
    view: function () {
        
        return m('.group', [
            m('.label', '自动播放'),
            m('.value', [
                m('input[name="target"][id="target1"][type="radio"][value=""][checked]', {
                    oncreate: function (vnode) {
                        vnode.attrs.onupdate(vnode);
                    },
                    onupdate: function (vnode) {
                        $(vnode.dom).prop('checked', ! $targetel.find('video').is('[autoplay]'));
                    },
                    onchange: function () {
                        $targetel.find('video').removeAttr('autoplay').removeAttr('muted');
                    }
                }),
                m('label[for="target1"]', '否'),
                m('input[name="target"][id="target2"][type="radio"][value="autoplay"]', {
                    oncreate: function (vnode) {
                        vnode.attrs.onupdate(vnode);
                    },
                    onupdate: function (vnode) {
                        $(vnode.dom).prop('checked', $targetel.find('video').is('[autoplay]'));
                    },
                    onchange: function () {
                        $targetel.find('video').attr({'autoplay': true, 'muted': true});
                    }
                }),
                m('label[for="target2"]', '是')
            ])
        ])
    }
}