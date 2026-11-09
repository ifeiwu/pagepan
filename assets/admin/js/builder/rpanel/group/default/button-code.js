// 动态组件置入代码
RPanel.GroupButtonCode = {
    view: function(vnode) {
        let name = vnode.attrs['name']

        // 更新按钮状态
        vnode.attrs['updateButtonStatus'] = function(el, value) {
            if (value) {
                $(el).addClass('reddot')
            } else {
                $(el).removeClass('reddot')
            }
        };

        // iframe通知消息事件内容处理回调函数
        vnode.attrs['getValueCallback'] = function(value) {
            value = Component.getSetting(name)
            return value ? Base64.decode(value) : ''
        };

        // 点击应用按钮回调函数
        vnode.attrs['onClickSaveCallback'] = function(value, $save, $save_close) {
            value = value ? Base64.encode(value) : ''
            Component.setSetting(name, value)
            Uikit.updateDynamicComponent('', '', function() {
                $save.attr('disabled', false)
                $save_close.attr('disabled', false)
            })
        }

        return m(RPanel.GroupButtonEditor, vnode.attrs)
    }
}