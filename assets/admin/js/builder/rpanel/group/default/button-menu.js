// 菜单编辑
RPanel.GroupButtonMenu = {
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
            return Component.getSetting(name)
        };

        // 点击应用按钮回调函数
        vnode.attrs['onClickSaveCallback'] = function(value, $save, $save_close) {
            value = JSON.parse(value);
            Component.setSetting(name, value)
            Uikit.updateDynamicComponent('', '', function() {
                $save.attr('disabled', false)
                $save_close.attr('disabled', false)
            })
        }
        return m(RPanel.GroupButtonEditor, vnode.attrs)
    }
}