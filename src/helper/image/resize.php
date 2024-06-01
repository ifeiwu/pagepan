<?php
// 生成图片尺寸
return function ($path, $name, $prefix = 's_', $width = 320, $height = null, $quality = 95) {
    $path = ROOT_PATH . $path . '/';
    $source_image = $path . $name;
    $dest_image = $path . $prefix . $name;

    if ( ! is_file($dest_image) && is_file($source_image) )
    {
        $image = new \Gumlet\ImageResize($source_image);
        $ext = end(explode('.', $name));

        if ( $ext == 'jpg' || $ext == 'jpeg' ) {
            $image->quality_jpg = $quality;
        } else {
            $image->quality_png = $quality / 10;
        }

        if ( $width && $height ) {
            $image->resize($width, $height);
        } elseif ( $width ) {
            $image->resizeToWidth($width);
        } else {
            $image->resizeToHeight($height);
        }

        $image->save($dest_image);
    }
};