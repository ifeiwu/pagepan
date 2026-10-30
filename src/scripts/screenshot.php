<?php
define('ROOT_PATH', dirname(__DIR__));

require ROOT_PATH . '/vendor/autoload.php';
require ROOT_PATH . '/support/bootstrap.php';

use support\Log;
use support\FileSystem;
use HeadlessChromium\BrowserFactory;
use HeadlessChromium\Clip;

$host = $argv[1] ?? '';
$page_path = $argv[2] ?? '';
$page_url = "$host/$page_path";
$file_path = base_path("storage/page/screenshot/{$page_path}.webp");
$save_path = dirname($file_path);

$browser = null;

try {
    if (!FileSystem::rmkdir($save_path)) {
        throw new \Exception("目录创建失败: {$save_path}");
    }

    $browser = (new BrowserFactory())->createBrowser([
        'windowSize' => [1024, 768],
        'headless' => true
    ]);

    $page = $browser->createPage();

    $navigation = $page->navigate($page_url);
    $navigation->waitForNavigation();

    $rect = $page->evaluate('(() => {
        const el = document.querySelector("body > *");
        if (!el) return null;

        const r = el.getBoundingClientRect();
        return {
            x: r.x + window.scrollX,
            y: r.y + window.scrollY,
            width: r.width,
            height: r.height
        };
    })()')->getReturnValue();

    if (!$rect || $rect['width'] <= 0 || $rect['height'] <= 0) {
        throw new \Exception('未找到可截图的元素');
    }

    $screenshot = $page->screenshot([
        'captureBeyondViewport' => true,
        'clip' => new Clip(
            $rect['x'],
            $rect['y'],
            $rect['width'],
            $rect['height']
        ),
        'format'  => 'webp',  // default to 'png' - possible values: 'png', 'jpeg', 'webp'
        'quality' => 90,      // only when format is 'jpeg' or 'webp' - default 100
        'optimizeForSpeed' => false // default to 'false' - Optimize image encoding for speed, not for resulting size
    ]);

    $screenshot->saveToFile($file_path);
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