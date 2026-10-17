define(['interact'], function (interact) {

    const $ruler = $('.pb-ruler');
    const $resize = $('.pb-resize');

    let drwidth = 0

    interact($resize[0]).resizable({
        edges: {
            left: '.resize-left',
            right: '.resize-right'
        }
    }).on('resizemove', function (event) {
        let target = event.target
        drwidth += event.deltaRect.width
        target.style.width = (event.rect.width + drwidth) + 'px'

        $resize.removeClass('ease')
        $resize.find('>iframe').css('pointer-events', 'none')

        // $.PubSub.publish('ruler.update-size-text')
    }).on('resizeend', function (event) {
        let target = event.target
        drwidth = 0
        $resize.addClass('ease')
        $resize.find('>iframe').css('pointer-events', '')
        // 拖动放开回弹
        // target.style.width = window.breakpointWidth + 'px'
        // setTimeout(function() {
        //     $.PubSub.publish('ruler.update-size-text')
        // }, 400)
    })

    $ruler.on('click', '>.xl>.left,>.xl>.right', function () {
        resize(this, 'xl', '1280')
    })

    $ruler.on('click', '>.lg>.left,>.lg>.right', function () {
        resize(this, 'lg', '1024')
    })

    $ruler.on('click', '>.md>.left,>.md>.right', function () {
        resize(this, 'md', '768')
    })

    $ruler.on('click', '>.sm>.left,>.sm>.right', function () {
        resize(this, 'sm', '560')
    })

    $ruler.on('click', '>.xs>.left,>.xs>.right', function () {
        resize(this, '', '360')
    })

    // 设置标尺大小和iframe宽度
    const resize = function (el, size, width) {
        // 响应式断点后缀
        // window.breakpoint = size ? '-' + size : ''
        // window.breakpointSize = size || ''
        // window.breakpointWidth = width
        // window.breakpointText = $.pb.fn.getBreakpointText(size)
        // window.breakpointIcon = $.pb.fn.getBreakpointIcon(size)

        // store('ruler-size', size)
        // store('ruler-width', width)

        $resize.width(width)

        $(el).parent().siblings().removeClass('active')

        setTimeout(() => {
            $(el).parent().addClass('active')
            $ruler.addClass('active')
            // $.PFrame.triggerTargetel()
            updateRulerSizeText()
        }, 400)
    }

    // 更新当前尺寸文字
    const updateRulerSizeText = function () {
        let width = $resize.width()
        // store('ruler-width', width.toString())
        $ruler.find('>.xs>.size').text(width + ' x ' + $resize.height())
    }
});