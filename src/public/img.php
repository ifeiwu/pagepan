<?php
if (!$path = $_GET['path']) {
    exit;
}

define('WEB_ROOT', __DIR__ . '/');
define('ROOT_PATH', dirname(WEB_ROOT) . '/');

// 所有错误和异常记录
ini_set('error_reporting', E_ALL & ~E_WARNING & ~E_NOTICE & ~E_DEPRECATED);
ini_set('display_errors', false);
ini_set('ignore_repeated_errors', true);
ini_set('log_errors', true);
ini_set('error_log', ROOT_PATH . 'data/logs/error.log');

require ROOT_PATH . 'vendor/autoload.php';

$server = League\Glide\ServerFactory::create([
    'source' => WEB_ROOT, // 原始图片存储路径
    'cache' => ROOT_PATH . 'data/cache/glide', // 缓存路径
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

// 清理指定图片缓存
if (isset($_GET['dc'])) {
    $server->deleteCache($path);
}

// 为了安全起见只能使用预设，避免生成过多尺寸的图片。
// $path = preg_replace('/[<>:"|?*]+/', '', $path);
$preset = intval($_GET['p']);
$server->outputImage($path, ['p' => $preset]);