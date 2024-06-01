define([], function () {

	// 导航条组件通用代码
    const simple = function (component_selector) {
		
        let $component = $(component_selector);
        
        if ( ! pagepan.isBuilder )
        {
            let $link = $component.find('a[href="' + pagepan.page_alias + '"]').addClass('active');

            if ( pagepan.get_alias )
            {
                $link = $component.find('a[href*="' + pagepan.get_alias + '/category/"]').addClass('active');

                if ( pagepan.get_cid )
                {
                    $link = $component.find('a[href*="' + pagepan.get_alias + '/category/' + pagepan.get_cid + '"]').addClass('active');
                }
            }
            
            if ( ! $link.is('.active') )
            {
                let alias = pagepan.palias ? pagepan.palias : pagepan.page_alias ? pagepan.page_alias : '';
                
                alias = alias.indexOf('/') > 0 ? alias.split('/')[0] : alias;
                
                $link = $component.find('a[href="' + alias + '"]').addClass('active');
            }
            
            if ( ! $link.is('.active') )
            {
                $link = $component.find('a[active~="' + pagepan.page_alias + '"],a[active~="' + pagepan.palias + '"]').addClass('active');
            }
            
            if ( ! $link.is('.active') )
            {
                $link = $component.find('a[href="#"],a[href="/"],a[href="./"]').addClass('active');
            }
        }
        
        let $menu = $component.find('.menu');
        
        if ( $menu.length )
        {
            $menu.click(function() {
            
                $(this).toggleClass('active');
        
                let $nav = $component.find('.col-nav,.collapse');
        
                if ( $nav.is('.hidden') )
                {
                    $nav.css('display', 'none').removeClass('hidden');
                }
        
                $nav.slideToggle(250);
            });
        }
	}
	
    const dropdown = function (component_selector, active = '') {
    	
        let $component = $(component_selector);
        
        if ( ! pagepan.isBuilder )
        {
            let $link = $component.find('a[href="' + pagepan.page_alias + '"]').parent('li').addClass('active');

            if ( pagepan.get_alias )
            {
                $link = $component.find('a[href*="' + pagepan.get_alias + '/category/"]').parent('li').addClass('active');

                if ( pagepan.get_cid )
                {
                    $link = $component.find('a[href*="' + pagepan.get_alias + '/category/' + pagepan.get_cid + '"]').parent('li').addClass('active');
                }
            }

            if ( ! $link.is('.active') )
            {
                $link = $component.find('a[active="' + active + '"]').parent('li').addClass('active');
            }

            if ( ! $link.is('.active') )
            {
                let alias = pagepan.palias ? pagepan.palias : pagepan.page_alias ? pagepan.page_alias : '';
                
                alias = alias.indexOf('/') > 0 ? alias.split('/')[0] : alias;
                
                $link = $component.find('a[href="' + alias + '"]').parent('li').addClass('active');
            }
            
            if ( ! $link.is('.active') )
            {
                $link = $component.find('a[active~="' + pagepan.page_alias + '"],a[active~="' + pagepan.palias + '"],a[active="' + pagepan.get_cid + '"]').parent('li').addClass('active');
            }
            
            if ( ! $link.is('.active') )
            {
                $link = $component.find('a[href="#"],a[href="/"],a[href="./"]').parent('li').addClass('active');
            }
        }
        
        // 下拉菜单按钮
        let $menu = $component.find('.menu');
        
        if ( $menu.length )
        {
            let $colnav = $component.find('.col-nav,.collapse');
            
            // 打开下拉菜单
            $menu.click(function () {
                
                // 菜单没有禁用样式
                if ( ! $menu.is('.menu-disable') )
                {
                    $(this).toggleClass('active');
            
                    if ( $colnav.is('.hidden') )
                    {
                        $colnav.css('display', 'none').removeClass('hidden');
                    }
            
                    $colnav.slideToggle(250);
                }
            });
            
            // 点击链接关闭下拉菜单
            $component.find('.nav a').click(function () {
                
                $component.find('.col-nav,.collapse').hide();
            });
        }
    }
		
	return {
		'simple': simple,
        'dropdown': dropdown
	}
});