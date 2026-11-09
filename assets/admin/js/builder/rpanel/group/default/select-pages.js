RPanel.GroupSelectPages = {
    view: function (vnode) {
        let name = vnode.attrs['name'];
        let value = vnode.attrs['value'];
        let _setting = vnode.attrs['_setting'];
        let data = [{"text": "请选择页面", "value": ""}];
        
        $.ajax({
            url: 'pager/action/pages?type=' + _setting['filter_type'],
            async: false,
            success: function (pages) {
                pages.forEach(function (page) {
                    data.push({"text": page.title, "value": page.alias});
                });
            }
        });
        
        _setting.data = data;

        return m(RPanel.GroupSelectDynamic, $.extend(_setting, {'name': name, 'value': value}));
    }
}