export default function linkTarget(attrs = {}) {
    const $target = $(attrs.target);
    const $link = $target.closest('a');

    // 创建组件模板
    const $template = $(`
        <div class="field gap-1">
            <label class="label">打开方式</label>
            <div class="radio-segmented" role="radiogroup" aria-label="链接打开方式">
                <label class="radio-segment">
                    <input type="radio" name="link_target" value="">
                    本窗口
                </label>
                <label class="radio-segment">
                    <input type="radio" name="link_target" value="_blank">
                    新窗口
                </label>
                <label class="radio-segment">
                    <input type="radio" name="link_target" value="_modal">
                    弹窗口
                </label>
            </div>
        </div>
    `);

    // 获取单选按钮
    const $radios = $template.find('[name="link_target"]');

    // 初始化选中状态
    const target = $link.attr('target');

    $radios.filter('[value=""]').prop('checked', !target);
    $radios.filter('[value="_blank"]').prop('checked', target === '_blank');
    $radios.filter('[value="_modal"]').prop('checked', target === '_modal' || $link.is('[data-modal]'));

    // 监听打开方式切换
    $radios.on('change', function () {
        if (!this.checked) return;

        switch (this.value) {
            case '':
                $link.removeAttr('target data-modal');
                break;

            case '_blank':
                $link.attr('target', '_blank').removeAttr('data-modal');
                break;

            case '_modal':
                $link.attr('target', '_modal');
                break;
        }
    });

    return $template;
}