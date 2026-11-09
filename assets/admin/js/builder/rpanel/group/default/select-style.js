RPanel.GroupSelectStyle = {
    view: function (vnode) {
        let data = vnode.attrs['data'];
        let name = vnode.attrs['name'];
        let value = vnode.attrs['value'];
        let label = vnode.attrs['label'];
        let attrname = vnode.attrs['attrname'];
        let breakpoint = vnode.attrs['breakpoint'];

        let callbacks = {
            onchange: function (value) {
                Component.setSetting(name, value);

                let setting_prefix = vnode.attrs['setting-prefix'];

                $targetel = $handle.find('[data-setting-prefix="' + setting_prefix + '"]');
                // 样式变量，支持响应式，如：--h:30px
                if (attrname.indexOf('--') == 0) {
                    $.PFrame.addPrefixStyleVar(attrname.replace('--', ''), value, breakpoint);
                } else {
                    // 样式属性，不支持响应式，如：height:30px
                    $.PFrame.addStyle(attrname, value);
                    $.PFrame.setComponentSettingStyle();
                }

                $targetel = $handle.find('>[_name="component"]');

                Uikit.updateDynamicComponent();
            }
        };

        return m(RPanel.GroupSelectDefault, {
            'breakpoint': breakpoint,
            'label': label,
            'name': name,
            'value': value,
            'data': data,
            'callbacks': callbacks
        });
    }
}