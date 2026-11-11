import interact from 'interactjs';

const $ruler = $('.pb-ruler');
const $resize = $('.pb-resize');

let drwidth = 0;

// 初始化可调整大小的 iframe 容器
interact($resize[0])
    .resizable({
        edges: {
            left: '.resize-left',
            right: '.resize-right'
        }
    })
    .on('resizemove', function (event) {
        const target = event.target;

        // 累计拖动宽度，更新容器尺寸
        drwidth += event.deltaRect.width;
        target.style.width = (event.rect.width + drwidth) + 'px';

        // 拖动过程中禁用过渡效果和 iframe 交互
        $resize.removeClass('ease');
        $resize.find('> iframe').css('pointer-events', 'none');

        // $.PubSub.publish('ruler.update-size-text');
    })
    .on('resizeend', function () {
        drwidth = 0;

        // 恢复过渡效果和 iframe 交互
        $resize.addClass('ease');
        $resize.find('> iframe').css('pointer-events', '');

        // 拖动放开回弹
        // target.style.width = window.breakpointWidth + 'px';
        // setTimeout(function () {
        //     $.PubSub.publish('ruler.update-size-text');
        // }, 400);
    });

// 标尺尺寸配置
const sizes = [
    { selector: 'fluid', size: 'fluid', width: '100%' },
    { selector: 'xxl', size: 'xxl', width: '1536' },
    { selector: 'xl', size: 'xl', width: '1280' },
    { selector: 'lg', size: 'lg', width: '1024' },
    { selector: 'md', size: 'md', width: '768' },
    { selector: 'sm', size: 'sm', width: '640' },
    { selector: 'xs', size: '', width: '360' }
];

// 绑定标尺尺寸切换事件
sizes.forEach(({ selector, size, width }) => {
    $ruler.on(
        'click',
        `>.${selector}>.left,>.${selector}>.right`,
        function () {
            resize(this, size, width);
        }
    );
});

// 初始化标尺尺寸
const savedWidth = sessionStorage.getItem('ruler-width');

if (savedWidth) {
    const rulerSize = sessionStorage.getItem('ruler-size');
    const $rulerSize = $ruler.find('>.' + (rulerSize || 'xs'));
    const $rulerLeft = $rulerSize.find('>.left');
    const rulerWidth = $rulerSize.width();

    resize($rulerLeft[0], rulerSize, rulerWidth, 300);
} else {
    resize($ruler.find('>.xs>.left')[0], '', '360');
}

// 设置标尺大小和 iframe 宽度
function resize(el, size, width, delay = 400) {
    // 响应式断点后缀
    // window.breakpoint = size ? '-' + size : '';
    // window.breakpointSize = size || '';
    // window.breakpointWidth = width;
    // window.breakpointText = $.pb.fn.getBreakpointText(size);
    // window.breakpointIcon = $.pb.fn.getBreakpointIcon(size);

    // store('ruler-size', size);
    // store('ruler-width', width);
    sessionStorage.setItem('ruler-size', size);
    sessionStorage.setItem('ruler-width', width);

    // 更新 iframe 宽度
    $resize.width(width);

    // 清除其他尺寸的激活状态
    $(el).parent().siblings().removeClass('active');

    // 延迟激活当前尺寸并更新标尺信息
    setTimeout(() => {
        $(el).parent().addClass('active');
        $ruler.addClass('active');

        // $.PFrame.triggerTargetel();
        updateRulerSizeText();
    }, delay);
}

// 更新当前标尺尺寸文字
function updateRulerSizeText() {
    const width = $resize.width().toString();

    // store('ruler-width', width);
    sessionStorage.setItem('ruler-width', width);

    // 更新 XS 标尺的尺寸显示
    $ruler.find('>.xs>.size').text(
        width + ' x ' + $resize.height()
    );
}