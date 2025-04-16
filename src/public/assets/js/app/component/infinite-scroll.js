define([], function () {
    return function ($component, options) {
        let $dataview = $component.find('.dataview');
        let $loading = $component.find('.loading');
        let $loadbtn = $component.find('.loadbtn');
        let $loaded = $component.find('.loaded');
        let template = $component.find('template').html();
        let pagenum = 1;
        let ob = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                $loading.show();
                pagenum += 1;
                // let params = {
                //     'orderby': '<?=$this->setting['dataview.orderby']?>',
                //     'perpage': '<?=$this->setting['dataset.perpage']?>',
                //     'pagenum': pagenum,
                // };
                $.post('m/shop/goods-list', options.params, function(res) {
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
                            $dataview.append(_template);
                        });
                        if (items.length < data.perpage) {
                            $loadbtn.hide();
                            $loaded.show();
                        } else {
                            $loadbtn.show();
                        }
                    } else {
                        $loadbtn.hide();
                    }
                    $loading.hide();
                });
            }
        }, { threshold: 1 });

        ob.observe($loadbtn[0]);
    };
});