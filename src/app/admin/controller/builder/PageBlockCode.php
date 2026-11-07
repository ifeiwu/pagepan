<?php

namespace app\admin\controller\builder;

use IvoPetkov\HTML5DOMDocument;
use support\Log;
use support\Request;
use support\Response;

/**
 * 页面内容块代码控制器。
 *
 * 将数据库中的页面内容块还原为可编辑的页面源代码。
 */
class PageBlockCode
{
    /**
     * 获取页面源代码。
     *
     * @param Request $request HTTP 请求对象
     * @return Response JSON 响应
     */
    public function index(Request $request): Response
    {
        $page_id = $request->get('page_id');
        $page_code = $this->getPageCode($page_id);

        if ($page_code === false) {
            return json_error('代码解析失败，已进入只读模式，避免修改导致内容丢失。');
        }

        return json_success('ok', $page_code);
    }

    /**
     * 将页面内容块还原为完整页面源代码。
     *
     * 逐个解析内容块 HTML，并重新添加编辑器使用的 data-block 属性。
     * PHP 代码会在 HTML 解析前替换为占位符，解析完成后再还原。
     *
     * @param int|string $page_id 页面 ID
     * @return string|false 页面源代码，解析失败时返回 false
     */
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
                    throw new \RuntimeException("内容块解析失败：{$block->block_id}");
                }

                // 添加编辑器属性
                if ($block->type) {
                    $node->setAttribute('data-block-type', $block->type);
                }

                if ($block->path) {
                    $node->setAttribute('data-block-path', $block->path);
                }

                if ($block->setting) {
                    $node->setAttribute('data-block-setting', $block->setting);
                }

                // 还原 PHP 代码
                $content = strtr($node->outerHTML, $php);

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