export default function svgWidth(attrs = {}) {
    // 获取目标 SVG 元素
    const $target = $(attrs.target);

    // 创建组件模板
    const $template = $(`
        <div class="field">
            <div class="input-group">
                <span class="input-group-addon"><span class="input-group-text">图标宽度</span></span>
                <input type="text" class="input text-right" name="svg_width" placeholder="" value="">
                <span class="input-group-addon input-group-addon-end"><span class="input-group-text">px</span></span>
            </div>
        </div>
    `);

    // 获取输入框
    const $input = $template.find('[name="svg_width"]');

    // 初始化宽度
    $input.val($target.attr('width') || '24');

    // 监听输入，同步更新 SVG 宽度
    $input.on('input', function () {
        $target.attr('width', this.value || 24);
    });

    // 返回组件模板
    return $template;
}