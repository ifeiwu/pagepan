define(['hugerte'], function () {
	return function (component) {

		// 提交表单同步内容：解决 Datastar 同步问题
		document.addEventListener('submit', function () {
			hugerte.triggerSave();
		}, true);

		var defaults = {
			base_url: '/assets/admin/lib/hugerte',
			target: component.querySelector('textarea'),
			skin: 'oxide',
			language_url: '/assets/admin/lib/hugerte/zh_CN.js',
			language: 'zh_CN',
			menubar: false,
			resize: false,
			statusbar: false,
			placeholder: '在这里输入文字',
			content_css: ['/assets/css/prose.css'],
			content_style: 'body{padding:10px !important} .mce-content-body::before{left:10px !important}',
			body_class: 'prose',
			min_height: 400,
			autoresize_bottom_margin: 0,
			plugins: ['advlist', 'link', 'autolink', 'lists', 'image', 'axupimgs', 'searchreplace', 'code', 'media', 'charmap', 'emoticons', 'autoresize', 'template'],
			toolbar: 'template undo redo | bold italic underline strikethrough | forecolor backcolor | lineheight align bullist numlist | link image axupimgs media | charmap emoticons | searchreplace removeformat code',
			toolbar_mode: 'sliding', // 'floating', 'sliding', 'scrolling', 'wrap'
			toolbar_sticky: true,
			toolbar_sticky_offset: 64,
			link_default_target: '_blank',
			document_base_url: location.origin,
			object_resizing: false,
			media_dimensions: false,
			image_advtab: true,
			image_dimensions: false,
			image_description: true,
			image_title: false,
			image_caption: true, // image_class_list,
			relative_urls: false,
			automatic_uploads: true,
			images_reuse_filename: true, // images_upload_url: '/upload/hugerte',
			images_upload_handler: images_upload_handler,
			many_images_upload_handler: many_images_upload_handler,
			file_picker_types: 'image media',
			file_picker_callback: (callback, value, meta) => {
				const input = document.createElement('input');
				input.setAttribute('type', 'file');

				let file_type = 'image';
				let file_size_limit = 2;
				if (meta.filetype === 'image') {
					input.setAttribute('accept', '.jpg, .jpeg, .webp, .avif, .png, .bmp');
				} else if (meta.filetype === 'media') {
					file_type = 'video';
					file_size_limit = 100;
					input.setAttribute('accept', '.mp4, .ogv, .webm');
				}
				alert('实现文件浏览选择');
				// input.addEventListener('change', (e) => {
				// 	require(['FileAPI'], function (FileAPI) {
				// 	});
				// });
				//
				// input.click();
			},
			setup: function (editor) {
				editor.on('keydown', function (e) {
					// Ctrl + Enter
					if (e.ctrlKey && e.key === 'Enter') {
						// 跳出当前 div 容器
						const node = editor.selection.getNode();
						const div = editor.dom.getParent(node, 'div');
						if (!div) {
							return;
						}

						e.preventDefault();
						e.stopPropagation();

						// 在 div 后面创建一个 p
						const p = editor.dom.create('p', {}, '<br>');
						editor.dom.insertAfter(p, div);
						// 光标放到 p 中
						editor.selection.setCursorLocation(p, 0);
					}
				});
			}
		};

		// 单张图片上传
		function images_upload_handler(blobInfo, progress) {
			return new Promise((resolve, reject) => {
				// 检查文件大小
				const file = blobInfo.blob();
				if (file.size > 1024 * 1024 * 5) { // 5MB 限制
					failure(`${file.name} 文件大小超过 5MB 限制。可以考虑使用Caesium（https://saerasoft.com/caesium）压缩图片后再上传。`);
					return;
				}

				const xhr = new XMLHttpRequest();
				xhr.withCredentials = false;
				xhr.open('POST', '/admin/forms/upload/text-editor-image');

				xhr.upload.onprogress = (e) => {
					progress(e.loaded / e.total * 100);
				};

				xhr.onload = () => {
					if (xhr.status === 403) {
						reject({message: 'HTTP Error: ' + xhr.status, remove: true});
						return;
					}

					if (xhr.status < 200 || xhr.status >= 300) {
						reject('HTTP Error: ' + xhr.status);
						return;
					}

					const json = JSON.parse(xhr.responseText);

					if (!json || typeof json.location != 'string') {
						reject('Invalid JSON: ' + xhr.responseText);
						return;
					}

					resolve(json.location);
				};

				xhr.onerror = () => {
					reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
				};

				const dataset_id = $('input[name="dataset_id"]').val();
				const item_id = $('input[name="id"]').val();

				const formData = new FormData();
				formData.append('image', file, file.name);
				formData.append('dataset_id', dataset_id);
				formData.append('item_id', item_id);
				xhr.send(formData);
			});
		}

		// 图片批量上传
		function many_images_upload_handler(blobInfo, success, failure) {
			const progress = value => {}
			images_upload_handler(blobInfo, progress).then(result => {
				success(result);
			}).catch(error => {
				failure(error);
			});
		}

		hugerte.init($.extend(true, {}, defaults, $(component).data('option')));

		$(component).removeClass('invisible');
	};
});
