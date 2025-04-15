<?php
/**
 * 重新生成商品缩略图片：data/file/goods/
 */

use Gumlet\ImageResize;

return function ($request_data) {
    loader_vendor();

    $_POST = $request_data;

    $db = db();
    $items = $db->select('goods', 'path,image', [['type', '=', 1], 'AND', ['image', '<>', '']]);
    foreach ($items as $item) {
        $file_path = WEB_ROOT . "{$item['path']}/{$item['image']}";
        if (file_exists($file_path)) {
            _resize($file_path, ['s_', 'm_', ''], ['200', '600', '1200']);
        }
    }
};

function _resize($file_path, $prefixs, $widths, $heights = [])
{
    // 压缩上传图片
    $optimizer = new Optimizer($_POST['optimizeapi_uri'], $_POST['optimizeapi_key']);
    $optimizer->optimize($file_path);

    list($width, $height) = getimagesize($file_path);

    $info = pathinfo($file_path);
    $upload_path = $info['dirname'];
    $file_name = $info['basename'];

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