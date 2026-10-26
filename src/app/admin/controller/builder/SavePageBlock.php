<?php

namespace app\admin\controller\builder;

use support\Db;
use support\Request;
use support\Response;

class SavePageBlock
{
    public function index(Request $request): Response
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
            /*foreach ($blocks as $block) {
                if (!$block['id']) {
                    $page_code = $this->getPageCode($page_id);
                    break;
                }
            }*/

            return json_success('ok', $page_code);
        } catch (\Throwable $ex) {
            Db::rollBack();
            return json_error($ex->getMessage());
        }
    }

    public function getRows($page_id, $blocks): array
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

//            if ($path) {
//                $block_file = storage_path("repository/{$setting['repo.path']}/$path/block.php");
//                if (is_file($block_file)) {
//                    $content = file_get_contents($block_file);
//                }
//            }

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
}