import { default as finder } from '../finder.js';
import createPicture from '../../picture.js';

export default function imgSrc(attrs = {}) {
    // 初始化图片管理器
    const picture = createPicture(attrs.target);

    // 获取当前断点图片
    const image = picture.getPicture();

    return finder({
        label: '图片地址',
        placeholder: 'https://domain/*.png or *.jpg',
        rows: 3,
        value: image,
        filetype: 'image',
        update: function (value) {
            if (value) {
                picture.setPicture(value);
            } else {
                picture.removePicture();
                setTimeout(() => {
                    $targetel.trigger('click');
                }, 50);
            }
        },
    });
}