export default function iframeWidth(attrs = {}) {
    // 获取目标元素
    const $target = $(attrs.target);

    // 创建组件模板
    const $template = $(`
        <div class="group">
            <div class="label">宽度</div>
            <div class="value">
                <input type="text">
            </div>
        </div>
    `);

    // 获取输入框
    const $input = $template.find('input');

    // 设置初始宽度
    $input.val($target.find('iframe').attr('width') || '');

    // 监听输入，同步更新 iframe 宽度
    $input.on('input', function () {
        $target.find('iframe').attr('width', this.value);
    });

    // 返回组件模板
    return $template;
}