require.config({
    baseUrl: pagevar.domain3 +  'assets/js/lib',
    paths: {
        app: '../app',
        util: '../util',
        lib: '../lib',
        data: '../../../data',
        plyr: 'plyr/plyr',
        video: 'video/video',
        tippy: 'tippy/tippy',
        modal: 'modal/modal',
        alertify: 'alertify/alertify',
        scrollbar: 'scrollbar/overlayscrollbars',
        spotlight: 'spotlight/spotlight',
        // parsley: 'parsley/parsley',
		// parsley_zh_cn: 'parsley/i18n/zh_cn',
		'@popperjs/core': 'popper', // tippy.js
    },
    shim: {
        plyr: ['css!plyr.css'],
        video: ['css!video.css'],
        tippy: ['css!tippy.css'],
        modal: ['css!modal.css'],
        alertify: ['css!alertify.css', 'css!../lib/alertify/default.css'],
        spotlight: ['css!spotlight.css'],
        scrollbar: ['css!../lib/scrollbar/overlayscrollbars.css'],
        filterizr: ['jquery'],
		// parsley_zh_cn: ['parsley/parsley'],
        prefixfree: {
            exports: 'PrefixFree'
        }
    },
	skipDataMain: true,
    waitSeconds: 0,
    urlArgs: pagevar.timestamp
});


// 捕获局域未捕获的异常
require.onError = function (err) {

    console.log('requireType: ' + err.requireType);

    if (err.requireType === 'timeout')
    {
        console.log('requireModules: ' + err.requireModules);
    }

    throw err;
};


window.onerror = function (message, source, lineno, colno, error) {

    console.error( error.stack );

};