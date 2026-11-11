import { default as finder } from '../finder.js';

export default function audioSrc(attrs = {}) {
	// 获取目标视频元素
	const $target = $(attrs.target);
	let value = $target.find('audio').attr('src');

	return finder({
		label: '音频地址',
		placeholder: 'https://domain/*.mp3',
		height: '35px',
		value: value,
		file: 'media',
		update: function (value) {
			$target.find('audio').attr('src', value);
		},
	});
}