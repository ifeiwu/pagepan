RPanel.GroupCodeTheme = {
    view: function (vnode) {
        let value = $targetel.attr('theme');
        let data = [
            {value: '', text: '无'},
            {value: 'default', text: 'Default'},
            {value: 'github', text: 'GitHub'},
            {value: 'github-dark', text: 'GitHub Dark'},
            {value: 'dark', text: 'Dark'},
            {value: 'vs', text: 'VS'},
            {value: 'rainbow', text: 'Rainbow'},
            {value: 'agate', text: 'Agate'},
            {value: 'androidstudio', text: 'Android Studio'},
            {value: 'monokai-sublime', text: 'Monokai Sublime'},
            {value: 'mono-blue', text: 'Mono Blue'},
            {value: 'base16/zenburn', text: 'base16/zenburn'},
            {value: 'base16/railscasts', text: 'base16/railscasts'},
            {value: 'base16/tomorrow', text: 'base16/tomorrow'},
            {value: 'base16/dracula', text: 'base16/dracula'}
        ];

        let callbacks = {
            onchange: function (value) {
                $targetel.attr('theme', value);
            }
        };
    	
        return m(RPanel.GroupSelectDefault, {'label': '语言主题', 'value': value, 'data': data, 'callbacks': callbacks});
    }
}