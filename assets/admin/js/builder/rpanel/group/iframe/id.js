RPanel.GroupIframeId = {
    view: function () {
        return m('.group', [
            m('.label', '元素 ID'),
            m('.value',
                m('input[type="text"][placeholder=""]', {
                    oncreate: function (vnode) {
                        vnode.attrs.onupdate(vnode);
                    },
                    onupdate: function (vnode) {
                        $(vnode.dom).val($targetel.attr('id'));
                    },
                    oninput: function () {
                        if (this.value) {
                            $targetel.find('iframe').attr('id', this.value);
                            // $tagname.html(tagtext + '#' + this.value);
                        } else {
                            $targetel.find('iframe').removeAttr('id');
                            // $tagname.html(tagtext);
                        }
                    }
                })
            )
        ])
    }
}