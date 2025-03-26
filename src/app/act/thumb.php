<?php
/**
 * 生成缩略图片
 * <img src="img/data/file/ad.png?p=600">
 */
require_once VEN_PATH . 'autoload.php';

return function ($name) {
    try {
        $server = League\Glide\ServerFactory::create([
            'source' => WEB_ROOT, // 原始图片存储路径
            'cache' => CACHE_PATH, // 缓存路径
            'max_image_size' => 4000 * 4000,// 通过设置 max_image_size 参数，可以限制生成的图片的最大尺寸，避免生成过大的图片。
            // 预设可以提前定义常用的图片处理参数，避免在每次请求时重复设置参数。
            'presets' => [
                '200' => [
                    'w' => 200,
                    'fm' => 'webp',
                ],
                '600' => [
                    'w' => 600,
                    'fm' => 'webp',
                ],
                '1200' => [
                    'w' => 1200,
                    'fm' => 'webp',
                ]
            ]
        ]);
        // 为了安全起见只能使用预设，避免生成过多尺寸的图片。
        $server->outputImage($name, ['p' => $_GET['p']]);
    } catch (Exception $ex) {
        throw $ex;
    }
};