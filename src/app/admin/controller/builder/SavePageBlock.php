<?php

namespace app\admin\controller\builder;

use IvoPetkov\HTML5DOMDocument;
use JsonException;
use support\Request;
use support\Response;

/**
 * 页面内容块保存控制器。
 *
 * 将页面 HTML 内容解析为独立的内容块，并保存到数据库。
 */
class SavePageBlock
{
    /**
     * 保存页面内容块。
     *
     * @param Request $request HTTP 请求对象
     * @return Response JSON 响应
     */
    public function index(Request $request): Response
    {
        $db = db();
        $page_id = $request->post('page_id');

        $page = $db->table('page')->where('id', '=', $page_id)->first();
        if (empty($page)) {
            return json_error('获取页面信息失败');
        }

        try {
            $db->transaction(function () use ($db, $request, $page_id) {
                $content = $request->post('content', '');
                $rows = $this->getRows2($page_id, $content);

                $db->table('page_block')->where('page_id', '=', $page_id)->delete();

                if ($rows && !$db->table('page_block')->insert($rows)) {
                    throw new \RuntimeException('保存页面内容块失败');
                }
            });

            return json_success('ok');
        } catch (\Throwable $ex) {
            return json_error($ex->getMessage());
        }
    }

    /**
     * 将页面 HTML 内容解析为内容块数据。
     *
     * 只解析 body 下的一级元素，并提取内容块配置。
     * PHP 代码会在 HTML 解析前替换为占位符，解析完成后再还原。
     *
     * @param int|string $page_id 页面 ID
     * @param string $content 页面 HTML 内容
     * @return array
     * @throws JsonException
     */
    public function getRows2(int|string $page_id, string $content): array
    {
        $php = [];

        // 保护 PHP 代码，避免 HTML 解析器破坏 PHP 语法
        $content = preg_replace_callback('/<\?(?:php|=)[\s\S]*?\?>/i', function ($matches) use (&$php) {
            $key = '__PHP_BLOCK_' . count($php) . '__';
            $php[$key] = $matches[0];

            return $key;
        }, $content);

        $dom = new HTML5DOMDocument();
        $dom->loadHTML("<!DOCTYPE html><html><body>{$content}</body></html>", HTML5DOMDocument::ALLOW_DUPLICATE_IDS);

        $rows = [];
        $nodes = $dom->querySelectorAll('body>*');

        foreach ($nodes as $index => $node) {
            $sort = $index + 1;
            $path = $node->getAttribute('data-block-path') ?? '';
            $setting = $node->getAttribute('data-block-setting') ?? '';

            // 移除编辑器专用属性
            $node->removeAttribute('data-block-type');
            $node->removeAttribute('data-block-path');
            $node->removeAttribute('data-block-setting');

            // 还原 PHP 代码
            $html = strtr($node->outerHTML, $php);
            $html = htmlspecialchars_decode($html, ENT_QUOTES);

            // 判断内容块类型
            $type = '';
            if (str_contains($html, '<?php') || str_contains($html, '<?=')) {
                $type = 'php';
            }

            // 生成内容块配置
            $variables = '';
            if ($setting !== '') {
                $config = [
                    'type' => $type,
                    'path' => $path,
                    'setting' => json_decode($setting, true, 512, JSON_THROW_ON_ERROR),
                ];

                $variables = '<?php' . PHP_EOL;
                $variables .= '$config = ' . var_export($config, true) . ';?>' . PHP_EOL;
            }

            $html = $variables . $html . PHP_EOL . PHP_EOL;

            $rows[] = [
                'block_id' => "p{$page_id}b{$sort}",
                'page_id' => $page_id,
                'sort' => $sort,
                'type' => $type,
                'path' => $path,
                'setting' => $setting,
                'content' => $html,
            ];
        }

        return $rows;
    }
}