// 表格删除行
RPanel.GroupButtonTableDelTc = {
    view: function(vnode) {
        vnode.attrs['title'] = '删除列'
        vnode.attrs['text'] = m.trust('<svg width="16" height="16" fill="currentColor"><path d="M5.5 1C4.677 1 4 1.677 4 2.5v10c0 .823.677 1.5 1.5 1.5h2.262a4.5 4.5 0 003.738 2c2.48 0 4.5-2.02 4.5-4.5S13.98 7 11.5 7c-.171 0-.334.032-.5.05V2.5c0-.823-.677-1.5-1.5-1.5h-4zm0 1h4c.281 0 .5.219.5.5v4.775C8.258 7.897 7 9.55 7 11.5c0 .528.107 1.029.275 1.5H5.5a.493.493 0 01-.5-.5v-10c0-.281.219-.5.5-.5zm6 6c1.939 0 3.5 1.561 3.5 3.5S13.439 15 11.5 15A3.492 3.492 0 018 11.5C8 9.561 9.561 8 11.5 8zM9 11v1h5v-1H9z"/></svg>')

        // 点击按钮回调函数
        vnode.attrs['onClickCallback'] = function(btn) {
            let $trs = $targetel.closest('table').find('tr');
            let index = $targetel.closest('th,td').index();
            $trs.each(function () {
                let $cell = $(this).find('th,td').eq(index);
                $cell.remove();
            });

            $(btn).attr('disabled', false)
        }

        return m(RPanel.GroupButton, vnode.attrs)
    }
}