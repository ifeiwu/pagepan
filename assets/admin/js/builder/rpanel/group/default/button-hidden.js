// 隐藏组件按钮
RPanel.GroupButtonHidden = {
    view: function(vnode) {
        let off_icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m6 3 15 15"/></svg>'
        let on_icon = '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>'

        // 设置有值状态颜色
        const updateButtonStatus = function(el, value) {
            let $el = $(el);
            if (value === true) {
                $el.addClass('active')
                $el.html(off_icon)
                $el.attr('title', '显示组件')
            } else {
                $el.removeClass('active')
                $el.html(on_icon)
                $el.attr('title', '隐藏组件')
            }
        }

        return m('.group', [
            m('button[type="button"].btn', {
                oncreate: function(vnode) {
                    vnode.attrs.onupdate(vnode)
                },
                onupdate: function(vnode) {
                    let $handle = Component.getHandle();
                    if ($handle.is('.__handle--hidden')) {
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

                    let $handle = Component.getHandle();
                    if (value === true) {
                        $targetel.hide()
                        $handle.addClass('__handle--hidden')
                    } else {
                        $targetel.show()
                        $handle.removeClass('__handle--hidden')
                    }

                    updateButtonStatus(this, value)

                    // 动态组件添加样式
                    $.PFrame.setComponentSettingStyle()
                }
            }, '')
        ])
    }
}