RPanel.GroupSelectDefault = {
    view: function (vnode) {
        let data = vnode.attrs['data'];
        let name = vnode.attrs['name'];
        let value = (vnode.attrs['value'] ?? '').toString();
        let label = vnode.attrs['label'];
        let callbacks = vnode.attrs['callbacks'] ?? {};
        let breakpoint = vnode.attrs['breakpoint'] ?? false;
        if (breakpoint == true) {
            label = m.trust(label + '<span class="icon" title="' + window.breakpointText + '">' + window.breakpointIcon + '</span>');
        }

        return m('.group', {'setting': name}, [
            m('.label', label),
            m('select', {
                name: name,
                onchange: function () {
                    callbacks.onchange(this.value);
                },
                oncreate: function (vnode) {
                    if ('oncreate' in callbacks) {
                        callbacks.oncreate(value, vnode.dom);
                    }
                },
                onupdate: function (vnode) {
                    vnode.dom.value = value;
                    if ('onupdate' in callbacks) {
                        callbacks.onupdate(value, vnode.dom);
                    }
                }
            }, data.map(function (option, index) {
                let group = option['group'];
                if ($.isArray(group)) {
                    return m('optgroup', {'label': option.label}, group.map(function (option, index) {
                        return m('option', {
                            value: option.value,
                            oncreate: function (vnode) {
                                if (value == option.value) {
                                    vnode.dom.selected = true;
                                }
                            }
                        }, option.text)
                    }));
                } else {
                    return m('option', {
                        value: option.value,
                        oncreate: function (vnode) {
                            if (value == option.value) {
                                vnode.dom.selected = true;
                            }
                        }
                    }, option.text);
                }
            }))
        ])
    }
}