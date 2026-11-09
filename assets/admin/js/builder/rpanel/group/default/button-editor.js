RPanel.GroupButtonEditor = {
    view: function(vnode) {
        let group_class = vnode.attrs['group.class']
        group_class = group_class ? ' ' + group_class : ''
        let name = vnode.attrs['name']
        let text = vnode.attrs['text']
        let title = vnode.attrs['title'] || text
        let url = vnode.attrs['url']
        let getValueCallback = vnode.attrs['getValueCallback']
        let onClickSaveCallback = vnode.attrs['onClickSaveCallback']
        let updateButtonStatus = vnode.attrs['updateButtonStatus']
        let btnel

        return m('.group' + group_class, { 'setting': name }, [
            m('button[type="button"].btn', {
                'title': title,
                oncreate: function(vnode) {
                    btnel = vnode.dom
                    vnode.attrs.onupdate()
                },
                onupdate: function() {
                    let value = getValueCallback()
                    updateButtonStatus(btnel, value)
                },
                onclick: function() {
                    let $apply = $(this)
                    $apply.attr('disabled', true)

                    let value = getValueCallback()
                    WinboxEditor.open(url, title, value,
                        function(value, $save, $save_close) {
                            onClickSaveCallback(value, $save, $save_close);
                            updateButtonStatus(btnel, value)
                        },
                        function() {
                            $apply.attr('disabled', false)
                        }
                    )
                }
            }, text)
        ])
    }
}