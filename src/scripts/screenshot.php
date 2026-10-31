<?php

define('ROOT_PATH', dirname(__DIR__));

require ROOT_PATH . '/vendor/autoload.php';
require ROOT_PATH . '/support/bootstrap.php';

use support\Log;
use support\FileSystem;
use HeadlessChromium\BrowserFactory;
use HeadlessChromium\Clip;

$host = rtrim($argv[1] ?? '', '/');
$page_path = trim($argv[2] ?? '', '/');

if (!$host || !$page_path || str_contains($page_path, '..')) {
    exit(1);
}

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
        'headless' => true,
    ]);

    $page = $browser->createPage();

    $page->navigate($page_url)->waitForNavigation();

    // 等待图片和字体加载
    $page->evaluate('async () => {
        await document.fonts.ready;

        await Promise.all(
            Array.from(document.images).map(img => {
                if (img.complete) return Promise.resolve();

                return new Promise(resolve => {
                    img.addEventListener("load", resolve, {once: true});
                    img.addEventListener("error", resolve, {once: true});
                });
            })
        );
    }')->waitForResponse();

    // 获取 body 第一个子元素的位置和尺寸
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

    $page->screenshot([
        'captureBeyondViewport' => true,
        'clip' => new Clip(
            $rect['x'],
            $rect['y'],
            $rect['width'],
            $rect['height']
        ),
        'format' => 'webp',
        'quality' => 90,
        'optimizeForSpeed' => false,
    ])->saveToFile($file_path);

    file_put_contents($file_path . '.done', '1');

} catch (\Throwable $e) {
    Log::error('截图任务执行失败', [
        'message' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine(),
        'trace' => $e->getTraceAsString(),
    ]);

    exit(1);

} finally {
    $browser?->close();
}