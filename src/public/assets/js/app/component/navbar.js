define([], function () {
    // 导航条组件通用代码
    const simple = function (component) {
        let $component = $.isPlainObject(component) ? component : $(component);
        linkActive($component);
        // 下拉菜单按钮
        let $menu = $component.find('.menu');
        if ($menu.length) {
            $menu.click(function () {
                $(this).toggleClass('active');
                let $nav = $component.find('.col-nav,.collapse');
                if ($nav.is('.hidden')) {
                    $nav.removeClass('hidden');
                } else {
                    $nav.addClass('hidden');
                }
            });
        }
    }

    /*const dropdown = function (component, active = '') {
        let $component = $(component);
        linkLiActive(component, active);
        // 下拉菜单按钮
        let $menu = $component.find('.menu');
        if ($menu.length) {
            let $colnav = $component.find('.col-nav,.collapse');
            // 打开下拉菜单
            $menu.click(function () {
                // 菜单没有禁用样式
                if (!$menu.is('.menu-disable')) {
                    $(this).toggleClass('active');
                    if ($colnav.is('.hidden')) {
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
    }*/

    // 自动高亮导航链接上级 li
    const linkLiActive = function (component, active = null) {
        getLinkElement(component, active).parent('li').addClass('active');
    }

    // 自动高亮导航链接
    const linkActive = function (component, active = null) {
        getLinkElement(component, active).addClass('active');
    }

    // 获取当前页面匹配的链接元素
    const getLinkElement = function (component, active = null) {
        let $component = $.isPlainObject(component) ? component : $(component);
        let $link = $component.find('a[href="' + pagevar.page_alias + '"]');
        if ($link.length > 0) {
            return $link;
        }

        if (pagevar.get_alias) {
            $link = $component.find('a[href*="' + pagevar.get_alias + '/category/"]');
            if (pagevar.get_cid) {
                $link = $component.find('a[href*="' + pagevar.get_alias + '/category/' + pagevar.get_cid + '"]');
            }
            if ($link.length > 0) {
                return $link;
            }
        }

        if (active != null) {
            $link = $component.find('a[active="' + active + '"]');
            if ($link.length > 0) {
                return $link;
            }
        }

        let alias = pagevar.join_alias ? pagevar.join_alias : pagevar.page_alias ? pagevar.page_alias : '';
        alias = alias.indexOf('/') > 0 ? alias.split('/')[0] : alias;
        $link = $component.find('a[href="' + alias + '"]');
        if ($link.length > 0) {
            return $link;
        }

        $link = $component.find('a[active~="' + pagevar.page_alias + '"],a[active~="' + pagevar.join_alias + '"],a[active="' + pagevar.get_cid + '"]');
        if ($link.length > 0) {
            return $link;
        }

        return $component.find('a[href="#"],a[href="/"],a[href="./"]');
    }

    return {
        'simple': simple,
        'linkActive': linkActive,
        'linkLiActive': linkLiActive
    }
});