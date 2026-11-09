RPanel.GroupI18nRemove = {
    view: function(vnode) {
        const get_i18n_key = function() {
            return $targetel.attr('data-i18n') || ''
        }

        let i18n_key = ''

        return m('.group', [
            m('.value',
                m('button[type="button"][disabled].btn.btn-remove', {
                    oncreate: function(vnode) {
                        vnode.attrs.onupdate(vnode)
                    },
                    onupdate: function(vnode) {
                        i18n_key = get_i18n_key()
                        $(vnode.dom).attr('disabled', i18n_key ? false : true)
                    },
                    onclick: function() {
                        let _this = this
                        i18n_key = get_i18n_key()

                        modal.confirm('确定要删除多语言键【' + i18n_key + '】!', '提示', {
                            buttons: {
                                ok: {
                                    action: function() {
                                        $.post('site/langs/remove-key', { 'i18n_key': i18n_key }, function(res) {
                                            if (res.code == 0) {
                                                $targetel.removeAttr('data-i18n').removeAttr('data-lang')
                                                $targetel.trigger('click')
                                                $.PubSub.publish('publish')
                                                notyf.success('删除多语言键【' + i18n_key + '】成功！')
                                            } else {
                                                notyf.error('删除多语言失败！')
                                            }
                                        })
                                    }
                                },
                                close: {}
                            }
                        })
                    }
                }, '移除多语言')
            )
        ])
    }
}