// const utils = require('app/utils')
const default_allowed_exts = 'jpg,jpeg,png,webp,avif,gif,svg';
const mimeToExtMap = {
	'image/jpeg': 'jpg',
	'image/jpg': 'jpg',
	'image/png': 'png',
	'image/gif': 'gif',
	'image/webp': 'webp',
	'image/avif': 'avif',
	'image/svg+xml': 'svg',
	'image/bmp': 'bmp',
	'image/tiff': 'tiff',
	'image/x-icon': 'ico'
};
//	require('css!former/image-upload/image-upload.css');
FileAPI = {
	debug: false, // debug mode, see Console
	cors: false, // if used CORS, set `true`
	media: false // if used WebCam, set `true`
//  	staticPath: '/assets/js/lib/fileapi/'
};

const $components = $('.c-upload-image');

require(['FileAPI'], function (FileAPI) {
	$components.on('change', '.upload', function (evt) {
		let files = FileAPI.getFiles(evt);
		let $submit = $('button[type="submit"]');
		let $upload = $(evt.currentTarget);
		let $component = $upload.closest('.c-upload-image');
		let $progress = $component.find('.progress').show();
		let $preview = $component.find('.preview');
		let $input_name = $component.find('[data-input-name]');
		let option = $component.data('option');
		let image_allowed = option.allowed || default_allowed_exts;
		let image_maxsize = option.maxsize || 10;

		FileAPI.filterFiles(files, function (file, info) {
				let ext = mimeToExtMap[file.type];
				let allowed_exts = image_allowed.split(',');
				if (allowed_exts.includes(ext)) {
					if (file.size <= image_maxsize * FileAPI.MB) {
						return true;
					} else {
						alert(`图片 ${file.name} 大于 ${image_maxsize}MB 不能上传`, {status: 'warning'});
					}
				} else {
					alert(`只允许上传的图片格式：${allowed_exts.join('、')}`, {status: 'warning'});
				}
				return false;
			},
			function (files, rejected) {
				FileAPI.readAsDataURL(files[0], function (evt) {
					if (evt.type === 'load') {
						$upload.hide();
						$preview.show().find('img')
						.attr('src', evt.result)
						.addClass('grayscale');
					} else if (evt.type === 'progress') {
						var pr = evt.loaded / evt.total * 100;
					} else {
						alert('读取图片失败');
					}
				});

				if (files.length === 0) {
					return false;
				}

				// $submit.attr('disabled', true);
				$progress.val(1);
				FileAPI.upload({
					url: '/admin/forms/upload/image',
					data: {'option': option},
					files: {'image': files[0]},
					filecomplete: function (err, xhr, file) {
						try {
							if (xhr.response) {
								let json = JSON.parse(xhr.response);
								if (json.code === 0) {
									let time = new Date().getTime();
									let image_name = json.data.name;
									let image_path = json.data.path;
									let image_url = `/${image_path}/${image_name}?${time}`;
									$component.find('.preview img')
									.attr('src', image_url)
									.removeClass('grayscale')
									.on('error', function () {
										alert(`无法加载图片：${image_url}`);
									});
									$input_name.val(image_name);
								} else {
									alert(json.message);
								}
							}
						} catch (error) {
							alert(`上传图片失败：${xhr.response}`);
						}
					},
					complete: function (err, xhr) {
						if (!err) {
						} else {
							alert(`上传图片失败：${err}`);
						}
					},
					progress: function (evt, file, xhr, options) {
						let percentage = parseInt(evt.loaded / evt.total * 100);
						$progress.val(percentage);
						if (percentage === 100) {
							$progress.hide().val(0);
						}
					}
				});
			});
	});
});

// 删除本地图片
$components.on('click', '.preview>button', function () {
	let $component = $(this).closest('.c-upload-image');
	let $input_name = $component.find('[data-input-name]');
	let $input_file = $component.find('input[type="file"]');
	let image = $input_name.val();

	if (!/^http(s)?:\/\/.+/i.test(image)) {
		let path = $component.data('path') ?? $('input[name="$upload_path"]').val();
	}

	$component.find('.preview img').attr('src', '');
	$component.find('.preview').hide();
	$component.find('.upload').show();
	$input_name.val('');
	$input_file.val('');
});

$components.on('click', '.remote-image-link', function () {
	let image = window.prompt('请输入远程图片链接：', 'https://');
	if (/^http(s)?:\/\/.+/i.test(image)) {
		let $this = $(this);
		let $component = $this.closest('.c-upload-image');
		$component.find('[data-input-name]').val(image);
		$component.find('.preview img').attr('src', image);
		$component.find('.upload').hide();
		$component.find('.preview').show();
	} else if (image !== null) {
		alert('无效图片链接地址！');
	}
});