<?php
require_once VEN_PATH . 'autoload.php';

use Gumlet\ImageResize;
use Sirius\Upload\Handler as UploadHandler;

return function () {
    $file = $_FILES['file'];
    $file_name = $file['name'];
    $image_name = $_POST['image_name']; // 图片名称
    $image_path = $_POST['image_path']; // 图片路径
    $image_maxsize = $_POST['image_maxsize']; // 最大大小
    $image_allowed = $_POST['image_allowed']; // 允许格式
    $image_convert = $_POST['image_convert']; // 转换格式
    $overwrite = $_POST['overwrite'] ?? true; // 是否覆盖图片
    // 上传路径
    $upload_path = rtrim(WEB_ROOT . $image_path, '/');
    if (is_dir($upload_path) && !is_writable($upload_path)) {
        chmod($upload_path, 0755);
    }
    // 格式验证
    $allowed = $image_allowed ? explode(',', $image_allowed) : ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, $allowed, true)) {
        Response::error('只允许上传的图片格式：' . implode('，', $allowed));
    }
    // 大小验证
    $maxsize = floatval($image_maxsize ?: 20) * 1024 * 1024;
    if ($file['size'] > $maxsize) {
        $sizemb = round($maxsize / (1024 * 1024), 2);
        Response::error("图片大小不能超过 {$sizemb}MB");
    }
    // 上传程序
    $uploadHandler = new UploadHandler($upload_path);
//    $uploadHandler->addRule('image', ['allowed' => ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg']], '{label}应为有效格式（jpg, jpeg, png, webp, gif, svg）', '图片');
//    $uploadHandler->addRule('size', ['size' => '20M'], '{label}应小于 {size}', '图片');
    $uploadHandler->setOverwrite($overwrite);
//    $uploadHandler->setAutoconfirm(true);
    // 修改名称
    if ($image_name) {
        $uploadHandler->setSanitizerCallback(function ($name) use ($image_name) {
            return $image_name . '.' . pathinfo($name, PATHINFO_EXTENSION);
        });
    }
    $result = $uploadHandler->process($_FILES);
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
                $suffixs = explode(',', $_POST['image_suffix']);
                $widths = explode(',', $_POST['image_width']);
                $heights = explode(',', $_POST['image_height']);
                $maxLen = max(count($prefixs), count($suffixs));
                for ($i = 0; $i <= $maxLen; $i++) {
                    $prefix = $prefixs[$i] ?? '';
                    $suffix = $suffixs[$i] ?? '';
                    $file_info = pathinfo($file_name);
                    $file_ext = $image_convert ?? $file_info['extension'];
                    $new_file_path = "{$upload_path}/{$prefix}{$file_info['filename']}{$suffix}.{$file_ext}";

                    $_width = $widths[$i];
                    $_height = $heights[$i];
                    $image = new ImageResize($file_path);
                    $image->quality_jpg = 100;
                    $image->quality_webp = 100;
                    $image->quality_png = 0;
                    // 调整图片宽度
                    if ($_width) {
                        if ($width > $_width) {
                            $image->resizeToWidth($_width);
                        }
                    }
                    // 调整图片高度
                    if ($_height) {
                        if ($height > $_height) {
                            $image->resizeToHeight($_height);
                        }
                    }
                    // 转换格式
                    if ($image_convert) {
                        if ($image_convert == 'png') {
                            $image->output(IMAGETYPE_PNG);
                        } elseif ($image_convert == 'webp') {
                            $image->output(IMAGETYPE_WEBP);
                        } elseif ($image_convert == 'jpg' || $image_convert == 'jpeg') {
                            $image->output(IMAGETYPE_JPEG);
                        }
                    }
                    // 保存图片
                    $image->save($new_file_path);
                    // 压缩图片大小
                    $optimizer->optimize($new_file_path);
                }
            }

            $result->confirm();

            Response::success('上传图片成功', [
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
        Response::error('上传失败');
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