<?php
return function () {
    $server = League\Glide\ServerFactory::create([
        'source' => WEB_ROOT, // 原始图片存储路径
        'cache' => CACHE_PATH . 'glide', // 缓存路径
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

    return $server;
};