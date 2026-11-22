define(['van', 'snapdom'], function () {
    const {button, div, img, ul, li} = van.tags
    const { svg, rect, path } = van.tags('http://www.w3.org/2000/svg')

    const $drawerLayer = $('#drawer_layer');
    const $drawerLayerList = $('#drawer_layer_list')

    $drawerLayer[0].addEventListener("sp-hidden", async (e) => {
        $drawerLayerList.empty();
    })

    $drawerLayer[0].addEventListener("sp-beforeshow", async (e) => {
        const results = await capturePageBlocks();

        const images = []
        results.forEach(({ blob }) => {
            images.push(URL.createObjectURL(blob))
        });

        van.add($drawerLayerList[0], List({items: images}))
    });

    const List = ({items}) => ul({class: 'flex flex-col gap-4'}, items.map(it => li({class: "flex items-center gap-4 border rounded-md p-2"},
        div(
            img({class: "", src: it, alt: ""}),
        ),
        div({class: "flex ml-auto"},
            button({class: "btn btn-sm btn-icon btn-ghost"},
                svg({xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.75", "stroke-linecap": "round", "stroke-linejoin": "round", class: "lucide lucide-chevron-up preview-icon"},
                    path({"d": "m18 15-6-6-6 6"}),
                ),
            ),
            button({class: "btn btn-sm btn-icon btn-ghost"},
                svg({xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.75", "stroke-linecap": "round", "stroke-linejoin": "round", class: "lucide lucide-chevron-down preview-icon"},
                    path({"d": "m6 9 6 6 6-6"}),
                ),
            ),
            button({class: "btn btn-sm btn-icon btn-ghost"},
                svg({xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.75", "stroke-linecap": "round", "stroke-linejoin": "round", class: "lucide lucide-copy preview-icon"},
                    rect({width: "14", height: "14", "x": "8", "y": "8", rx: "2", ry: "2"}),
                    path({"d": "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}),
                ),
            ),
            button({class: "btn btn-sm btn-icon btn-ghost"},
                svg({xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.75", "stroke-linecap": "round", "stroke-linejoin": "round", class: "lucide lucide-trash preview-icon"},
                    path({"d": "M10 11v6"}),
                    path({"d": "M14 11v6"}),
                    path({"d": "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}),
                    path({"d": "M3 6h18"}),
                    path({"d": "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}),
                ),
            ),
        ),
    )))

    async function capturePageBlocks() {
        const elements = $('#iframe').contents()
            .find('body')
            .children(':not(script, style, link)')
            .get();

        const results = [];

        for (const [index, element] of elements.entries()) {
            const blob = await captureTrim(element);

            if (blob) {
                results.push({
                    index,
                    blob
                });
            }
        }

        return results;
    }

    async function captureTrim(element) {
        const img = await snapdom.toPng(element);

        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img, 0, 0);

        const { width, height } = canvas;
        const data = ctx.getImageData(0, 0, width, height).data;

        let minX = width, minY = height, maxX = -1, maxY = -1;

        for (let i = 3; i < data.length; i += 4) {
            if (data[i] === 0) continue;

            const pixel = i >> 2;
            const x = pixel % width;
            const y = (pixel / width) | 0;

            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
        }

        if (maxX < 0) return null;

        const result = document.createElement('canvas');
        result.width = maxX - minX + 1;
        result.height = maxY - minY + 1;

        result.getContext('2d').drawImage(
            canvas,
            minX, minY, result.width, result.height,
            0, 0, result.width, result.height
        );

        return new Promise(resolve => {
            result.toBlob(resolve, 'image/png');
        });
    }
})
