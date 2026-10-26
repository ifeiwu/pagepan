<?php

namespace app\admin\controller\builder;

use IvoPetkov\HTML5DOMDocument;
use support\Request;
use support\Response;

class PageBlockCode
{
    public function index(Request $request): Response
    {
        $page_id = $request->get('page_id');
        $page_code = $this->getPageCode($page_id);

        if ($page_code === false) {
            return json_error('代码解析失败，已进入只读模式，避免修改导致内容丢失。');
        }

        return json_success('ok', $page_code);
    }

    private function getPageCode($page_id): bool|string
    {
        $blocks = db()->table('page_block')->where('page_id', $page_id)->orderBy('sort')->get();
        $page_code = '';
        try {
            $dom = new HTML5DOMDocument();
            foreach ($blocks as $block) {
                $content = $block->content;

                // 保护 PHP 代码，避免注释
                $php = [];
                $content = preg_replace_callback('/<\?(?:php|=)[\s\S]*?\?>/', function ($matches) use (&$php) {
                    $key = 'PHP_BLOCK_' . count($php) . '_TOKEN';
                    $php[$key] = $matches[0];
                    return $key;
                }, $content);

                // 内容块添加属性
                $dom->loadHTML("<!DOCTYPE html><html><body>{$content}</body></html>", HTML5DOMDocument::ALLOW_DUPLICATE_IDS);
                $node = $dom->querySelector('body>*');
//                $node->setAttribute('data-block-id', $block->block_id);
                $block->type && $node->setAttribute('data-block-type', $block->type);
                $block->path && $node->setAttribute('data-block-path', $block->path);
                $block->setting && $node->setAttribute('data-block-setting', $block->setting);

                // 还原 PHP 代码
                $content = strtr($node->outerHTML, $php);

                // 拼接页面源代码
                $page_code .= $content . "\n\n";
            }
        } catch (\Exception $e) {
            print(PHP_EOL . $e->getMessage() . PHP_EOL);
            return false;
        }

        return $page_code;
    }
}