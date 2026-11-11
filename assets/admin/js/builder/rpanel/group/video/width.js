export default function videoWidth(attrs = {}) {
    // 获取目标视频元素
    const $target = $(attrs.target);
    const $video = $target.find('video');

    // 创建组件模板
    const $template = $(`
        <div class="group">
            <div class="label">视频宽度</div>
            <div class="value">
                <input type="text">
            </div>
        </div>
    `);

    // 获取输入框
    const $input = $template.find('input');

    // 初始化视频宽度
    $input.val($video.attr('width') || '');

    // 监听输入，同步更新视频宽度
    $input.on('input', function () {
        $video.attr('width', this.value);
    });

    // 返回组件模板
    return $template;
}