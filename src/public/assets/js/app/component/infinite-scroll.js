define(function () {
    return function (config = {}) {
        let $container = config.container;
        let $pagination = config.pagination;
        let $loadmore = $pagination.find('.loadmore');
        let $loading = $pagination.find('.loading');
        let $loaded = $pagination.find('.loaded');
        let template = config.template;
        let url = config.url;
        let orderby = config.orderby;
        let perpage = config.perpage;
        let pagenum = config.pagenum;
        let ob = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                $loadmore.hide();
                $loading.show();
                pagenum += 1;
                let params = {
                    orderby: orderby,
                    perpage: perpage,
                    pagenum: pagenum,
                };
                $.post(url, params, function(res) {
                    if (res.code == 0) {
                        let data = res.data;
                        let items = data.items;
                        $.each(items, function(i, item) {
                            let _template = template;
                            for (const key in item) {
                                if (item.hasOwnProperty(key)) {
                                    _template = _template.replace(new RegExp('{{' + key + '}}', 'g'), item[key]);
                                }
                            }
                            $container.append(_template);
                        });
                        if (items.length < data.perpage) {
                            $loadmore.hide();
                            $loaded.show();
                        } else {
                            $loadmore.show();
                        }
                    } else {
                        $loadmore.hide();
                    }
                    $loading.hide();
                });
            }
        }, { threshold: 1 });

        ob.observe($loadmore[0]);
    };
});