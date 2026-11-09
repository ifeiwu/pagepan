RPanel.GroupCodeContent = {
    view: function(vnode) {
        return m('.group', [
            m('.value', [
                m('button[type="button"].btn.btn-primary', {
                    onclick: function() {
                        let $apply = $(this).attr('disabled', true)
                        let value = $targetel.text()
                        let url = 'builder/winpage/monaco?lang='

                        WinboxEditor.open(url, '编辑语言代码', value,
                            function(value, $save, $save_close) {
                                $targetel.text(value)

                                $save.attr('disabled', false)
                                $save_close.attr('disabled', false)
                            },
                            function() {
                                $apply.attr('disabled', false)
                            }
                        )
                    }
                }, '编辑语言代码')
            ])
        ])
    }
}