// 删除元素或组件
RPanel.GroupButtonRemove = {
    view: function(vnode) {
        vnode.attrs['text'] = m.trust('<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>')

        // 点击按钮回调函数
        vnode.attrs['onClickCallback'] = function(btn) {
            if ($.PFrame.isI18nKeys()) {
                modal.confirm('这个元素已启用多语言支持，是否同时删除？', '提示', {
                    buttons: {
                        yes: {
                            text: '是',
                            action: function() {
                                $.PFrame.removeI18nKeys();
                                $.PFrame.deleteTargetel();
                            }
                        },
                        no: {
                            text: '否',
                            action: function() {
                                $.PFrame.deleteTargetel();
                            }
                        }
                    }
                })
            } else {
                $.PFrame.deleteTargetel();
            }
            $(btn).attr('disabled', false)
        }

        return m(RPanel.GroupButton, vnode.attrs)
    }
}