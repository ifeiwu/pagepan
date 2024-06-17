define(function () {

    return function (selector) {
        
        const $component = $(selector);
        
        if ( ! pagevar.isBuilder )
        {
            let $li = $component.find('a[href="' + pagevar.page_alias + '"],a[href*="/category/' + pagevar.get_pid + '"]').parent('li').addClass('active');
            
            if ( ! $li.is('.active') )
            {
                let alias = pagevar.palias ? pagevar.palias : pagevar.page_alias ? pagevar.page_alias : '';
                
                alias = alias.indexOf('/') > 0 ? alias.split('/')[0] : alias;
                
                $li = $component.find('a[href="' + alias + '"]').parent('li').addClass('active');
            }
            
            if ( ! $li.is('.active') )
            {
                $component.find('a[active~="' + pagevar.page_alias + '"],a[active~="' + pagevar.palias + '"],a[active="' + pagevar.get_pid + '"]').parent('li').addClass('active');
            }
            
            $component.find('a[href="#"],a[href="/"],a[href="./"]').parent('li').addClass('active');
        }
    };
});