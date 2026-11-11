import { default as finder } from '../finder.js';

export default function videoSrc(attrs = {}) {
	// 获取目标视频元素
	const $target = $(attrs.target);
	let value = $target.find('video').attr('src');

	return finder({
		label: '视频地址',
		placeholder: 'https://domain/*.mp4',
		rows: 3,
		value: value,
		filetype: 'media',
		update: function (value) {

			$target.find('video').attr('src', value);
		},
	});
}