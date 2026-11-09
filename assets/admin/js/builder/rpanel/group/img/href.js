RPanel.GroupImgHref = {
    view: function(vnode) {

        let $textarea, $remove

        let toggleRemoveButton = function() {

            let $a = $targetel.parents('a')

            if ($a.length) {
                $remove.attr('disabled', false)
            } else {
                $remove.attr('disabled', true)
            }
        }

        return m('.group.textarea-adv', [
            m('.label', '链接地址'),
            m('.value', m('[', [

                    m('textarea[rows="3"][placeholder="http://"]', {
                        oncreate: function(vnode) {

                            vnode.attrs.onupdate(vnode)
                        },
                        onupdate: function(vnode) {

                            $textarea = $(vnode.dom)

                            let $a = $targetel.parents('a')

                            if ($a.length) {
                                $textarea.val($a.attr('href'))
                            } else {
                                $textarea.val('')
                            }
                        },
                        oninput: function() {

                            let $a = $targetel.parents('a')

                            if ($a.length) {
                                $a.attr('href', this.value)
                            } else {
                                let $picture = $targetel.parents('picture')

                                if ($picture.length) {
                                    $picture.wrap('<a href="' + this.value + '"></a>')
                                } else {
                                    $targetel.wrap('<a href="' + this.value + '"></a>')
                                }
                            }

                            toggleRemoveButton()
                        }
                    }),

                    m('button[name="finder"][title="选择文件"]', {
                        onclick: function(e) {
                            e.preventDefault()
                            WinboxFinder.open('finder/modal?mode=choose&type=', '选择文件', function(file) {
                                $textarea.val(file)
                                $textarea[0].dispatchEvent(new Event('input')) // 触发输入 oninput
                            })
                        }
                    }, m.trust('<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V6H8.5C8.22386 6 8 5.77614 8 5.5V2H3.5ZM9 2.70711L11.2929 5H9V2.70711ZM2 2.5C2 1.67157 2.67157 1 3.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645L12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>')),

                    m('button[name="remove"][title="删除地址"]', {
                        oncreate: function(vnode) {
                            vnode.attrs.onupdate(vnode)
                        },
                        onupdate: function(vnode) {
                            $remove = $(vnode.dom)
                            toggleRemoveButton()
                        },
                        onclick: function(e) {
                            e.preventDefault()
                            $textarea.val('')

                            let $picture = $targetel.parents('picture')
                            if ($picture.length) {
                                $picture.unwrap()
                            } else {
                                $targetel.unwrap()
                            }

                            toggleRemoveButton()
                        }
                    }, m.trust('<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>'))

                ])
            )
        ])
    }
}