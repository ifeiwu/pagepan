export default function linkTarget(attrs) {
    const $target = $(attrs.target);

    const $template = $(`
        <div class="group">
            <div class="label">打开方式</div>
            <div class="value">
                <input name="link_target" id="target1" type="radio" value="">
                <label for="target1">本窗口</label>

                <input name="link_target" id="target2" type="radio" value="_blank">
                <label for="target2">新窗口</label>

                <input name="link_target" id="target3" type="radio" value="_modal">
                <label for="target3">弹窗口</label>
            </div>
        </div>
    `);

    const $link = $target.closest('a');

    // 初始化选中状态
    $template.find('#target1').prop('checked', !$link.attr('target'));

    $template.find('#target2').prop('checked', $link.attr('target') === '_blank');

    $template.find('#target3').prop('checked', $link.is('[data-modal],[target="_modal"]'));

    // 切换打开方式
    $template.find('[name="link_target"]').on('change', function () {
        if (this.value === '') {
            $link.removeAttr('target data-modal');
        } else if (this.value === '_blank') {
            $link.attr('target', '_blank').removeAttr('data-modal');
        } else if (this.value === '_modal') {
            $link.attr('target', '_modal');
        }
    });

    return $template;
}