<?php

namespace app\controller\admin\builder;

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

            $html = '';
            foreach ($blocks as $block) {
                $content = $block['content'];
                $db->table('page_block')->delete($block['id']);
                $db->table('page_block')->insert([
                    'id' => $block['id'],
                    'page_id' => $page_id,
                    'content' => $content,
                    'setting' => $block['setting']
                ]);
                $html .= $content;
            }

            $page_type = $page->type;
            $page_alias = $page->alias;
            if (empty($page_alias) && $page_type == 'home') {
                $page_alias = 'index';
            }
            $file = app_path("view/page/{$page_alias}.php");
            var_export($file);
            if (file_put_contents($file, $html) === false) {
                Db::rollBack();
                return json_error('保存页面文件失败');
            }

            Db::commit();

            return json_success();
        } catch (\Throwable $ex) {
            Db::rollBack();

            return json_error($ex->getMessage());
        }
    }

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