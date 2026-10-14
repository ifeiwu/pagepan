<?php $this->layout('admin-iframe') ?>

<iframe id="PageInFrame" src="/admin/builder/page?id=<?= $this->id ?>" class="w:full h:full"></iframe>

<script src="/assets/admin/lib/jquery.js"></script>
<script>
    $(document).ready(function () {
        $('#PageInFrame').on('load', function () {
            const $body = $(this).contents().find('body');
            const $blocks = $body.children(':not(script, style, link)')
            const blocks = [];
            $.each($blocks, function () {
                const $block = $(this).clone(true)
                const config = $block.data()

                // 删除编辑时添加的属性
                $block.removeData();
                $block.find('[contenteditable]').removeAttr('contenteditable')
                $block.find('lottie-player').html('')

                const content = $block[0].outerHTML;

                blocks.push({
                    'id': config['id'],
                    'content': content,
                    'setting': ''
                });
            })

            console.log(blocks)
            // 保存页面
            $.post('/admin/builder/page-block/save-code', {'page_id':1, 'blocks':blocks}, function(res) {
                if (res.code != 0) {
                    console.log(res.message)
                } else {

                }
            })
        });
    })
</script>