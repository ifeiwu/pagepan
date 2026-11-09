RPanel.GroupButtonSetting = {
    view: function(vnode) {
        vnode.attrs['text'] = m.trust('<svg width="19" height="19" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>')
        vnode.attrs['title'] = '动态设置'
        vnode.attrs['url'] = 'builder/winpage/monaco?lang=json'

        // 更新按钮状态
        vnode.attrs['updateButtonStatus'] = function(el, value) {
        }

        // // iframe通知消息事件内容处理回调函数
        vnode.attrs['getValueCallback'] = function(value) {
            return JSON.stringify(Component.getSetting(), null, '\t')
        }

        // 点击应用按钮回调函数
        vnode.attrs['onClickSaveCallback'] = function(value, $save, $save_close) {
            try {
                Component.setSetting(JSON.parse(value))
                Uikit.updateDynamicComponent('', '', function() {
                    $save.attr('disabled', false)
                    $save_close.attr('disabled', false)
                })
            } catch (err) {
                $save.attr('disabled', false)
                $save_close.attr('disabled', false)
                notyf.error('JSON 格式错误，请查看控制台输出结果！')
                console.error(err)
                console.error(value)
            }
        }

        return m(RPanel.GroupButtonEditor, vnode.attrs)
    }
}