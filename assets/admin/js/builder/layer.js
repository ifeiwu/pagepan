import {snapdom} from '@zumer/snapdom';

import {DragDropManager} from '@dnd-kit/dom';
import {Sortable} from '@dnd-kit/dom/sortable';

// 抽屉元素
const $drawerLayer = $('#drawer_layer');
const $drawerLayerList = $('#drawer_layer_list');

$('#drawer_layer_save').on('click', function (e) {
    const sort_ids = []
    $drawerLayerList.find('li').each(function () {
        sort_ids.push($(this).data('blockId'));
    });

    $.post('/admin/builder/page/save-blocks-sorted', {'page_id': appvar.page.id, 'sort_ids': sort_ids}, function (res) {
        if (res.code === 0) {
            iframe.contentWindow.location.reload();
            sp.drawer($('#drawer_layer')[0]).hide();
        } else {
            alert(res.message);
        }
    });
})

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
    $drawerLayerList.html('<div class="text-center mt-10"><span class="shimmer text-sm text-muted-foreground">加载中...</span></div>');

    const results = await capturePageBlocks();

    // 将截图 Blob 转换为 Object URL
    const items = results.map(({block_id, blob}) => ({
        block_id,
        url: URL.createObjectURL(blob),
    }));

    // 渲染预览列表
    $drawerLayerList.html(renderList(items));
});

/**
 * 生成区块预览列表
 * @param {Array} items 区块截图数据
 * @returns {jQuery} 预览列表元素
 */
function renderList(items) {
    const $template = $('<ul class="flex flex-col gap-4"></ul>');

    const ddManager = new DragDropManager();

    function updateButtons() {
        const $list = $template.children('li');
        const lastIndex = $list.length - 1;

        $list.each(function (index) {
            $(this).find('[name="up"]').prop('disabled', index === 0);
            $(this).find('[name="down"]').prop('disabled', index === lastIndex);
        });
    }

    $template.on('click', 'button[name="up"]', function () {
        const $item = $(this).closest('li');
        $item.prev('li').before($item);
        updateButtons();
    });

    $template.on('click', 'button[name="down"]', function () {
        const $item = $(this).closest('li');
        $item.next('li').after($item);
        updateButtons();
    });

    items.forEach(({block_id, url}, index) => {
        const $item = $(`
            <li class="flex items-center gap-5 border rounded-md p-2 bg-white">
                <div class="grow">
                    <img src="" alt="" class="size-full object-cover object-top max-h-15 hover:cursor-move">
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
                </div>
            </li>
        `);

        $item.find('img').attr('src', url);
        $item.attr({
            'data-index': index,
            'data-block-id': block_id
        });

        new Sortable({
            id: `item-${index}`,
            index,
            element: $item[0],
        }, ddManager);

        ddManager.monitor.addEventListener('dragend', (event) => {
            // const {source, target, canceled} = event.operation;

            // if (!canceled && target) {
            //     console.log(`Dropped ${source.id} onto ${target.id}`);
            // }

            updateButtons();
        });

        $template.append($item);
    });

    updateButtons();

    return $template;
}

/**
 * 捕获页面中的顶层区块
 * @returns {Promise<Array>} 区块截图数据
 */
async function capturePageBlocks() {
    const elements = $('#iframe').contents().find('body').children(':not(script, style, link)').get();
    const results = [];

    // 依次截图，保持区块原有顺序
    for (const [index, element] of elements.entries()) {
        const blob = await captureTrim(element);
        if (blob) {
            results.push({block_id: element.dataset.blockId, blob});
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

    const {width, height} = canvas;
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