<?php

namespace app\admin\controller\builder;

use support\Request;

class Page
{
    // 保存代码到文件
    public function publish(Request $request)
    {
        $db = db();

        $page_id = $request->post('page_id');
        $page = $db->table('page')->where('id', '=', $page_id)->first();
        if (empty($page)) {
            return json_error('获取页面信息失败');
        }

        $blocks = $db->table('page_block')->where('page_id', '=', $page_id)->get()->toArray();

        $page_alias = $page->alias;
        if (empty($page_alias) && $page->type == 'home') {
            $page_alias = 'index';
        }

        $content = implode('', array_column($blocks, 'content'));
        $content = preg_replace('/\s+data-block-(?:setting|type|path)="[^"]*"/', '', $content);
        // 删除测试内容块
        $content = preg_replace('/<!-- delete-test-block:start -->.*?<!-- delete-test-block:end -->\s*/s', '', $content);
        $content = preg_replace('/<delete-test-block\b[^>]*>.*?<\/delete-test-block>/s', '', $content);

        $file = app_path("view/page/{$page_alias}.php");
        if (file_put_contents($file, $content) === false) {
            return json_error('保存页面文件失败');
        }

        return json_success('ok');
    }
}