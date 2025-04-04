<?php

use Gumlet\ImageResize;
use Gumlet\ImageResizeException;
use Verot\Upload\Upload;

use Sirius\Upload\Handler as UploadHandler;

return function () {
    require_once VEN_PATH . 'autoload.php';

    $file = $_FILES['file'];
    $file_name = $file['name'];
    $image_path = $_POST['image_path'];
    $upload_path = WEB_ROOT . $image_path;
    $uploadHandler = new UploadHandler($upload_path);
    $uploadHandler->addRule('extension', ['allowed' => ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'svg']], '{label}应为有效格式（jpg, jpeg, png, webp, avif, gif, svg）', '图片');
    $uploadHandler->addRule('size', ['size' => '20M'], '{label}应小于 {size}', '图片');
    $uploadHandler->setOverwrite(true);
//    $uploadHandler->setAutoconfirm(true);
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
            // 生成多种图片尺寸
            $prefixs = explode(',', $_POST['image_prefix']);
            $widths = explode(',', $_POST['image_width']);
            $heights = explode(',', $_POST['image_height']);
            foreach ($prefixs as $key => $prefix) {
                $new_file_path = $upload_path . '/' . $prefix . $file_name;
                if ($ext == 'svg' || $ext == 'gif' || $ext == 'avif') {
                    copy($file_path, $new_file_path);
                    continue;
                }
                $_width = $widths[$key];
                $_height = $heights[$key];
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
        Response::error('上传出错', $result->getMessages());
    }
};