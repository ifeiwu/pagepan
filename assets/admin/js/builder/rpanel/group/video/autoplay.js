export default function videoAutoplay(attrs = {}) {
    // 获取目标视频元素
    const $target = $(attrs.target).find('video');

    // 创建组件模板
    const $template = $(`
        <div class="group">
            <div class="label">自动播放</div>

            <div class="value">
                <input name="target" id="target1" type="radio" value="">
                <label for="target1">否</label>

                <input name="target" id="target2" type="radio" value="autoplay">
                <label for="target2">是</label>
            </div>
        </div>
    `);

    // 获取单选按钮
    const $radio = $template.find('input[name="target"]');

    // 根据视频当前的 autoplay 属性初始化选中状态
    $radio.filter('[value=""]').prop('checked', !$target.is('[autoplay]'));
    $radio.filter('[value="autoplay"]').prop('checked', $target.is('[autoplay]'));

    // 监听选项变化
    $radio.on('change', function () {
        if (this.value === 'autoplay') {
            // 开启自动播放，同时设置静音以满足浏览器自动播放策略
            $target.attr({
                autoplay: true,
                muted: true
            });
        } else {
            // 关闭自动播放和静音
            $target.removeAttr('autoplay muted');
        }
    });

    // 返回组件模板
    return $template;
}