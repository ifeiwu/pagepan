<?php

namespace app\admin\controller\builder;

use IvoPetkov\HTML5DOMDocument;
use support\Log;
use support\Request;
use support\Response;

class Page
{
    public function index(Request $request): Response
    {
        $page_id = $request->get('id');

        $db = db();

        // 站点信息
        $site = array_filter(
            $db->table('site')->where('state', 1)->pluck('value', 'name')->toArray()
        );
        // 页面信息
        $page = (array)$db->table('page')->where('id', $page_id)->first();

        context('site', $site);
        context('page', $page);

        return view2()->display('builder/page', [
            'page_code' => $this->getPageCode($page_id)
        ]);
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
                $node->setAttribute('data-block-id', $block->id);
                $node->setAttribute('data-block-type', $block->type);

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

                $content = $config . $content . PHP_EOL . PHP_EOL;

                // 拼接页面源代码
                $page_code .= $content . "\n\n";
            }
        } catch (\Throwable $e) {
            Log::error($e->getMessage());
            return false;
        }

        return htmlspecialchars_decode($page_code, ENT_QUOTES);
    }
}
