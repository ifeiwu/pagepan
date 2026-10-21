define(function () {
    return function (selector) {
        const $component = $(selector);
        if (!pagevar.isBuilder) {
            let $li = $component.find('a[href="' + pagevar.page_alias + '"]').parent('li').addClass('active');

            if (pagevar.get_cid) {
                $li = $component.find('a[href*="' + pagevar.page_alias + '/category/' + pagevar.get_cid + '"]').parent('li').addClass('active');
            }

            if (!$li.is('.active')) {
                let alias = pagevar.join_alias ? pagevar.join_alias : pagevar.page_alias ? pagevar.page_alias : '';
                alias = alias.indexOf('/') > 0 ? alias.split('/')[0] : alias;
                $li = $component.find('a[href="' + alias + '"]').parent('li').addClass('active');
            }

            if (!$li.is('.active')) {
                $component.find('a[active~="' + pagevar.page_alias + '"],a[active~="' + pagevar.join_alias + '"],a[active="' + pagevar.get_cid + '"]').parent('li').addClass('active');
            }

            if (!pagevar.page_alias) {
                $component.find('a[href="/"],a[href="./"]').parent('li').addClass('active');
            }
        }
    };
});