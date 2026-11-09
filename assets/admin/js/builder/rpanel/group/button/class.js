RPanel.GroupButtonClass = {
    view: function() {
        return m('.group', [
            m('.label', '按钮样式'),
            m('.value', [
                m('select[name="btncss"][id="btncss"]', {
                    oncreate: function(vnode) {
                        vnode.attrs.onupdate(vnode)
                    },
                    onupdate: function(vnode) {
                        if (!$targetel.is('.btn')) {
                            $(vnode.dom).parents('.group').hide()
                            return
                        } else {
                            $(vnode.dom).parents('.group').show()
                        }

                        vnode.children.forEach(o => {
                            let value = o.attrs.value
                            if (value && $targetel.is('.' + value)) {
                                $(vnode.dom).find('option[value="' + value + '"]').attr('selected', true)
                            }
                        })
                    },
                    onchange: function(e) {
                        $(e.target).find('option').each(function() {
                            $targetel.removeClass($(this).val())
                        })
                        $targetel.addClass(this.value)
                    }
                }, [
                    m('option[value=""]', '默认透明'),
                    m('option[value="btn-primary"]', '主色（背景）'),
                    m('option[value="btn-secondary"]', '副色（背景）'),
                    m('option[value="btn-mix"]', '混色（背景）'),
                    m('option[value="btn-outline-primary"]', '主色（线框）'),
                    m('option[value="btn-outline-secondary"]', '副色（线框）'),
                    m('option[value="btn-outline-mix"]', '混色（线框）')
                ])
            ])
        ])
    }
}