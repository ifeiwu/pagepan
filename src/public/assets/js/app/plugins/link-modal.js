define(function (require) {
    // 链接模态窗口
    const $modaljs = $('[data-modal],a[target="_modal"]');
    $modaljs.attr('data-modal', '');

    require(['modal'], function () {
        let defaults = {
            fadeDuration: 200,
            closeExisting: false,
            // spinnerHtml: '<svg xmlns="http://www.w3.org/2000/svg" style="margin:auto;background:0 0" width="98" height="98" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" display="block"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6" transform="rotate(30 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6" transform="rotate(60 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6" transform="rotate(90 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6" transform="rotate(120 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6" transform="rotate(150 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6" transform="rotate(180 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6" transform="rotate(210 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6" transform="rotate(240 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6" transform="rotate(270 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6" transform="rotate(300 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6" transform="rotate(330 50 50)"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"/></rect></svg>'
        };
        $modaljs.on('click', function (e) {
            e.preventDefault();
            this.blur();
            let href = $(this).attr('href');
            // 打开图片
            if (/\.(png|apng|jpe?g|gif|svg|webp|bmp|ico)(\?.*)?$/.test(href)) {
                $('<div style="display:none"><img src="' + this.href + '" /></div>').appendTo('body').modal(defaults);
            }
            // 打开组件
            else if (/^#/.test(href)) {
                $(this).modal(defaults);
            }
            // 打开iframe
            else {
                let $iframeModal = $('<div style="display:none"><iframe src="' + href + '"></iframe></div>').appendTo('body').modal(defaults);
                $iframeModal.on($.modal.BEFORE_OPEN, function (event, modal) {
                    modal.$elm.addClass('modal-iframe');
                });
            }
        });
    });
});