
// 空白图片占位符
const EMPTY_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAOLSURBVHhe7dzZTuNYGIVRh0GIK8QNN7z/o6Ewj2Ie0v277a4UqiBUzQ7VOWtJVmxTqkTKp+MTx85kOp3OOvhia8MjfClhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWERMptPpbFhfebPZrHt7e+uXZVpbW+uXyWQy7Fl9zYRVUdWyu7vbbW1t9W9ybSeNz/H4+NhdXFz0263E1URYY0B7e3vd+vp6v75sr6+v3fHxcb/eQlxNzLHqTd3Z2fm2qEo9d72Gei0taGbyvr29Pax9nz/hNSyLT4VECIsIYREhLCKERYSwiBAWEcIiQlhECIsIYREhLCKERYSw/oOTk5OlX436fyGs33Rzc9M9PDx0Z2dnwx7mCeudz1yu/Pz83F1eXnabm5v9Zce1zs+ENefl5aU7PDz88CrP+lsdAjc2Nvrtery9ve3u7+/7bf4hrDl1WKs5U4WzyPn5ef84f9163YFTN0vwg7AGFVWNWHVteo1Kp6enw19+qKienp76kOaNd98cHR0NexDW3+pQVhPx8WaLeqy50/X1db9d6lB3d3e38IaMCqvCvLq6Gva0rfmwKoYaid4HU9sVVgVWI1iNaIuiGtXfK6wa1VrXdFg1n6p7/RYFU/sruppz1fpn7gesT4p1GK1gW9Z0WOM5qPdzptE4d6pTEJ+Jqoz/bpzkt6rZsGpUqXlTjVo1uny01KHwV/sXLfV/1pztVx8AWtHELfb1Zu/v7/806tTc6bOj0O+qka5+J2JU2wcHB/+eA1tlzYb1HVoKq/lPhWQ0E9af8JVLS1/7NBHWeH7po+8A0+q56zUsOrWxavzwWtD4HH54bcXVm1ynAmpZJj8VCV/Ep0IihEWEsIgQFhHCIkJYRAiLCGERISwihEWEsIgQFhHCIkJYRAiLCGERISwihEWEsIgQFhHCIkJYRAiLCGERISwihEWEsIgQFhHCIkJYRAiLCGERISwihEWEsIgQFhHCIkJYRAiLCGERISwihEWEsIgQFhHCIkJYRAiLCGERISwihEWEsIgQFhHCIkJYRAiLCGERISwihEWEsIgQFhHCIkJYRAiLCGERISwihEWEsIgQFhHCIkJYRAiLCGERISwihEWEsIgQFhHCIkJYRAiLCGERISwihEWEsIgQFhHCIkJYRAiLCGERISwihEWEsIgQFhHCIkJYRAiLCGER0HV/AXYzeSNz6SCRAAAAAElFTkSuQmCC';

// 响应式图片管理
export default function createPicture(target) {
    const $target = $(target);
    const $picture = $target.parent('picture');

    // 断点与媒体查询宽度的对应关系
    const breakpoints = {
        sm: 560,
        md: 768,
        lg: 1024,
        xl: 1280
    };

    // 获取当前断点对应的 source
    function getSource() {
        const width = window.breakpointWidth;

        return $picture.find('source').filter(function () {
            return ($(this).attr('media') || '').includes(`${width}px`);
        });
    }

    // 设置响应式图片
    function setPicture(image) {
        const images = {
            sm: '',
            md: '',
            lg: '',
            xl: ''
        };

        // 读取现有响应式图片，并移除旧的 source
        $picture.find('source').each(function () {
            const media = $(this).attr('media') || '';

            Object.entries(breakpoints).forEach(([key, width]) => {
                if (media.includes(`${width}px`)) {
                    images[key] = $(this).attr('srcset') || '';
                }
            });
        }).remove();

        // 更新当前断点的图片
        const breakpoint = window.breakpointSize;

        if (Object.hasOwn(images, breakpoint)) {
            images[breakpoint] = image;
        }

        // 监听图片加载完成，触发目标元素点击
        $picture.find('img').one('load', function () {
            $target.trigger('click');
        });

        // 按照断点从小到大添加，最终 DOM 顺序为 xl、lg、md、sm
        Object.entries(breakpoints).forEach(([key, width]) => {
            if (images[key]) {
                $picture.prepend(
                    $('<source>', {
                        srcset: images[key],
                        media: `(min-width: ${width}px)`,
                        class: `source-${key}`
                    })
                );
            }
        });

        // 默认断点使用 img 的 src 和 srcset
        if ($picture.length && breakpoint === '') {
            $picture.find('img').attr({
                src: image,
                srcset: image
            });
        } else if (!$picture.length) {
            // 非 picture 结构直接修改图片地址
            $target.attr('src', image);
        }
    }

    // 获取当前断点对应的图片
    function getPicture() {
        const $source = getSource();

        if ($source.length) {
            return $source.attr('srcset');
        }

        // 没有对应的 source 时，回退到默认图片
        return $target.attr('src') || $target.attr('srcset') || '';
    }

    // 删除当前断点对应的图片
    function removePicture() {
        const $source = getSource();

        if ($source.length) {
            // 删除当前断点的 source
            $source.remove();
        } else if (window.breakpointSize === '') {
            // 默认断点没有 source 时，使用空白图片占位
            $target.attr('srcset', EMPTY_IMAGE);
        }
    }

    return {
        setPicture,
        getPicture,
        removePicture
    };
}
