// 选择组件分类或列表等编号，更换布局样式。
RPanel.GroupSelectAlias = {
    view: function (vnode) {
        let data = vnode.attrs['data'];
        let name = vnode.attrs['name'];
        let value = vnode.attrs['value'];
        let label = vnode.attrs['label'];
        let uikit_assets = builder.uikit.url + 'assets';

        // 添加图片地址
        data.forEach(function(item, i) {
            let subdir = item.text ? `/${item.text}` : '';
            let image = uikit_assets + '/' + name.replace('.alias', `${subdir}/${item.value}`).replace('.', '/') + '.webp';
            data[i]['image'] = image;
        })

        let callbacks = {
            onchange: function (value) {
                // 更换布局需要清空之前的设置，如列表水平间隔或垂直间隔等。
                let setting = Component.getSetting();
                let prefix = name.replace('.alias', '');
                Object.keys(setting).forEach(key => {
                    if (key.startsWith(prefix + '.gx') ||
                        key.startsWith(prefix + '.gy') ||
                        key.startsWith(prefix + '.gap-x') ||
                        key.startsWith(prefix + '.gap-y') ||
                        key.startsWith(prefix + '.row') ||
                        key.startsWith(prefix + '.grid-cols')
                    ) {
                        delete setting[key];
                    }
                });

                Component.setSetting(name, value);
                Uikit.updateDynamicComponent();
            },
            // 如果组件区域下拉关闭（分类、分页等），则隐藏其它相关表单输入。
            oncreate: function (value) {
                let prefix = name.replace('.alias', '');
                let $groups = RPanel.$.find(`[setting^="${prefix}."][setting!="${name}"]`);
                if (value == '') {
                    $groups.addClass('hidden');
                } else {
                    $groups.removeClass('hidden');
                }
            }
        };

        return m(RPanel.GroupSelectImage, {
            'label': label,
            'name': name,
            'value': value,
            'data': data,
            'callbacks': callbacks
        });

        // return m(RPanel.GroupSelectDefault, {
        //     'label': label,
        //     'name': name,
        //     'value': value,
        //     'data': data,
        //     'callbacks': callbacks
        // });
    }
}