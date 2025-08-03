define(function() {
    return function(config = {}) {
        let $container = config.container
        let $pagination = config.pagination
        let $loadmore = $pagination.find('.loadmore')
        let $loading = $pagination.find('.loading')
        let $loaded = $pagination.find('.loaded')
        let template = config.template.html()
        let url = config.url
        let orderby = config.orderby
        let perpage = config.perpage
        let pagenum = config.pagenum

        let ob = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                $loadmore.hide()
                $loading.show()
                pagenum += 1
                let params = {
                    orderby: orderby,
                    perpage: perpage,
                    pagenum: pagenum
                }
                $.post(url, params, function(res) {
                    if (res.code == 0) {
                        let data = res.data
                        let items = data.items
                        let content = ''

                        $.each(items, function(i, item) {
                            let _template = template
                            // 实现条件显示元素，对应PHP的方法Template::render($template, $data, $ifs);
                            let $_template = $(_template)
                            $els = $_template.find('[php-if]')
                            if ($els.length) {
                                let ifs = item.ifs
                                $els.each(function() {
                                    let $el = $(this)
                                    let value = $el.attr('php-if')
                                    if (ifs.includes(value)) {
                                        $el.removeAttr('php-if')
                                    } else {
                                        $el.remove()
                                    }
                                })
                            }
                            _template = $_template.html()

                            for (const key in item) {
                                if (item.hasOwnProperty(key)) {
                                    _template = _template.replace(new RegExp('{{' + key + '}}', 'g'), item[key])
                                }
                            }

                            content += _template
                        })

                        $container.append(content)

                        if (items.length < data.perpage) {
                            $loadmore.hide()
                            $loaded.show()
                        } else {
                            $loadmore.show()
                        }
                    } else {
                        $loadmore.hide()
                    }
                    $loading.hide()
                })
            }
        }, { threshold: 1 })

        ob.observe($loadmore[0])
    }
})