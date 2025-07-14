<?php
require_once VEN_PATH . 'autoload.php';

use Gumlet\ImageResize;
use Verot\Upload\Upload;
use Sirius\Upload\Handler as UploadHandler;

return function () {
    $file = $_FILES['file'];
    $file_name = $file['name'];
    $image_name = $_POST['image_name']; // 图片名称
    $image_path = $_POST['image_path']; // 图片路径
    $overwrite = $_POST['overwrite'] ?? true; // 是否覆盖图片
    // 上传路径
    $upload_path = WEB_ROOT . $image_path;
    if (is_dir($upload_path) && !is_writable($upload_path)) {
        chmod($upload_path, 0755);
    }
    // 上传程序
    $uploadHandler = new UploadHandler($upload_path);
    $uploadHandler->addRule('image', ['allowed' => ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg']], '{label}应为有效格式（jpg, jpeg, png, webp, gif, svg）', '图片');
    $uploadHandler->addRule('size', ['size' => '20M'], '{label}应小于 {size}', '图片');
    $uploadHandler->setOverwrite($overwrite);
//    $uploadHandler->setAutoconfirm(true);

    if ($image_name) {
        $uploadHandler->setSanitizerCallback(function($name) use ($image_name) {
            return $image_name.'.png';
        });
    }

    $result = $uploadHandler->process($file);
    if ($result->isValid()) {
        $file_name = $result->name;
        $file_path = $upload_path . '/' . $file_name;
        $info = getimagesize($file_path);
        $width = $info[0];
        $height = $info[1];
        $mime = $info['mime'];
        $ext = pathinfo($file_path, PATHINFO_EXTENSION);
        try {
            // 压缩上传图片
            $optimizer = new Optimizer($_POST['optimizeapi_uri'], $_POST['optimizeapi_key']);
            $optimizer->optimize($file_path);
            // 指定格式压缩图片
            if (in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'gif'])) {
                // 生成多种图片尺寸
                $prefixs = explode(',', $_POST['image_prefix']);
                $widths = explode(',', $_POST['image_width']);
                $heights = explode(',', $_POST['image_height']);
                foreach ($prefixs as $i => $prefix) {
                    $new_file_path = $upload_path . '/' . $prefix . $file_name;
                    $_width = $widths[$i];
                    $_height = $heights[$i];
                    $image = new ImageResize($file_path);
                    $image->quality_jpg = 100;
                    $image->quality_webp = 100;
                    $image->quality_png = 0;
                    $is_copy_file = true;
                    // 调整图片宽度
                    if ($_width) {
                        if ($width > $_width) {
                            $image->resizeToWidth($_width);
                            $is_copy_file = false;
                        }
                    }
                    // 调整图片高度
                    if ($_height) {
                        if ($height > $_height) {
                            $image->resizeToHeight($_height);
                            $is_copy_file = false;
                        }
                    }
                    // 可以调整图片大小
                    if ($is_copy_file == false) {
                        $image->save($new_file_path);
                    } else {
                        copy($file_path, $new_file_path);
                    }
                    // 压缩图片大小
                    $optimizer->optimize($new_file_path);
                }
            }

            $result->confirm();

            Response::success('上传成功', [
                'path' => $image_path,
                'image' => $result->name,
                'size' => filesize($file_path),
                'width' => $width,
                'height' => $height,
                'mime' => $mime,
                'ext' => $ext,
            ]);
        } catch (\Exception $e) {
            $result->clear();
            Response::error($e->getMessage());
        }
    } else {
        Response::error('不支持图片格式');
    }
};


/**
 * 生成唯一的文件名称
 * @param $file
 * @return string
 */
function _getUniqueFilename($file)
{
    $dir = pathinfo($file, PATHINFO_DIRNAME);
    $name = pathinfo($file, PATHINFO_BASENAME);
    $ext = pathinfo($file, PATHINFO_EXTENSION);
    $ext = $ext ? '.' . $ext : '';
    $number = '';
    while (file_exists("{$dir}/{$name}")) {
        $new_number = (int)$number + 1;
        if ('' == "{$number}{$ext}") {
            $name = "{$name}-{$new_number}";
        } else {
            $name = str_replace(["-{$number}{$ext}", "{$number}{$ext}"], "-{$new_number}{$ext}", $name);
        }
        $number = $new_number;
    }
    return "{$dir}/{$name}";
}