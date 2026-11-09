RPanel.GroupLinkTarget = {
    view: function () {
        return m('.group', [
            m('.label', '打开方式'),
            m('.value', [
                m('input[name="link_target"][id="target1"][type="radio"][value=""][checked]', {
                    oncreate: function (vnode) {
                        vnode.attrs.onupdate(vnode);
                    },
                    onupdate: function (vnode) {
                        $(vnode.dom).prop('checked', !$targetel.closest('a').attr('target') ? true : false);
                    },
                    onchange: function () {
                        $targetel.closest('a').removeAttr('target');
                        $targetel.closest('a').removeAttr('data-modal');
                    }
                }),
                m('label[for="target1"]', '本窗口'),
                m('input[name="link_target"][id="target2"][type="radio"][value="_blank"]', {
                    oncreate: function (vnode) {
                        vnode.attrs.onupdate(vnode);
                    },
                    onupdate: function (vnode) {
                        $(vnode.dom).prop('checked', $targetel.closest('a').attr('target') == '_blank' ? true : false);
                    },
                    onchange: function () {
                        $targetel.closest('a').attr('target', this.value);
                        $targetel.closest('a').removeAttr('data-modal');
                    }
                }),
                m('label[for="target2"]', '新窗口'),
                m('input[name="link_target"][id="target3"][type="radio"][value="_modal"]', {
                    oncreate: function (vnode) {
                        vnode.attrs.onupdate(vnode);
                    },
                    onupdate: function (vnode) {
                        $(vnode.dom).prop('checked', $targetel.closest('a').is('[data-modal],[target="_modal"]') ? true : false);
                    },
                    onchange: function () {
                        if (this.checked) {
                            $targetel.closest('a').attr('target', '_modal');
                        } else {
                            $targetel.closest('a').removeAttr('target');
                        }
                    }
                }),
                m('label[for="target3"]', '弹窗口')
            ])
        ])
    }
}