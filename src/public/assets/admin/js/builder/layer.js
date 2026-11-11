import { snapdom } from '@zumer/snapdom';

// 抽屉元素
const $drawerLayer = $('#drawer_layer');
const $drawerLayerList = $('#drawer_layer_list');

// 监听抽屉关闭，清空预览列表
$drawerLayer[0].addEventListener('sp-hidden', function () {
    // 释放图片 Object URL
    $drawerLayerList.find('img').each(function () {
        URL.revokeObjectURL(this.src);
    });

    $drawerLayerList.empty();
});

// 监听抽屉打开，捕获页面区块并生成预览
$drawerLayer[0].addEventListener('sp-beforeshow', async function () {
    $drawerLayerList.empty();

    const results = await capturePageBlocks();

    // 将截图 Blob 转换为 Object URL
    const images = results.map(({ blob, index }) => ({
        index,
        url: URL.createObjectURL(blob)
    }));

    // 渲染预览列表
    $drawerLayerList.append(renderList(images));
});

/**
 * 生成区块预览列表
 * @param {Array} items 区块截图数据
 * @returns {jQuery} 预览列表元素
 */
function renderList(items) {
    const $template = $(`
        <ul class="flex flex-col gap-4"></ul>
    `);

    items.forEach(({ index, url }) => {
        // 创建列表项
        const $item = $(`
            <li class="flex items-center gap-4 border rounded-md p-2">
                <div class="preview-image">
                    <img src="" alt="">
                </div>

                <div class="flex ml-auto">
                    <button type="button" name="up" class="btn btn-sm btn-icon btn-ghost" title="上移">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up preview-icon">
                            <path d="m18 15-6-6-6 6"></path>
                        </svg>
                    </button>

                    <button type="button" name="down" class="btn btn-sm btn-icon btn-ghost" title="下移">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down preview-icon">
                            <path d="m6 9 6 6 6-6"></path>
                        </svg>
                    </button>

                    <button type="button" name="copy" class="btn btn-sm btn-icon btn-ghost" title="复制">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy preview-icon">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                        </svg>
                    </button>

                    <button type="button" name="remove" class="btn btn-sm btn-icon btn-ghost" title="删除">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash preview-icon">
                            <path d="M10 11v6"></path>
                            <path d="M14 11v6"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                            <path d="M3 6h18"></path>
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </li>
        `);

        // 设置截图地址和区块索引
        $item.find('img').attr('src', url);
        $item.attr('data-index', index);

        $template.append($item);
    });

    return $template;
}

/**
 * 捕获页面中的顶层区块
 * @returns {Promise<Array>} 区块截图数据
 */
async function capturePageBlocks() {
    const elements = $('#iframe').contents()
        .find('body')
        .children(':not(script, style, link)')
        .get();

    const results = [];

    // 依次截图，保持区块原有顺序
    for (const [index, element] of elements.entries()) {
        const blob = await captureTrim(element);

        if (blob) {
            results.push({ index, blob });
        }
    }

    return results;
}

/**
 * 截取元素并裁剪透明区域
 * @param {HTMLElement} element 需要截图的元素
 * @returns {Promise<Blob|null>} 裁剪后的 PNG 图片
 */
async function captureTrim(element) {
    // 将元素转换为 PNG 图片
    const img = await snapdom.toPng(element);

    // 将图片绘制到 Canvas
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const ctx = canvas.getContext('2d', {
        willReadFrequently: true
    });

    ctx.drawImage(img, 0, 0);

    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;

    // 查找非透明像素的边界
    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;

    for (let i = 3; i < data.length; i += 4) {
        // 跳过完全透明的像素
        if (data[i] === 0) continue;

        const pixel = i >> 2;
        const x = pixel % width;
        const y = (pixel / width) | 0;

        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
    }

    // 图片完全透明时不生成结果
    if (maxX < 0) return null;

    // 创建裁剪后的 Canvas
    const result = document.createElement('canvas');
    result.width = maxX - minX + 1;
    result.height = maxY - minY + 1;

    result.getContext('2d').drawImage(
        canvas,
        minX, minY, result.width, result.height,
        0, 0, result.width, result.height
    );

    // 转换为 PNG Blob
    return new Promise(resolve => {
        result.toBlob(resolve, 'image/png');
    });
}