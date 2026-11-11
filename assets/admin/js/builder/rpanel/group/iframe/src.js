import { default as finder } from '../finder.js';

export default function iframeSrc(attrs = {}) {
	// 获取目标元素
	const $target = $(attrs.target);
	let value = $target.find('iframe').attr('src');

	return finder({
		label: '页面地址',
		placeholder: 'http://',
		rows: 4,
		value: value,
		filetype: '',
		update: function (value) {

			$target.find('iframe').attr('src', value);
		},
	});
}