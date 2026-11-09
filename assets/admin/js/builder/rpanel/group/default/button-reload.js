// 重新加载动态组件
RPanel.GroupButtonReload = {
    view: function(vnode) {
        vnode.attrs['title'] = '刷新组件'
        vnode.attrs['text'] = m.trust('<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>')

        // 点击按钮回调函数
        vnode.attrs['onClickCallback'] = function(btn) {
            Uikit.updateDynamicComponent('', '', function() {
                $(btn).attr('disabled', false)
            })
        }

        return m(RPanel.GroupButton, vnode.attrs)
    }
}