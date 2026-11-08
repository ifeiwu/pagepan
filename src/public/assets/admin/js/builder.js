define(['jquery', 'js/builder/resize', 'js/builder/layer'], function () {

    $('#publish').on('click', function (e) {
        const $publish = $(this).attr('disabled', true);
        const publish_text = $publish.html();

        $publish.html('<svg class="icon-start animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>发布 ')

        $.post('/admin/builder/publish', {'page_id': appvar.page.id}, function (res) {
            if (res.code === 0) {
            } else {
                alert(res.message);
            }
            $publish.attr('disabled', false).html(publish_text);
        })
    })


    const $blocks = $('#iframe').contents()
        .find('body')
        .children(':not(script, style, link, [data-block-type!=""])');

    $blocks.each((i, block) => {
        // 为有文本内容的指定元素启用编辑
        $(block).find('h1,h2,h3,h4,h5,h6,p,a,span,kbd,em,small,big,button,td,th,li,time')
            /*.filter(function () {
                return $(this).text().trim().length > 0;
            })*/
            .each(function () {
                const $el = $(this);

                // 避免嵌套的可编辑区域
                $el.closest('[contenteditable="true"]').removeAttr('contenteditable');
                $el.attr('contenteditable', 'true');
            });
    });
})