// 代码语言选项
const languages = [
    { value: '', text: '自动识别' },
    { value: 'nohighlight', text: '关闭高亮' },
    { value: 'apache', text: 'Apache config' },
    { value: 'bash', text: 'Bash' },
    { value: 'c', text: 'C' },
    { value: 'cpp', text: 'C++' },
    { value: 'csharp', text: 'C#' },
    { value: 'css', text: 'CSS' },
    { value: 'diff', text: 'Diff' },
    { value: 'dockerfile', text: 'Dockerfile' },
    { value: 'go', text: 'Go' },
    { value: 'http', text: 'HTTP' },
    { value: 'ini', text: 'TOML, also INI' },
    { value: 'java', text: 'Java' },
    { value: 'javascript', text: 'JavaScript' },
    { value: 'json', text: 'JSON' },
    { value: 'kotlin', text: 'Kotlin' },
    { value: 'less', text: 'Less' },
    { value: 'lua', text: 'Lua' },
    { value: 'makefile', text: 'Makefile' },
    { value: 'markdown', text: 'Markdown' },
    { value: 'nginx', text: 'Nginx config' },
    { value: 'objectivec', text: 'Objective-C' },
    { value: 'perl', text: 'Perl' },
    { value: 'pgsql', text: 'PostgreSQL and PL/pgSQL' },
    { value: 'php', text: 'PHP' },
    { value: 'php-template', text: 'PHP Template' },
    { value: 'plaintext', text: 'Plain text' },
    { value: 'python', text: 'Python' },
    { value: 'python-repl', text: 'Python REPL' },
    { value: 'r', text: 'R' },
    { value: 'ruby', text: 'Ruby' },
    { value: 'rust', text: 'Rust' },
    { value: 'scss', text: 'SCSS' },
    { value: 'shell', text: 'Shell Session' },
    { value: 'sql', text: 'SQL' },
    { value: 'swift', text: 'Swift' },
    { value: 'typescript', text: 'TypeScript' },
    { value: 'vbnet', text: 'Visual Basic .NET' },
    { value: 'xml', text: 'HTML, XML' },
    { value: 'yaml', text: 'YAML' }
];

export default function codeLanguage(attrs = {}) {
    // 获取目标元素
    const $target = $(attrs.target);

    // 获取当前代码语言
    const className = $target.attr('class') || '';
    const match = className.match(/(?:^|\s)language-(\S+)/);

    const language = match
        ? match[1]
        : /\bnohighlight\b/.test(className)
            ? 'nohighlight'
            : '';

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
    $template.find('.label').text(attrs.label || '语言高亮');

    // 生成语言选项
    languages.forEach(function (item) {
        $select.append(
            $('<option>', {
                value: item.value,
                text: item.text
            })
        );
    });

    // 设置当前选中的语言
    $select.val(language);

    // 监听语言切换
    $select.on('change', function () {
        const language = this.value;

        // 清除原有的语言和关闭高亮标记
        $target
            .removeClass('nohighlight')
            .removeClass(function (index, className) {
                return (className.match(/(^|\s)language-\S+/g) || []).join(' ');
            });

        // 根据选择结果设置新的语言
        if (language === 'nohighlight') {
            $target.addClass('nohighlight');
        } else if (language) {
            $target.addClass(`language-${language}`);
        }
    });

    // 返回组件模板
    return $template;
}