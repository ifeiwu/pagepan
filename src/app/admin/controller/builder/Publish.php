<?php

namespace app\admin\controller\builder;

use IvoPetkov\HTML5DOMDocument;
use support\FileSystem;
use support\Log;
use support\Request;
use support\Response;
use Workerman\Timer;

class Publish
{
    // 保存代码到文件
    public function index(Request $request): Response
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

//        $blocks = $db->table('page_block')->where('page_id', '=', $page_id)->get()->toArray();
//        $content = implode('', array_column($blocks, 'content'));
//        // 删除内容块属性
//        $content = preg_replace('/\s+data-block-(?:type|path|setting)="[^"]*"/', '', $content);
//        // 删除测试内容块
//        $content = preg_replace('/<!-- delete-test-block:start -->.*?<!-- delete-test-block:end -->\s*/s', '', $content);
//        $content = preg_replace('/<delete-test-block\b[^>]*>.*?<\/delete-test-block>/s', '', $content);

        $page_code = $this->getPageCode($page_id);

        // 内容块写入文件
        $file = app_path("view/page/{$page_path}.phtml");
        if (FileSystem::rmkdir($file)) {
//            $content = htmlspecialchars_decode($content, ENT_QUOTES);
            if (file_put_contents($file, $page_code) === false) {
                return json_error('保存页面文件失败');
            }
        } else {
            return json_error("创建目录失败：$page_path");
        }

        // 页面截图
        $host = $request->header('x-forwarded-proto') . '://' . $request->host();
        run_script('screenshot.php', $host, $page_path);

        $screenshot_file = storage_path("page/screenshot/{$page_path}.webp");
        $done_file = $screenshot_file . '.done';

        @unlink($done_file);

        return json_success('ok');
    }

    private function getPageCode(int|string $page_id): bool|string
    {
        $blocks = db()->table('page_block')->where('page_id', '=', $page_id)->orderBy('sort')->get();
        $page_code = '';

        try {
            $dom = new HTML5DOMDocument();

            foreach ($blocks as $block) {
                $content = $block->content;

                // 保护 PHP 代码，避免 HTML 解析器破坏 PHP 语法
                $php = [];
                $content = preg_replace_callback('/<\?(?:php|=)[\s\S]*?\?>/i', function ($matches) use (&$php) {
                    $key = '__PHP_BLOCK_' . count($php) . '__';
                    $php[$key] = $matches[0];

                    return $key;
                }, $content);

                // 解析内容块 HTML
                $dom->loadHTML("<!DOCTYPE html><html><body>{$content}</body></html>", HTML5DOMDocument::ALLOW_DUPLICATE_IDS);
                $node = $dom->querySelector('body>*');

                if (!$node) {
                    throw new \RuntimeException("内容块解析失败：{$block->id}");
                }

                // 添加编辑器属性
                if ($block->id) {
                    $node->setAttribute('data-block', '');
                }

                // 还原 PHP 代码
                $content = strtr($node->outerHTML, $php);

                // 生成内容块配置
                $config = '';
                if ($block->setting !== '') {
                    $conf = [
                        'type' => $block->type,
                        'path' => $block->path,
                        'setting' => json_decode($block->setting, true, 512, JSON_THROW_ON_ERROR),
                    ];

                    $config = '<?php' . PHP_EOL;
                    $config .= '$config = ' . var_export($conf, true) . ';?>' . PHP_EOL;
                }

                // 拼接页面源代码
                $page_code .= $config . $content . PHP_EOL;
            }
        } catch (\Throwable $e) {
            Log::error($e->getMessage());
            return false;
        }

        return htmlspecialchars_decode($page_code, ENT_QUOTES);
    }
}
