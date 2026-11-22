hugerte.PluginManager.add('axupimgs', function(editor, url) {
    var pluginName = '插入多张图片'
    window.axupimgs = {} // 扔外部公共变量，也可以扔一个自定义的位置

    const htmlUrl = 'assets/js/lib/hugerte/v5/plugins/axupimgs/upfiles.html'

    axupimgs.many_images_upload_handler = editor.getParam(
        'many_images_upload_handler',
        undefined,
        'function'
    )
    axupimgs.images_upload_base_path = editor.getParam(
        'images_upload_base_path',
        '',
        'string'
    )
    axupimgs.axupimgs_filetype = editor.getParam(
        'axupimgs_filetype',
        '.png,.gif,.jpg,.jpeg,.webp,.svg',
        'string'
    )
    axupimgs.res = []
    var openDialog = function() {
        return editor.windowManager.openUrl({
            title: '图片批量上传',
            size: 'large',
            url: htmlUrl,
            buttons: [
                {
                    type: 'cancel',
                    text: '取消'
                },
                {
                    type: 'custom',
                    text: '添加到编辑器',
                    name: 'save',
                    primary: true
                }
            ],
            onAction: function(api, details) {
                switch (details.name) {
                    case 'save':
                        var html = ''
                        var imgs = axupimgs.res
                        var len = imgs.length
                        for (let i = 0; i < len; i++) {
                            if (imgs[i].url) {
                                html += '<img src="' + imgs[i].url + '" />'
                            }
                        }
                        if (html == '') {
                            alert('请添加并上传图片');
                        } else {
                            editor.insertContent(html)
                            axupimgs.res = []
                            api.close()
                        }
                        break
                    default:
                        break
                }
            }
        })
    }

    editor.ui.registry.getAll().icons.axupimgs ||
    editor.ui.registry.addIcon(
        'axupimgs',
        '<svg viewBox="0 0 24 24" height="24" width="24" fill="currentColor"><path d="M7 3C6.44772 3 6 3.44772 6 4V7H3C2.44772 7 2 7.44772 2 8V20C2 20.5523 2.44772 21 3 21H17C17.5523 21 18 20.5523 18 20V17H21C21.5523 17 22 16.5523 22 16V4C22 3.44772 21.5523 3 21 3H7ZM17 7H8V5H20V15H18V8C18 7.44772 17.5523 7 17 7ZM16 9V15.7394L11.4911 11.6404L4 18.6321V9H16ZM11.5089 14.3596L16 18.4424V19H6.53702L11.5089 14.3596ZM7 13.5C7.82843 13.5 8.5 12.8284 8.5 12C8.5 11.1716 7.82843 10.5 7 10.5C6.17157 10.5 5.5 11.1716 5.5 12C5.5 12.8284 6.17157 13.5 7 13.5Z"></path></svg>'
    )

    editor.ui.registry.addButton('axupimgs', {
        icon: 'axupimgs',
        tooltip: pluginName,
        onAction: function() {
            openDialog()
        }
    })
    editor.ui.registry.addMenuItem('axupimgs', {
        icon: 'axupimgs',
        text: '图片批量上传',
        onAction: function() {
            openDialog()
        }
    })
    return {
        getMetadata: function() {
            return {
                name: pluginName,
                url: 'https://github.com/Kori000/axupimgs'
            }
        }
    }
})
