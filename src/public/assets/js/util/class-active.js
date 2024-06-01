define(function () {

    return function (selector) {
        
        const $component = $(selector);
        
        if ( ! pagepan.isBuilder )
        {
            let $li = $component.find('a[href="' + pagepan.page_alias + '"],a[href*="/category/' + pagepan.get_pid + '"]').parent('li').addClass('active');
            
            if ( ! $li.is('.active') )
            {
                let alias = pagepan.palias ? pagepan.palias : pagepan.page_alias ? pagepan.page_alias : '';
                
                alias = alias.indexOf('/') > 0 ? alias.split('/')[0] : alias;
                
                $li = $component.find('a[href="' + alias + '"]').parent('li').addClass('active');
            }
            
            if ( ! $li.is('.active') )
            {
                $component.find('a[active~="' + pagepan.page_alias + '"],a[active~="' + pagepan.palias + '"],a[active="' + pagepan.get_pid + '"]').parent('li').addClass('active');
            }
            
            $component.find('a[href="#"],a[href="/"],a[href="./"]').parent('li').addClass('active');
        }
    };
});