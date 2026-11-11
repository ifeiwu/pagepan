const codeThemes = [
    { value: '', text: '无' },
    { value: 'default', text: 'Default' },
    { value: 'github', text: 'GitHub' },
    { value: 'github-dark', text: 'GitHub Dark' },
    { value: 'dark', text: 'Dark' },
    { value: 'vs', text: 'VS' },
    { value: 'rainbow', text: 'Rainbow' },
    { value: 'agate', text: 'Agate' },
    { value: 'androidstudio', text: 'Android Studio' },
    { value: 'monokai-sublime', text: 'Monokai Sublime' },
    { value: 'mono-blue', text: 'Mono Blue' },
    { value: 'base16/zenburn', text: 'base16/zenburn' },
    { value: 'base16/railscasts', text: 'base16/railscasts' },
    { value: 'base16/tomorrow', text: 'base16/tomorrow' },
    { value: 'base16/dracula', text: 'base16/dracula' }
];

export default function codeTheme(attrs = {}) {
    // 获取目标元素
    const $target = $(attrs.target);

    // 创建组件模板
    const $template = $(`
        <div class="field gap-1">
            <label class="label"></label>
            <select class="select"></select>
        </div>
    `);

    // 获取组件内部元素
    const $select = $template.find('select');

    // 设置标签
    $template.find('.label').text(attrs.label || '语言主题');

    // 生成主题选项
    codeThemes.forEach(({ value, text }) => {
        $select.append(
            $('<option>', {
                value: value,
                text: text
            })
        );
    });

    // 设置当前选中的主题
    $select.val($target.attr('theme') || '');

    // 监听选择变化，同步更新目标元素的主题属性
    $select.on('change', function () {
        $target.attr('theme', this.value);
    });

    // 返回组件模板
    return $template;
}