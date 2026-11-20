// const utils = require('app/utils')
const default_allowed_exts = 'jpg,jpeg,png,webp,avif,gif,svg'
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
}

$cUploadImage = $('.c-image-upload')
$preview = $cUploadImage.find('.preview');

require(['FileAPI'], function (FileAPI) {
    $cUploadImage.on('change', '.fileapi-upload-image', function (evt) {
        let files = FileAPI.getFiles(evt)
        let $submit = $('button[type="submit"]')
        let $choice = $(evt.currentTarget)
        let $upload = $choice.closest('.c-image-upload')
        let $progress = $upload.find('.c-image-upload-progress')
        let $success = $upload.find('.c-image-upload-success')
        let $input = $upload.find('input[type="hidden"]')
        let option = $upload.data('option')
        let image_name = option.name
        let image_path = option.path
        let image_prefix = option.prefix
        let image_suffix = option.suffix
        let image_width = option.width
        let image_height = option.height
        let image_quality = option.quality
        let image_convert = option.convert
        let image_allowed = option.allowed || default_allowed_exts
        let image_maxsize = option.maxsize || 10
        let image_isresize = option.isresize
        let image_isoverwrite = option.isoverwrite
        let image_path2 = $('input[name="$upload_path"]').val()

        FileAPI.filterFiles(files, function (file, info) {
                let ext = mimeToExtMap[file.type]
                let allowed_exts = image_allowed.split(',')
                if (allowed_exts.includes(ext)) {
                    if (file.size <= image_maxsize * FileAPI.MB) {
                        return true
                    } else {
                        UIkit.notification(`图片 ${file.name} 大于 ${image_maxsize}MB 不能上传`, {status: 'warning'})
                    }
                } else {
                    UIkit.notification(`只允许上传的图片格式：${allowed_exts.join('、')}`, {status: 'warning'})
                }
                return false
            },
            function (files, rejected) {
                FileAPI.readAsDataURL(files[0], function (evt) {
                    if (evt.type === 'load') {
                        $preview.show().find('img').attr('src', evt.result)
                    } else if (evt.type === 'progress') {
                        var pr = evt.loaded / evt.total * 100;
                    } else {
                        alert('读取图片失败')
                    }
                })

                if (files.length == 0) {
                    return false
                }
                let rdata = {}
                rdata.image_name = image_name ? image_name : ''
                rdata.image_path = image_path2 ? image_path2 : ''
                rdata.image_path = image_path ? image_path : image_path2
                rdata.image_prefix = image_prefix ? image_prefix : ''
                rdata.image_suffix = image_suffix ? image_suffix : ''
                rdata.image_width = image_width ? image_width : ''
                rdata.image_height = image_height ? image_height : ''
                rdata.image_convert = image_convert || ''
                rdata.image_allowed = image_allowed || ''
                rdata.image_maxsize = image_maxsize || ''
                // $submit.attr('disabled', true);
                $progress.removeClass('uk-hidden').val(1)
                /*FileAPI.upload({
                    url: 'former/group/image-upload/action/upload',
                    data: rdata,
                    files: {'images': files},
                    filecomplete: function (err, xhr, file) {
                        try {
                            if (xhr.response) {
                                let json = JSON.parse(xhr.response)
                                if (json.code == 0) {
                                    let time = new Date().getTime()
                                    let image_name = json.data.image
                                    let image_url = `${pagevar.site.domain}img.php?path=${json.data.path}/${image_name}&p=200&dc=1&t=${time}`
                                    let $img = $upload.find('.c-image-upload-preview img')
                                    $img.attr('src', image_url)
                                    $img.on('error', function () {
                                        this.src = `${pagevar.site.domain}${json.data.path}/${image_name}?${time}`
                                    })
                                    $input.val(image_name)
                                    // utils.revokeSubmitRemoveFiles(image_name)
                                } else {
                                    UIkit.notification(json.message, {status: 'danger'})
                                }

                            }
                        } catch (error) {
                            console.error(xhr.response)
                        }
                    },
                    complete: function (err, xhr) {
                        if (!err) {
                            // window.addBeforeunload();
                        } else {
                            UIkit.notification('上传图片失败：' + err, {status: 'danger'})
                        }

                        setTimeout(function () {
                            // $submit.attr('disabled', false);
                            $success.addClass('uk-hidden')
                            $upload.find('.c-image-upload-area').hide()
                            $upload.find('.c-image-upload-preview').show()
                        }, 1000)
                    },
                    progress: function (evt, file, xhr, options) {
                        let percentage = parseInt(evt.loaded / evt.total * 100)
                        $progress.val(percentage)
                        if (percentage == 100) {
                            $progress.addClass('uk-hidden').val(0)
                            $success.removeClass('uk-hidden')
                        }
                    }
                })*/
            })
    })
})

// 删除本地图片
$('.c-image-upload').on('click', '.c-image-upload-preview-delete', function () {
    let $upload = $(this).closest('.c-image-upload')
    let $input_name = $upload.find('input[type="hidden"]')
    let $input_file = $upload.find('input[type="file"]')
    let image = $input_name.val()

    if (!/^http(s)?:\/\/.+/i.test(image)) {
        let path = $upload.data('path') ?? $('input[name="$upload_path"]').val()
        // utils.setSubmitRemoveFiles({ 'prefix': $upload.data('prefix'), 'path': path, 'name': image })
    }

    $upload.find('.c-image-upload-preview img').attr('src', '')
    $upload.find('.c-image-upload-preview').hide()
    $upload.find('.c-image-upload-area').show()
    $input_name.val('')
    $input_file.val('')
})

$('.c-image-upload').show()

$('.remote-image-link').click(function () {
    let image = window.prompt('请输入远程图片链接：', 'https://')
    if (/^http(s)?:\/\/.+/i.test(image)) {
        let $this = $(this)
        let $upload = $this.closest('.c-image-upload')
        $upload.find('input[type="hidden"]').val(image)
        $upload.find('.c-image-upload-preview img').attr('src', image)
        $upload.find('.c-image-upload-area').hide()
        $upload.find('.c-image-upload-preview').show()
    } else if (image !== null) {
        alert('无效图片链接地址！')
    }
})