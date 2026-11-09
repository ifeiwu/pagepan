RPanel.GroupSelectContainer = {
    view: function(vnode) {
        let label = '容器宽度'
        let name = 'container.class'
        let data = [
            { value: 'container', text: '默认' },
            { value: 'container container-sm', text: '560px' },
            { value: 'container container-md', text: '768px' },
            { value: 'container container-lg', text: '1024px' },
            { value: 'container container-xl', text: '1280px' },
            { value: 'container container-2xl', text: '1440px' },
            { value: 'container container-3xl', text: '1680px' },
            { value: 'container container-fluid', text: '最大' },
            { value: 'container-fluid', text: '填满' }
        ]
        let values = data.map(item => item.value)
        let classes = values.slice(1).join(' ')
        let $container = Component.getContainer()

        let value = ''
        for (let v of values) {
            let vs = v.split(' ')
            if (vs.length == 1) {
                if ($container.is('.container-fluid')) {
                    value = 'container-fluid'
                } else {
                    value = 'container'
                }
            } else if ($container.is('.' + vs.join('.'))) {
                value = v
                break
            }
        }

        let callbacks = {
            onchange: function(value) {
                $container.removeClass(classes).addClass(value)
                if (Component.isDynamic()) {
                    Component.setSetting(name, $container.attr('class'))
                    Uikit.updateDynamicComponent();
                }
            }
        }

        return m(RPanel.GroupSelectDefault, {
            'label': label,
            'name': name,
            'value': value,
            'data': data,
            'callbacks': callbacks
        })
    }
}