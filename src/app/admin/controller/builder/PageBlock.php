<?php

namespace app\admin\controller\builder;

use support\Db;
use support\Request;

class PageBlock
{
    public function saveCode(Request $request)
    {
        $page_id = $request->post('page_id');
        $blocks = $request->post('blocks');

        Db::beginTransaction();
        try {
            $db = db();

            $page = $db->table('page')->where('id', '=', $page_id)->first();
            if (empty($page)) {
                return json_error('获取页面信息失败');
            }

            $db->table('page_block')->where('page_id', '=', $page_id)->delete();

            // 把页面块内容添加到数据库
            $html = $request->post('html');
            $rows = $this->getRows($page_id, $blocks);
            $db->table('page_block')->insert($rows);

            /*// 保存代码到文件
            $page_type = $page->type;
            $page_alias = $page->alias;
            if (empty($page_alias) && $page_type == 'home') {
                $page_alias = 'index';
            }
            $file = app_path("view/page/{$page_alias}.php");
            $file_html = implode('', array_column($rows, 'content'));
            if (file_put_contents($file, $file_html) === false) {
                Db::rollBack();
                return json_error('保存页面文件失败');
            }*/

            Db::commit();
            return json_success();
        } catch (\Throwable $ex) {
            Db::rollBack();
            return json_error($ex->getMessage());
        }
    }

    public function getRows($page_id, $blocks)
    {
        $rows = [];

        foreach ($blocks as $block) {
            $type = $block['type'];
            $path = $block['path'];
            $setting = $block['setting'];
            $content = $block['content'];

            if ($type && $path) {
                $block_file = storage_path("blocks/$path/code.php");
                if (is_file($block_file)) {
                    $content = file_get_contents($block_file);
                }
                ob_start();
                eval('?>' . $setting);
                $setting = ob_get_clean();
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
                $block_file = storage_path("blocks/$path/code.php");
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