RPanel.GroupSvgCode = {
    view: function (vnode) {
        return m('.group', [
            m('.value', [
                m('button[type="button"].btn.btn-primary', {
                    onclick: function () {
                        let $apply = $(this).attr('disabled', true)
                        let value = $targetel[0].outerHTML;
                        let url = 'builder/winpage/svg-edit'

                        WinboxEditor.open(url, '编辑SVG', value,
                            function(value, $save, $save_close) {
                                // 替换自己
                                let $targetel2 = $(value);
                                $targetel.replaceWith($targetel2);
                                $targetel = $targetel2;
                                let $form = $apply.parents('form');
                                $form.find('[name="svg_width"]').val($targetel.attr('width'));
                                $form.find('[name="svg_height"]').val($targetel.attr('height'));

                                $save.attr('disabled', false)
                                $save_close.attr('disabled', false)
                            },
                            function() {
                                $apply.attr('disabled', false)
                            }
                        )
                    }
                }, '编辑图标源码')
            ])
        ])
    }
}