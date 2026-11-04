<div id="popover-customize-block" class="popover" data-sp-toggle="#popover-customize-block-trigger">
    <div class="popover-header">
        <h4 class="popover-title">创建为内容块</h4>
    </div>
    <form id="form_customize_block" class="grid gap-2">
        <div class="grid grid-cols-5 items-center gap-4">
            <label class="label">分类</label>
            <div class="col-span-4">
                <input name="category" class="input col-span-4 h-8" list="customize-block-category-list">
                <datalist id="customize-block-category-list">
                    <?php foreach ($this->categorys as $category): ?>
                    <option value="<?=$category?>">
                    <?php endforeach; ?>
                </datalist>
            </div>
        </div>
        <div class="grid grid-cols-5 items-center gap-4">
            <label class="label">名称</label>
            <input name="name" class="input col-span-4 h-8" value="001" />
        </div>
        <div class="flex justify-end gap-2 mt-3">
            <button type="submit" class="btn">保存</button>
        </div>
    </form>

    <script>
        require(['jquery'], function($) {
            const $form = $('#form_customize_block');
            const $name = $form.find('[name="name"]');
            const $category = $form.find('[name="category"]');
            const $submits = $form.find('[type="submit"]');

            $category.val(sessionStorage.getItem('form_customize_block_category'));
            $name.val(sessionStorage.getItem('form_customize_block_name'));

            $form.on('submit', function(e) {
                e.preventDefault();

//                $(this).find('[name="content"]').val($('#coder')[0].editor.getValue());

                const submitter = e.originalEvent.submitter;
                const data = $(this).serializeArray();
                data.push(
                    {name: submitter.name, value: submitter.value},
                    {name: 'page_id', value: appvar.page.id}
                );

                $submits.prop('disabled', true);

                $.post('/admin/repository/customize/save-block', data, function(res) {
                    if (res.code !== 0) alert(res.message);

                    sessionStorage.setItem('form_customize_block_category', $category.val());
                    sessionStorage.setItem('form_customize_block_name', $name.val());
                    $submits.prop('disabled', false);
                }).fail(function() {
                    alert('请求失败，请稍后重试');
                    $submits.prop('disabled', false);
                });
            });
        });
    </script>
</div>

