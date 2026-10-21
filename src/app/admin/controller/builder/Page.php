<?php

namespace app\admin\controller\builder;

use HeadlessChromium\BrowserFactory;
use support\Request;
use Workerman\Coroutine;
use Workerman\Timer;

class Page
{
    // 保存代码到文件
    public function publish(Request $request)
    {
        $db = db();

        $page_id = $request->post('page_id');
        $page = $db->table('page')->where('id', '=', $page_id)->first();
        if (empty($page)) {
            return json_error('获取页面信息失败');
        }

        $blocks = $db->table('page_block')->where('page_id', '=', $page_id)->get()->toArray();

        $page_path = $page->path;
        if (empty($page_path) && $page->type == 'home') {
            $page_path = 'index';
        }

        $content = implode('', array_column($blocks, 'content'));
        $content = preg_replace('/\s+data-block-(?:setting|type|path)="[^"]*"/', '', $content);
        // 删除测试内容块
        $content = preg_replace('/<!-- delete-test-block:start -->.*?<!-- delete-test-block:end -->\s*/s', '', $content);
        $content = preg_replace('/<delete-test-block\b[^>]*>.*?<\/delete-test-block>/s', '', $content);

        $file = app_path("view/page/{$page_path}.phtml");
        if (file_put_contents($file, $content) === false) {
            return json_error('保存页面文件失败');
        }

        return json_success('ok');
    }

    public function screenshot()
    {
        $path = public_path('bar.png');
        $browser = null;

        try {
            $browser = (new BrowserFactory())->createBrowser([
                'headless' => true
            ]);

            $page = $browser->createPage();

            $page->navigate('http://192.168.31.5:8008');

            Timer::sleep(0.1);

            $deadline = microtime(true) + 15;
            do {
                $state = $page->evaluate('document.readyState')->getReturnValue();
                if ($state === 'complete') {
                    break;
                }
                Timer::sleep(0.1);
            } while (microtime(true) < $deadline);

            $page->screenshot()->saveToFile($path);

            return json([
                'path' => $path,
                'exists' => is_file($path),
                'size' => is_file($path) ? filesize($path) : 0,
            ]);
        } catch (\Throwable $e) {
            return json([
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
        } finally {
            $browser?->close();
        }
    }
}