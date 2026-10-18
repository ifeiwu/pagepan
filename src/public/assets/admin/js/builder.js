define(['jquery', 'js/builder/resize', 'js/builder/coder'], function() {

    $('#publish').on('click', function(e) {
        $publish = $(this).attr('disabled', true).text('发布中');

        $.post('/admin/builder/page/publish', {'page_id': appVar.page.id}, function (res) {
            if (res.code === 0) {
                $publish.attr('disabled', false).text('发布');
            } else {
                alert(res.message);
            }
        })
    })
})