<?php

namespace app\admin\controller\builder;

use support\FileSystem;
use support\Request;
use support\Response;
use Workerman\Timer;

class Page
{
    // 保存代码到文件
    public function publish(Request $request): Response
    {
        $db = db();

        $page_id = $request->post('page_id');
        $page = $db->table('page')->where('id', '=', $page_id)->first();
        if (empty($page)) {
            return json_error('获取页面信息失败');
        }

        $page_path = $page->path;
        if (empty($page_path) && $page->type == 'home') {
            $page_path = 'index';
        }

        $blocks = $db->table('page_block')->where('page_id', '=', $page_id)->get()->toArray();
        $content = implode('', array_column($blocks, 'content'));
        $content = preg_replace('/\s+data-block-(?:id|type|path|setting)="[^"]*"/', '', $content);
        // 删除测试内容块
        $content = preg_replace('/<!-- delete-test-block:start -->.*?<!-- delete-test-block:end -->\s*/s', '', $content);
        $content = preg_replace('/<delete-test-block\b[^>]*>.*?<\/delete-test-block>/s', '', $content);

        // 内容块写入文件
        $file = app_path("view/page/{$page_path}.phtml");
        if (FileSystem::rmkdir($file)) {
            $content = htmlspecialchars_decode($content, ENT_QUOTES);
            if (file_put_contents($file, $content) === false) {
                return json_error('保存页面文件失败');
            }
        } else {
            return json_error("创建目录失败：$page_path");
        }

        // 页面截图
        $host = $request->header('x-forwarded-proto') . '://' . $request->host();
        run_script('screenshot.php', $host, $page_path);

        $this->buildBlock();

        return json_success('ok');
    }

    private function buildBlock(): void
    {
        Timer::sleep(3);

        $block_code = file_get_contents(app_path("view/page/index.phtml"));
        $webp_code = file_get_contents(storage_path("page/screenshot/index.webp"));

        $http = new \Workerman\Http\Client();
        $response = $http->post('https://www.test/pagepan-blocks/build.php', [
            'path' => 'work/001',
            'block_code' => $block_code,
            'webp_code' => $webp_code,
        ]);

        echo $response->getBody();
    }
}