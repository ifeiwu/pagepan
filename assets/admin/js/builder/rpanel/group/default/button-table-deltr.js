// 表格删除行
RPanel.GroupButtonTableDelTr = {
    view: function(vnode) {
        vnode.attrs['title'] = '删除行'
        vnode.attrs['text'] = m.trust('<svg width="16" height="16" fill="currentColor"><path d="M2.492 4c-.822 0-1.5.677-1.5 1.5v4c0 .823.678 1.5 1.5 1.5h4.551c-.019.166-.05.329-.05.5 0 2.48 2.02 4.5 4.5 4.5 2.479 0 4.5-2.02 4.5-4.5a4.5 4.5 0 00-2-3.738V5.5c0-.823-.678-1.5-1.5-1.5h-10zm0 1h10c.282 0 .5.219.5.5v1.775a4.443 4.443 0 00-1.5-.275C9.541 7 7.89 8.258 7.268 10H2.492a.493.493 0 01-.5-.5v-4c0-.281.219-.5.5-.5zm9 3c1.94 0 3.5 1.561 3.5 3.5s-1.56 3.5-3.5 3.5a3.492 3.492 0 01-3.5-3.5c0-1.939 1.561-3.5 3.5-3.5zm-2.5 3v1h5v-1h-5z"/></svg>')

        // 点击按钮回调函数
        vnode.attrs['onClickCallback'] = function(btn) {
            $targetel.closest('tr').remove();

            $(btn).attr('disabled', false)
        }

        return m(RPanel.GroupButton, vnode.attrs)
    }
}