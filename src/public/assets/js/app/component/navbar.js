define([], function () {
    // 导航条组件通用代码
    const simple = function (component) {
        let $component = $.isPlainObject(component) ? component : $(component);
        if (!pagevar.isBuilder) {
            let $link = $component.find('a[href="' + pagevar.page_alias + '"]').addClass('active');
            if (pagevar.get_alias) {
                $link = $component.find('a[href*="' + pagevar.get_alias + '/category/"]').addClass('active');
                if (pagevar.get_cid) {
                    $link = $component.find('a[href*="' + pagevar.get_alias + '/category/' + pagevar.get_cid + '"]').addClass('active');
                }
            }

            if (!$link.is('.active')) {
                let alias = pagevar.join_alias ? pagevar.join_alias : pagevar.page_alias ? pagevar.page_alias : '';
                alias = alias.indexOf('/') > 0 ? alias.split('/')[0] : alias;
                $link = $component.find('a[href="' + alias + '"]').addClass('active');
            }

            if (!$link.is('.active')) {
                $link = $component.find('a[active~="' + pagevar.page_alias + '"],a[active~="' + pagevar.join_alias + '"]').addClass('active');
            }

            if (!$link.is('.active')) {
                $link = $component.find('a[href="#"],a[href="/"],a[href="./"]').addClass('active');
            }
        }

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

    const dropdown = function (component_selector, active = '') {
        let $component = $(component_selector);
        if (!pagevar.isBuilder) {
            let $link = $component.find('a[href="' + pagevar.page_alias + '"]').parent('li').addClass('active');
            if (pagevar.get_alias) {
                $link = $component.find('a[href*="' + pagevar.get_alias + '/category/"]').parent('li').addClass('active');
                if (pagevar.get_cid) {
                    $link = $component.find('a[href*="' + pagevar.get_alias + '/category/' + pagevar.get_cid + '"]').parent('li').addClass('active');
                }
            }

            if (!$link.is('.active')) {
                $link = $component.find('a[active="' + active + '"]').parent('li').addClass('active');
            }

            if (!$link.is('.active')) {
                let alias = pagevar.join_alias ? pagevar.join_alias : pagevar.page_alias ? pagevar.page_alias : '';
                alias = alias.indexOf('/') > 0 ? alias.split('/')[0] : alias;
                $link = $component.find('a[href="' + alias + '"]').parent('li').addClass('active');
            }

            if (!$link.is('.active')) {
                $link = $component.find('a[active~="' + pagevar.page_alias + '"],a[active~="' + pagevar.join_alias + '"],a[active="' + pagevar.get_cid + '"]').parent('li').addClass('active');
            }

            if (!$link.is('.active')) {
                $link = $component.find('a[href="#"],a[href="/"],a[href="./"]').parent('li').addClass('active');
            }
        }

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
    }

    // 自动高亮导航链接
    const linkActive = function (component) {
        let $component = $.isPlainObject(component) ? component : $(component);
        if (!pagevar.isBuilder) {
            let $link = $component.find('a[href="' + pagevar.page_alias + '"]').addClass('active');
            if (pagevar.get_alias) {
                $link = $component.find('a[href*="' + pagevar.get_alias + '/category/"]').addClass('active');
                if (pagevar.get_cid) {
                    $link = $component.find('a[href*="' + pagevar.get_alias + '/category/' + pagevar.get_cid + '"]').addClass('active');
                }
            }

            if (!$link.is('.active')) {
                let alias = pagevar.join_alias ? pagevar.join_alias : pagevar.page_alias ? pagevar.page_alias : '';
                alias = alias.indexOf('/') > 0 ? alias.split('/')[0] : alias;
                $link = $component.find('a[href="' + alias + '"]').addClass('active');
            }

            if (!$link.is('.active')) {
                $link = $component.find('a[active~="' + pagevar.page_alias + '"],a[active~="' + pagevar.join_alias + '"]').addClass('active');
            }

            if (!$link.is('.active')) {
                $link = $component.find('a[href="#"],a[href="/"],a[href="./"]').addClass('active');
            }
        }
    }

    // 下拉显示导航菜单
    const menuDownFade = function (component) {
        let $component = $.isPlainObject(component) ? component : $(component);
        let $menu = $component.find('.menu');
        if ($menu.length) {
            $menu.click(function () {
                $menu.toggleClass('active');
                let $collapse = $component.find('.collapse');
                $collapse.css('top', $component.outerHeight());
                if ($collapse.is(':empty')) {
                    let $collapse_content = $('<div class="content"></div>').appendTo($collapse);
                    $collapse_content.html($component.find('.collapse-nav').html());
                }
                if ($collapse.css('visibility') == 'hidden') {
                    $collapse.addClass('show');
                } else {
                    $collapse.removeClass('show');
                }
            });
        }
    }

    return {
        'simple': simple,
        'dropdown': dropdown,
        'menuDownFade': menuDownFade,
        'linkActive': linkActive
    }
});