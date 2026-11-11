export default function iframeId(attrs = {}) {
    // 获取目标元素
    const $target = $(attrs.target);

    // 创建组件模板
    const $template = $(`
        <div class="group">
            <div class="label">元素 ID</div>
            <div class="value">
                <input type="text" placeholder="">
            </div>
        </div>
    `);

    // 获取输入框
    const $input = $template.find('input');

    // 初始化输入框的 ID 值
    $input.val($target.find('iframe').attr('id') || '');

    // 监听输入，同步更新 iframe 的 ID
    $input.on('input', function () {
        const id = this.value.trim();

        if (id) {
            $target.find('iframe').attr('id', id);
        } else {
            $target.find('iframe').removeAttr('id');
        }

        // 如需同步更新标签，可在这里处理
        // $tagname.html(tagtext + (id ? '#' + id : ''));
    });

    // 返回组件模板
    return $template;
}