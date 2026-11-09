RPanel.GroupButton = {
    view: function(vnode) {
        let name = vnode.attrs['name']
        let text = vnode.attrs['text']
        let title = vnode.attrs['title']
        let value = vnode.attrs['value']
        let onClickCallback = vnode.attrs['onClickCallback']

        return m('.group', { 'setting': name }, [
            m('button[type="button"].btn', {
                'title': title,
                oncreate: function(vnode) {
                },
                onupdate: function(vnode) {
                },
                onclick: function() {
                    $(this).attr('disabled', true)

                    onClickCallback(this);
                }
            }, text)
        ])
    }
}