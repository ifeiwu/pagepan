define(['jquery', 'js/builder/resize', 'js/builder/coder'], function() {

    $('#publish').on('click', function(e) {
        $publish = $(this).attr('disabled', true).text('发布中');

        $.post('/admin/builder/publish', {'page_id': appvar.page.id}, function (res) {
            if (res.code === 0) {
            } else {
                alert(res.message);
            }
            $publish.attr('disabled', false).text('发布');
        })
    })
})