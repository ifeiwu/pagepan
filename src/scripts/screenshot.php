<?php
define('ROOT_PATH', dirname(__DIR__));

require ROOT_PATH . '/vendor/autoload.php';
require ROOT_PATH . '/support/bootstrap.php';

use support\Log;
use support\FileSystem;
use HeadlessChromium\BrowserFactory;

$host = $argv[1] ?? '';
$page_path = $argv[2] ?? '';
$page_url = "$host/$page_path";
$file_path = base_path("storage/page/screenshot/{$page_path}.png");
$save_path = dirname($file_path);

if (!FileSystem::rmkdir($save_path)) {
    Log::error("目录创建失败: {$save_path}");
}

$browser = null;

try {
    $browser = (new BrowserFactory())->createBrowser([
        'headless' => false
    ]);
    $page = $browser->createPage();
    $page->navigate($page_url)->waitForNavigation();
    $page->screenshot()->saveToFile($file_path);
}
catch (\Throwable $e) {
    Log::error('截图任务执行失败', [
        'message' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine(),
        'trace' => $e->getTraceAsString(),
    ]);
    exit(1);
}
finally {
    $browser?->close();
}