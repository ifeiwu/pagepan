define([], function () {

})
/*
;(function($) {
    // 设置标尺大小和iframe宽度
    const resize = function(el, size, width) {
        // 响应式断点后缀
        window.breakpoint = size ? '-' + size : ''
        window.breakpointSize = size || ''
        window.breakpointWidth = width
        window.breakpointText = $.pb.fn.getBreakpointText(size)
        window.breakpointIcon = $.pb.fn.getBreakpointIcon(size)

        store('ruler-size', size)
        store('ruler-width', width)

        $resize.width(width)

        $(el).parent().siblings().removeClass('active')

        setTimeout(() => {
            $(el).parent().addClass('active')
            $ruler.addClass('active')
            $.PFrame.triggerTargetel()
            updateSizeText()
        }, 400)
    }

    // 更新当前尺寸文字
    const updateSizeText = function() {
        let width = $resize.width()
        store('ruler-width', width.toString())
        $ruler.find('>.xs>.size').text(width + ' x ' + $resize.height())
    }

    // 标记当前元素在断点有样式可修改
    const markBreakpoints = function() {
        function ruler_active2(value) {
            if (value.indexOf('-sm') > 0) {
                $ruler.find('>.sm').addClass('active2')
            } else if (value.indexOf('-md') > 0) {
                $ruler.find('>.md').addClass('active2')
            } else if (value.indexOf('-lg') > 0) {
                $ruler.find('>.lg').addClass('active2')
            } else if (value.indexOf('-xl') > 0) {
                $ruler.find('>.xl').addClass('active2')
            } else {
                $ruler.find('>.xs').addClass('active2')
            }
        }

        let class_list = $targetel.attr('class')
        if ($targetel.is('img')) {
            let $picture = $targetel.parent('picture')
            if ($picture.length) {
                let $sources = $picture.find('source')
                if ($sources.length > 0) {
                    $sources.each(function() {
                        class_list += ' ' + $(this).attr('class')
                    })
                    class_list += ' source'
                }
            }
        }

        $ruler.find('>.active2').removeClass('active2')

        if (class_list) {
            class_list = class_list.split(' ')
            const allows_prefix = ['p-', 'pt-', 'pb-', 'pl-', 'pr-', 'px-', 'py-', 'm-', 'mt-', 'mb-', 'ml-', 'mr-', 'mx-', 'my-', 'w-', 'max-w-', 'h-', 'max-h-', 'r-', 'ti-', 'ls-', 'lh-', 'f-', 'bg-', 'obj-', 'secondary-', 'primary-', 'mix-', 'container-', 'z-', 'grid-cols-', 'col-span-', 'gap-', 'gap-x-', 'gap-y-']
            const allows_class = ['inline', 'block', 'inline-block', 'hidden', 'relative', 'absolute', 'static', 'fixed-top', 'fixed-bottom', 'absolute-auto', 'absolute-center', 'sticky-top', 'hairline', 'thin', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'underline', 'italic', 'linethrough', 'small', 'big', 'left', 'center', 'right', 'justify']
            $.each(class_list, function(key, value) {
                value = $.trim(value)
                $.each(allows_prefix, function(key, prefix) {
                    if (value.indexOf(prefix) === 0) {
                        ruler_active2(value)
                        return false
                    }
                })
                $.each(allows_class, function(key, prefix) {
                    if (value.indexOf(prefix) === 0) {
                        ruler_active2(value)
                        return false
                    }
                })
            })
        }

        let style_list = $targetel.attr('style')
        if (style_list) {
            style_list = style_list.split(';')
            const allows_style = ['--oy', '--sw', '--ff', '--fr', '--bg', '--bg-hvr', '--bgi', '--bgi-hvr', '--bgc', '--bgc-hvr', '--c', '--c-hvr', '--b', '--b-hvr', '--bc', '--bc-hvr']
            $.each(style_list, function(key, value) {
                value = $.trim(value)
                $.each(allows_style, function(key, prefix) {
                    const regex = new RegExp(prefix + '[-a-z]{0,3}:[\w]*')
                    if (regex.test(value)) {
                        ruler_active2(value)
                        return false
                    }
                })
            })
        }
    }

    /!* $ruler.on('click', '>.fluid>.left,>.fluid>.right', function() {
        resize(this, '', '100%');
    }); *!/

    /!* $ruler.on('click', '>.xxl>.left,>.xxl>.right', function() {
        resize(this, '', '1680');
    }); *!/

    $ruler.on('click', '>.xl>.left,>.xl>.right', function() {
        resize(this, 'xl', '1280')
    })

    $ruler.on('click', '>.lg>.left,>.lg>.right', function() {
        resize(this, 'lg', '1024')
    })

    $ruler.on('click', '>.md>.left,>.md>.right', function() {
        resize(this, 'md', '768')
    })

    $ruler.on('click', '>.sm>.left,>.sm>.right', function() {
        resize(this, 'sm', '560')
    })

    $ruler.on('click', '>.xs>.left,>.xs>.right', function() {
        resize(this, '', '360')
    })

    // store.clear();
    // 初始化屏幕尺的大小
    if (store('?ruler-width')) {
        let $ruler_size = $ruler.find('>.' + (store('ruler-size') || 'xs'))
        resize($ruler_size.find('>.left')[0], store('ruler-size'), $ruler_size.width())
    } else {
        resize($ruler.find('>.xs>.left')[0], '', '360')
    }

    $.PubSub.subscribe('ruler.syncs', function(msg, data) {
        markBreakpoints()
    })

    $.PubSub.subscribe('ruler.update-size-text', function(msg, data) {
        updateSizeText()
    })

})(jQuery)*/
