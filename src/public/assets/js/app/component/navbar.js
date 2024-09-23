define([], function () {
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

        if (pagevar.join_alias) {
            $link = $component.find('a[href="' + pagevar.join_alias + '"]');
            if ($link.length > 0) {
                return $link;
            }
        }

        if (pagevar.page_alias) {
            let page_alias = pagevar.page_alias;
            page_alias = page_alias.indexOf('/') > 0 ? page_alias.split('/')[0] : page_alias;
            $link = $component.find('a[href="' + page_alias + '"]');
            if ($link.length > 0) {
                return $link;
            }
        }

        $link = $component.find('a[active~="' + pagevar.page_alias + '"],a[active~="' + pagevar.join_alias + '"],a[active="' + pagevar.get_cid + '"]');
        if ($link.length > 0) {
            return $link;
        }

        return $component.find('a[href="#"],a[href="/"],a[href="./"]');
    }

    return {
        'linkActive': linkActive,
        'linkLiActive': linkLiActive
    }
});