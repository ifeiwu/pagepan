RPanel.GroupColorPicker = {
    view: function(vnode) {
        let name = vnode.attrs['name']
        let value = vnode.attrs['value']
        let label = vnode.attrs['label']
        value = value ?? ''

        return m('.group', {'setting': name}, [
            m('.label', label),
            m('.value',
                m('button[type="button"].color-picker', {
                    oncreate: function(vnode) {
                        const pickr = $.pb.fn.getColorPickr({
                            el: vnode.dom,
                            // theme: 'monolith',
                            default: value,
                            components: {
                                preview: false,
                                opacity: true,
                                hue: true,
                                interaction: {
                                    hex: true,
                                    rgba: true,
                                    hsva: false,
                                    input: true,
                                    cancel: false,
                                    clear: true,
                                    save: true
                                }
                            }
                        })

                        pickr.on('change', (color) => {
                            $(vnode.dom).css('background-color', color.toHEXA().toString(0))
                        })

                        pickr.on('save', (color) => {

                            let color_value = color ? color.toHEXA().toString() : ''

                            $(vnode.dom).css('background-color', color_value)

                            // 动态组件添加设置
                            Component.setSetting(name, color_value)
                            Uikit.updateDynamicComponent()

                            pickr.hide()
                        })

                        pickr.on('show', (color) => {
                            $(vnode.dom).css('background-color', color.toHEXA().toString())
                        })

                        vnode.attrs.onupdate(vnode)
                    },
                    onupdate: function(vnode) {
                        $(vnode.dom).css('background-color', value)
                    }
                }, '')
            )
        ])
    }
}