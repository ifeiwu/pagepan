require.config({
    baseUrl: '/assets/admin/lib',
    paths: {
        js: '../js',
        app: '../app',
        hugerte: ['https://cdn.jsdmirror.com/npm/hugerte@1/hugerte.min', 'hugerte/hugerte'],
        vselect: 'vselect/vselect',
        showmore: 'show-more/show-more',
        swiper: 'swiper/swiper',
        popover: 'popover/popover',
        toast: ['toast/toast', 'https://cdn.jsdmirror.com/npm/not-a-toast@1.1.5/dist/not-a-toast.umd'],
        vs: './monaco/vs'
    },
    shim: {
        vselect: { exports: 'VirtualSelect', deps: ['css!vselect'] },
        showmore: { exports: 'ShowMore', deps: ['css!showmore'] },
        swiper: { exports: 'Swiper', deps: ['css!swiper'] },
        popover: ['css!popover'],
        toast: ['css!toast', 'css!https://cdn.jsdmirror.com/npm/not-a-toast@1.1.5/dist/style', ],
    },
    skipDataMain: true,
    waitSeconds: 0,
    urlArgs: appvar.ver
})

// 捕获局域未捕获的异常
require.onError = function(err) {
    console.log('requireType: ' + err.requireType)
    if (err.requireType === 'timeout') {
        console.log('requireModules: ' + err.requireModules)
    }
    throw err
}