define(function (require) {
    // .h-grow 自动占满剩余高度
    $('[class*="h-grow"]').each(function (i, el) {
        let offset_top = el.offsetTop;
        offset_top = offset_top < document.body.offsetHeight ? offset_top : 0;
        el.style.setProperty('--offset-top', offset_top + 'px');
    });
});