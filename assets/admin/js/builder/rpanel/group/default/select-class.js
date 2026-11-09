RPanel.GroupSelectClass = {
    view: function (vnode) {
        let data = vnode.attrs['data'];
        let name = vnode.attrs['name'];
        let value = vnode.attrs['value'];
        let label = vnode.attrs['label'];
        let breakpoint = vnode.attrs['breakpoint'];

        let callbacks = {
            onchange: function (value) {
                Component.setSetting(name, value);

                let $handle = Component.getHandle()
                let setting_prefix = vnode.attrs['setting-prefix'];
                let class_prefix = vnode.attrs['class-prefix'];

                $targetel = $handle.find('[data-setting-prefix="' + setting_prefix + '"]');

                if (class_prefix) {
                    $.PFrame.addPrefixClass(class_prefix, value, breakpoint);
                    $.PFrame.removeGapClass(class_prefix);
                } else {
                    // 没有设置样式前缀，当前元素需要删除下拉列表所有值的样式，再添加选择的样式。
                    $select = $(vnode.dom).find('select');
                    let option_class_list = $select.find('option').map(function() {
                        return this.value;
                    }).get().filter(function(value) {
                        return value !== '';
                    });

                    if (breakpoint == true) {
                        option_class_list = option_class_list.join(window.breakpoint + ' ') + window.breakpoint;
                        value = value + window.breakpoint;
                    } else {
                        option_class_list = option_class_list.join(' ');
                    }

                    $targetel.removeClass(option_class_list);
                    $targetel.addClass(value);

                    $.PFrame.setComponentSettingClass();
                }

                $targetel = $handle.find('>[_name="component"]');

                // Uikit.updateDynamicComponent();
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