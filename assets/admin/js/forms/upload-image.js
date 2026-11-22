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

FileAPI = {
	debug: false, // debug mode, see Console
	cors: false, // if used CORS, set `true`
	media: false // if used WebCam, set `true`
//  	staticPath: '/assets/js/lib/fileapi/'
};

const $components = $('.c-upload-image');

require(['FileAPI'], function (FileAPI) {

	$components.each(function () {
		const $choose = $(this).find('.choose');
		FileAPI.event.dnd($choose[0], function (over) {
			$choose.closest('.upload').css('backgroundColor', over ? '#ebe6e7' : '');
		}, function (files) {
			if (files.length) {
				upload($choose, files);
			}
		});
	});

	$components.on('change', '.choose', function (evt) {
		upload($(this), FileAPI.getFiles(evt));
	});

	function upload($choose, files) {
		const $component = $choose.closest('.c-upload-image');
		const $upload = $component.find('.upload');
		const $progressbar = $component.find('.progressbar');
		const $progress = $progressbar.find('progress');
		const $percentage = $progressbar.find('.percentage');
		const $preview = $component.find('.preview');
		const $field_name = $component.find('[data-field-name]');
		const $field_path = $component.find('[data-field-path]');
		const option = $component.data('option');
		const image_allowed = option.allowed || default_allowed_exts;
		const image_maxsize = option.maxsize || 10;
		const dataset_id = $('input[name="dataset_id"]').val();
		const item_id = $('input[name="id"]').val();

		FileAPI.filterFiles(files, function (file, info) {
			const ext = mimeToExtMap[file.type];
			const allowed_exts = image_allowed.split(',');
			if (allowed_exts.includes(ext)) {
				if (file.size <= image_maxsize * FileAPI.MB) {
					return true;
				} else {
					alert(`图片 ${file.name} 大于 ${image_maxsize}MB 不能上传`);
				}
			} else {
				alert(`只允许上传的图片格式：${allowed_exts.join('、')}`);
			}
			return false;
		}, function (files, rejected) {
			if (files.length === 0) {
				return false;
			}

			$progressbar.show();
			$progress.val(0);
			$percentage.text('0%');
			$component.find('.more').hide();
			$preview.find('.delete').hide();

			FileAPI.readAsDataURL(files[0], function (evt) {
				if (evt.type === 'load') {
					$upload.hide();
					$preview.show().find('img').attr('src', evt.result).addClass('grayscale');
				} else if (evt.type === 'progress') {
					var pr = evt.loaded / evt.total * 100;
				} else {
					alert('读取图片失败');
				}
			});

			FileAPI.upload({
				url: '/admin/forms/upload/image', data: {
					'id': item_id, 'dataset_id': dataset_id, 'field_name': $field_name.attr('name'), 'option': option
				}, files: {
					'image': files[0]
				}, filecomplete: function (err, xhr, file) {
					try {
						if (xhr.response) {
							const json = JSON.parse(xhr.response);
							if (json.code === 0) {
								const image_name = json.data.name;
								const image_path = json.data.path;
								const image_url = `/${image_path}/${image_name}?${new Date().getTime()}`;
								$component.find('.preview>img')
									.attr('src', image_url)
									.removeClass('grayscale');
								$field_name.val(image_name);
								$field_path.val(image_path);
							} else {
								alert(json.message);
							}
						}
					} catch (error) {
						alert(`上传图片失败：${xhr.response}`);
					}
				}, complete: function (err, xhr) {
					if (!err) {
						$preview.find('.delete').show();
						setTimeout(() => $progressbar.hide(), 500);
					} else {
						alert(`上传图片失败：${err}`);
					}
				}, progress: function (evt, file, xhr, options) {
					let percentage = parseInt(evt.loaded / evt.total * 100);
					$progress.val(percentage);
					$percentage.text(percentage + '%');
				}
			});
		});
	}
});

// 删除本地图片
$components.on('click', '.preview>.delete', function () {
	const $component = $(this).closest('.c-upload-image');
	const $field_name = $component.find('[data-field-name]');
	const $field_path = $component.find('[data-field-path]');
	const $input_file = $component.find('input[type="file"]');

	// if (!/^http(s)?:\/\/.+/i.test(image)) {
	// 	let path = $component.data('option').path;
	// }

	const dataset_id = $('input[name="dataset_id"]').val();
	const item_id = $('input[name="id"]').val();
	const data = {
		'id': item_id,
		'dataset_id': dataset_id,
		'field_name': $field_name.attr('name'),
		'path': $field_path.val(),
		'value': $field_name.val()
	};

	$.get('/admin/forms/upload/delete', data, function (res) {
		if (res.code === 0) {
			$component.find('.preview').hide();
			$component.find('.preview>img').attr('src', '');
			$component.find('.preview>.delete').hide();
			$component.find('.more').show();
			$component.find('.upload').show();
			$field_name.val('');
			$field_path.val('');
			$input_file.val('');
		} else {
			alert(res.message);
		}
	});
});

$components.on('click', '.remote-image', function () {
	let image = window.prompt('请输入远程图片链接：', 'https://');
	if (/^http(s)?:\/\/.+/i.test(image)) {
		const $this = $(this);
		const $component = $this.closest('.c-upload-image');
		$component.find('[data-field-name]').val(image);
		$component.find('[data-field-path]').val('');
		$component.find('.preview>img').attr('src', image);
		$component.find('.preview>.delete').show();
		$component.find('.upload').hide();
		$component.find('.more').hide();
		$component.find('.preview').show();
	} else if (image !== null) {
		alert('无效图片链接地址！');
	}
});