<?php
define('WEB_ROOT', __DIR__ . '/');
define('ROOT_PATH', dirname(WEB_ROOT) . '/');

require ROOT_PATH . 'base.php';
require ROOT_PATH . 'helper.php';

/*$source = WEB_ROOT . 'data/file/1.jpg';
$originalSize = filesize($source);
$image = imagecreatefromjpeg($source);
ob_start();
imagejpeg($image, null, 80);
$compressedImage = ob_get_clean();
$compressedSize = strlen($compressedImage);
// 比较大小，决定是否需要压缩
if ($compressedSize < $originalSize) {
    echo "图片需要压缩，压缩后大小更小。";
    file_put_contents($source, $compressedImage);
} else {
    echo "图片不需要压缩，压缩后大小未减小。";
}*/
//var_dump(getimagesize($source));
(new Optimizer('http://192.168.31.5:8002', 'ddd'))->optimize(WEB_ROOT . 'data/file/5.png');