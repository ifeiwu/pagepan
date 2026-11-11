export default function ImgSize(attrs = {}) {
    // 获取目标图片元素
    const $target = $(attrs.target);
    const img = $target[0];

    // 创建组件模板
    const $template = $(`
        <div class="group">
            <div class="label">实际尺寸</div>
            <div class="value"></div>
        </div>
    `);

    // 显示图片实际尺寸
    $template.find('.value').text(
        `${img.naturalWidth} x ${img.naturalHeight} px`
    );

    // 返回组件模板
    return $template;
}