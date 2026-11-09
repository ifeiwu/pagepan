// 反色组件按钮
RPanel.GroupButtonTheme = {
    view: function(vnode) {
        let off_icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5"/><path d="m4 2 15 15"/><path d="M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>'
        let on_icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>'

        // 设置有值状态颜色
        const updateButtonStatus = function(el, value) {
            let $el = $(el);
            if (value === true) {
                $el.addClass('active')
                $el.html(off_icon)
            } else {
                $el.removeClass('active')
                $el.html(on_icon)
            }
        }

        return m('.group', [
            m('button[type="button"][title="切换主题"].btn', {
                oncreate: function(vnode) {
                    vnode.attrs.onupdate(vnode)
                },
                onupdate: function(vnode) {
                    if ($targetel.is('.theme-invert')) {
                        $(vnode.dom).data('checked', true)
                    } else {
                        $(vnode.dom).data('checked', '')
                    }

                    let value = $(vnode.dom).data('checked')

                    updateButtonStatus(vnode.dom, value)
                },
                onclick: function() {
                    let value = $(this).data('checked')
                    value = value == '' ? true : ''

                    $(this).data('checked', value)

                    if (value === true) {
                        $targetel.addClass('theme-invert')
                    } else {
                        $targetel.removeClass('theme-invert')
                    }

                    updateButtonStatus(this, value)

                    // 动态组件删除样式
                    $.PFrame.setComponentSettingClass()
                }
            }, '')
        ])
    }
}