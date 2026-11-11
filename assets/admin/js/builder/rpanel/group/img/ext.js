export default function imgExt(attrs = {}) {
    // 获取目标图片元素
    const $target = $(attrs.target);

    // 获取图片地址
    const url = $target[0]?.currentSrc || '';

    // 提取图片扩展名
    const match = url.match(/\.(jpg|jpeg|png|gif|webp|svg|bmp)(?:[?#]|$)/i);
    const ext = match ? match[1].toUpperCase() : '其它';

    // 创建组件模板
    const $template = $(`
        <div class="group">
            <div class="label">图片格式</div>
            <div class="value"></div>
        </div>
    `);

    // 设置图片格式
    $template.find('.value').text(ext);

    // 返回组件模板
    return $template;
}