<?php

namespace app\admin\controller\builder\blocks;

use app\exception\DatastarAlertException;
use support\Request;

class AddToPage
{
    public function index(Request $request): void
    {
        $ds = datastar();
        $db = db();

        $signals = $ds->getSignals();
        $repo_id = $signals['repo_id'];
        $page_id = $signals['page_id'];
        $block_id = $signals['block_id'];

        $repo_path = $db->table('git_repo')->where('id', $repo_id)->value('path');

        $block = $db->table('git_block')->where('id', $block_id)->first();
        if (!$block) {
            throw new DatastarAlertException("获取内容块失败：$block_id");
        }

        $block_path = "$repo_path/{$block->category}/{$block->name}";
        $full_path = storage_path("repository/$block_path");

        $setting = '';
        if (file_exists("$full_path/setting.php")) {
            $setting = json_encode(include "$full_path/setting.php");
        }

        $content = file_get_contents("$full_path/block.php");

        $db->table('page_block')->insert([
            'page_id' => $page_id,
            'type' => $block->type,
            'path' => $block_path,
            'setting' => $setting,
            'content' => $content
        ]);

        $ds->script('iframe.contentWindow.location.reload()');
        $ds->close();
    }
}