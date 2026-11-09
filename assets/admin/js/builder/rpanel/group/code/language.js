RPanel.GroupCodeLanguage = {
    view: function(vnode) {
        let language = ''
        let _class = $targetel.attr('class') || ''

        if (_class.indexOf('language-') != -1) {
            language = _class.replace(/([\s\S]*)language-(\S+)([\s\S]*)/g, '$2')
        } else if (_class.indexOf('nohighlight') != -1) {
            language = 'nohighlight'
        }

        let data = [{ value: '', text: '自动识别' }, { value: 'nohighlight', text: '关闭高亮' }, {
            value: 'apache',
            text: 'Apache config'
        }, { value: 'bash', text: 'Bash' }, { value: 'c', text: 'C' }, { value: 'cpp', text: 'C++' }, {
            value: 'csharp',
            text: 'C#'
        }, { value: 'css', text: 'CSS' }, { value: 'diff', text: 'Diff' }, {
            value: 'dockerfile',
            text: 'Dockerfile'
        }, { value: 'go', text: 'Go' }, { value: 'http', text: 'HTTP' }, {
            value: 'ini',
            text: 'TOML, also INI'
        }, { value: 'java', text: 'Java' }, { value: 'javascript', text: 'JavaScript' }, {
            value: 'json',
            text: 'JSON'
        }, { value: 'kotlin', text: 'Kotlin' }, { value: 'less', text: 'Less' }, {
            value: 'lua',
            text: 'Lua'
        }, { value: 'makefile', text: 'Makefile' }, { value: 'markdown', text: 'Markdown' }, {
            value: 'nginx',
            text: 'Nginx config'
        }, { value: 'objectivec', text: 'Objective-C' }, { value: 'perl', text: 'Perl' }, {
            value: 'pgsql',
            text: 'PostgreSQL and PL/pgSQL'
        }, { value: 'php', text: 'PHP' }, { value: 'php-template', text: 'PHP Template' }, {
            value: 'plaintext',
            text: 'Plain text'
        }, { value: 'python', text: 'Python' }, { value: 'python-repl', text: 'Python REPL' }, {
            value: 'r',
            text: 'R'
        }, { value: 'ruby', text: 'Ruby' }, { value: 'rust', text: 'Rust' }, {
            value: 'scss',
            text: 'SCSS'
        }, { value: 'shell', text: 'Shell Session' }, { value: 'sql', text: 'SQL' }, {
            value: 'swift',
            text: 'Swift'
        }, { value: 'typescript', text: 'TypeScript' }, { value: 'vbnet', text: 'Visual Basic .NET' }, {
            value: 'xml',
            text: 'HTML, XML'
        }, { value: 'yaml', text: 'YAML' }]

        let callbacks = {
            onchange: function(language) {
                $targetel.removeClass('nohighlight')
                $targetel.removeClass(function(index, className) {
                    return (className.match(/(^|\s)language-\S+/g) || []).join(' ')
                })

                if (language == 'nohighlight') {
                    $targetel.addClass('nohighlight')
                } else if (language) {
                    $targetel.addClass('language-' + language)
                }
            }
        }

        return m(RPanel.GroupSelectDefault, { 'label': '语言高亮', 'value': language, 'data': data, 'callbacks': callbacks })
    }
}