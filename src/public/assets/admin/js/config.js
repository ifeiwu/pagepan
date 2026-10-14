require.config({
    baseUrl: '/assets/admin/lib',
    paths: {
        js: '../js',
        'lightbox-umd': ['https://cdn.jsdmirror.com/npm/lightbox3@1/dist/lightbox3.min', 'lightbox/lightbox'],
        'scroll-snap-slider': 'scroll-snap-slider/scroll-snap-slider',
        'neiki-editor': ['https://cdn.jsdmirror.com/gh/neikiri/neiki-editor@latest/dist/neiki-editor.min', 'neiki-editor/neiki-editor'],
        hugerte: ['https://cdn.jsdmirror.com/npm/hugerte@1/hugerte.min', 'hugerte/hugerte'],
        tus: ['https://cdn.jsdmirror.com/npm/tus-js-client@latest/dist/tus.min'],
        vselect: 'vselect/vselect',
        mention: 'mention/mention',
        showmore: 'show-more/show-more',
        swiper: 'swiper/swiper',
        popover: 'popover/popover',
        toast: ['toast/toast', 'https://cdn.jsdmirror.com/npm/not-a-toast@1.1.5/dist/not-a-toast.umd']
    },
    shim: {
        vselect: { exports: 'VirtualSelect', deps: ['css!vselect'] },
        showmore: { exports: 'ShowMore', deps: ['css!showmore'] },
        swiper: { exports: 'Swiper', deps: ['css!swiper'] },
        popover: ['css!popover'],
        mention: ['css!mention'],
        toast: ['css!toast', 'css!https://cdn.jsdmirror.com/npm/not-a-toast@1.1.5/dist/style', ],
        'lightbox-umd': ['css!https://cdn.jsdmirror.com/npm/lightbox3@1/dist/lightbox3', 'css!lightbox-umd'],
        'scroll-snap-slider': { exports: 'ScrollSnapSlider' }
    },
    skipDataMain: true,
    waitSeconds: 0,
    urlArgs: appvar.ver
})

// UMD模块加载方式
define('lightbox', ['lightbox-umd'], function(Lightbox) {
    return Lightbox.Lightbox
})

// 捕获局域未捕获的异常
require.onError = function(err) {
    console.log('requireType: ' + err.requireType)
    if (err.requireType === 'timeout') {
        console.log('requireModules: ' + err.requireModules)
    }
    throw err
}