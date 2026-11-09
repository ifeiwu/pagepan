RPanel.GroupI18nAdd = {
    view: function(vnode) {
        // 设置有值状态
        const isvalue = function(el, value) {
            if (value) {
                $(el).addClass('active')
            } else {
                $(el).removeClass('active')
            }
        }

        const get_i18n_key = function() {
            return $targetel.attr('data-i18n') || ''
        }

        let i18n_key = ''

        return m('.group', [
            m('.value',
                m('button[type="button"].btn', {
                    oncreate: function(vnode) {
                        vnode.attrs.onupdate(vnode)
                    },
                    onupdate: function(vnode) {
                        i18n_key = get_i18n_key()
                        isvalue(vnode.dom, i18n_key)
                    },
                    onclick: function() {
                        let _this = this
                        let $apply = $(this)
                        let content = $targetel.html()
                        let tagname = $targetel[0].tagName.toLowerCase()
                        let browser_language = navigator.language.toLowerCase()
                        let data_lang = $targetel.attr('data-lang') || ''

                        if ($targetel.is('img')) {
                            content = $targetel.attr('src')
                        }

                        i18n_key = get_i18n_key()
                        let url = 'builder/winpage/i18n?tagname=' + tagname + '&browser_language=' + browser_language + '&data_lang=' + data_lang + '&key=' + encodeURIComponent(i18n_key) + '&text=' + encodeURIComponent(content)

                        WinboxEditor.open(url, '多语言设置', '',
                            function(value, $save, $save_close) {
                                $targetel.attr('data-i18n', value['i18n_key'])
                                isvalue(_this, value['i18n_key'])
                                $targetel.trigger('click')

                                if (value['data_lang']) {
                                    $targetel.attr('data-lang', value['data_lang'])
                                } else {
                                    $targetel.removeAttr('data-lang')
                                }

                                $save.attr('disabled', false)
                                $save_close.attr('disabled', false)
                            },
                            function() {
                                $apply.attr('disabled', false)
                            }
                        )
                    }
                }, '多语言设置')
            )
        ])
    }
}