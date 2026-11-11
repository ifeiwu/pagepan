import { default as finder } from '../finder.js';

export default function videoPoster(attrs = {}) {
	// 获取目标视频元素
	const $target = $(attrs.target);
	let value = $target.find('video').attr('poster');

	return finder({
		label: '视频封面',
		placeholder: 'https://domain/*.png or *.jpg',
		rows: 3,
		value: value,
		filetype: 'image',
		update: function (value) {

			$target.find('video').attr('poster', value);
		},
	});
}