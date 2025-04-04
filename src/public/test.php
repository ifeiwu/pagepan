<?php
define('WEB_ROOT', __DIR__ . '/');
define('ROOT_PATH', dirname(WEB_ROOT) . '/');

require ROOT_PATH . 'base.php';
require ROOT_PATH . 'helper.php';

$api_uri = 'http://192.168.31.5';
$api_key = 'AZxuJxfW1GVQBoGaepKzkO1qJU7cCROF';
$path = WEB_ROOT . 'data/file';
$optimizer = new Optimizer($api_uri, $api_key);
foreach (['jpg', 'png', 'webp', 'avif', 'gif', 'svg'] as $ext) {
    $optimizer->optimize("{$path}/1.{$ext}", false);
}