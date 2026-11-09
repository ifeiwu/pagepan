RPanel.GroupSelectImage = {
    view: function (vnode) {
        let data = vnode.attrs['data'];
        let name = vnode.attrs['name'];
        let value = (vnode.attrs['value'] ?? '').toString();
        let label = vnode.attrs['label'];
        let callbacks = vnode.attrs['callbacks'] ?? {};

        return m('.group', {'setting': name}, [
            m('.label', label),
            m('.value', m('select[placeholder="未选择"][autocomplete="off"]', {
                    name: name,
                    oncreate: function (vnode) {
                        new TomSelect(vnode.dom, {
                            maxOptions: 1000,
                            allowEmptyOption: true,
                            controlInput: null,
                            create: false,
                            valueField: 'value',
                            searchField: 'text',
                            options: data,
                            items: [value],
                            onChange: function(value) {
                                callbacks.onchange(value);
                            },
                            render: {
                                option: function(data, escape) {
                                    let value = data.value
                                    if (value) {
                                        return `<div class="image"><img src="${data.image}" alt="" /></div>`;
                                    } else {
                                        return `<div>${data.text}</div>`;
                                    }
                                },
                                item: function(data, escape) {
                                    let value = data.value
                                    if (value) {
                                        return `<div class="image"><div><img src="${data.image}" alt=""></div><div>${value}</div></div>`;
                                    } else {
                                        return `<div>${data.text}</div>`
                                    }
                                }
                            }
                        });

                        if ('toggleOptions' in callbacks) {
                            callbacks.toggleOptions(value);
                        }
                    },
                    onupdate: function (vnode) {
                        vnode.dom.value = value;

                        if ('toggleOptions' in callbacks) {
                            callbacks.toggleOptions(value);
                        }
                    }
                })
            )
        ])
    }
}