<?php

namespace app\admin\controller\builder;

use IvoPetkov\HTML5DOMDocument;
use support\Db;
use support\Request;

class PageBlock
{
    public function pageCode(Request $request)
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
                $node->setAttribute('data-block-id', $block->block_id);
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

    public function save(Request $request)
    {
        Db::beginTransaction();
        try {
            $db = db();

            $page_id = $request->post('page_id');
            $page = $db->table('page')->where('id', '=', $page_id)->first();
            if (empty($page)) {
                return json_error('获取页面信息失败');
            }

            // 把页面块内容重新添加到数据库
            $blocks = $request->post('blocks');
            $rows = $this->getRows($page_id, $blocks);
            $db->table('page_block')->where('page_id', '=', $page_id)->delete();
            if ($db->table('page_block')->insert($rows)) {
                Db::commit();
            }

            // 有新内容块增加，前端代码编辑器（monaco）需要更新内容
            $page_code = '';
            foreach ($blocks as $block) {
                if (!$block['id']) {
                    $page_code = $this->getPageCode($page_id);
                    break;
                }
            }

            return json_success('ok', $page_code);
        } catch (\Throwable $ex) {
            Db::rollBack();
            return json_error($ex->getMessage());
        }
    }

    public function getRows($page_id, $blocks)
    {
        $rows = [];

        foreach ($blocks as $i => $block) {
            $id = $block['id'] ?: "p{$page_id}b" . ++$i;
            $type = $block['type'] ?? '';
            $path = $block['path'] ?? '';
            $setting = $block['setting'] ?? '';
            $content = $block['content'] ?? '';

            // 包含 PHP 代码
            if (str_contains($content, '<?php') || str_contains($content, '<?=')) {
                $type = $type ?: 'php';
            }

            if ($path) {
                $block_file = storage_path("repository/ifeiwu/pagepan-blocks/$path/block.php");
                if (is_file($block_file)) {
                    $content = file_get_contents($block_file);
                    var_dump($content);
                }
            }

            $variables = '';
            if ($setting) {
                $variables = '<?php' . PHP_EOL;
                $config = [
                    'id' => $id,
                    'type' => $type,
                    'path' => $path,
                    'setting' => json_decode($setting, true),
                ];
                $variables .= '$config = ' . var_export($config, true) . ';?>' . PHP_EOL;
            }

            $content = $variables . $content . PHP_EOL . PHP_EOL;

            $row = [
                'block_id' => $id,
                'page_id' => $page_id,
                'sort' => $i,
                'type' => $type,
                'path' => $path,
                'setting' => $setting,
                'content' => $content,
            ];

            $rows[] = $row;
        }

        return $rows;
    }

    /*public function getRows($page_id, $html)
    {
        $php = [];
        $html = preg_replace_callback('/<\?(?:php|=)[\s\S]*?\?>/', function ($matches) use (&$php) {
            $key = 'PHPPLACEHOLDER' . count($php) . 'TOKEN';
            $php[$key] = $matches[0];
            return $key;
        }, $html);

        $dom = new \IvoPetkov\HTML5DOMDocument();
        $dom->loadHTML("<!DOCTYPE html><html><body>{$html}</body></html>");
        $nodes = $dom->querySelectorAll('body>*');

        $rows = [];
        foreach ($nodes as $node) {
            $content = strtr($node->outerHTML, $php);
            $type = $node->getAttribute('data-block-type');
            $path = $node->getAttribute('data-block-path');
            $setting = $node->getAttribute('data-block-setting');

            if ($type && $path) {
                $block_file = storage_path("repository/$path/code.php");
                if (is_file($block_file)) {
                    $content = file_get_contents($block_file);
                }
            }

            $rows[] = [
                'page_id' => $page_id,
                'type' => $type,
                'path' => $path,
                'setting' => $setting,
                'content' => $content,
            ];
        }

        return $rows;
    }*/

    /*public function saveCode(Request $request)
    {
        $page_id = $request->post('page_id');
        $config = $request->post('config');
        $content = $request->post('content');
        $setting = $request->post('setting', '');

        Db::beginTransaction();
        try {
            $db = db();
            $page = $db->table('page')->find($page_id);
            if (empty($page)) {
                return json_error('获取页面信息失败');
            }

            $db->table('page_block')->delete($config['id']);
            $db->table('page_block')->insert([
                'id' => $config['id'],
                'page_id' => $page_id,
                'content' => $content,
                'setting' => $setting
            ]);

            $alias = $page['alias'];
            if (file_put_contents(app_path("view/page/$alias"), ) === false   ) {

            }

            Db::commit();

            return json_success();
        } catch (\Throwable $ex) {
            Db::rollBack();

            return json_error($ex->getMessage());
        }
    }*/
}