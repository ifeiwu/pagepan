<?php

namespace app\admin\controller\builder;

use app\exception\DatastarAlertException;
use app\exception\DatastarToastException;
use support\Request;

class RepoBlocks
{
    public function openDrawer(Request $request): void
    {
        $html = view2()->render('builder/repo-blocks/open-drawer');

        $ds = datastar();
        $ds->replace($html);
        $ds->script('sp.drawer(document.querySelector("#drawer_repo_blocks")).show();');
        $ds->close();
    }

    public function repositories(Request $request): void
    {
        $ds = datastar();
        $repo_id = $ds->getSignals('repo_id');

        $repos = db()->table('git_repo')->orderByDesc('id')->get();

        $html = '<optgroup label="内容块仓库">';
        foreach ($repos as $repo) {
            $html .= '<option value="' . $repo->id . '">' . $repo->path . '</option>';
        }
        $html .= '</optgroup>';

        $ds->inner($html, '[name="repo_id"]');

        if ($repos->isNotEmpty()) {
            $ds->signals(['repo_id' => $repo_id ?: $repos[0]->id]);
            $ds->event('change', [], '[name="repo_id"]');
        }

        $ds->close();
    }

    public function categorys(Request $request): void
    {
        $ds = datastar();
        $db = db();

        $repo_id = $ds->getSignals('repo_id');
        $categorys = $db->table('git_block')->where(['repo_id' => $repo_id])->groupBy('category')->pluck('category')->toArray();

        $html = '<option value="">全部分类</option>';
        foreach ($categorys as $category) {
            $html .= '<option value="' . $category . '">' . $category . '</option>';
        }

        $ds->inner($html, '[name="category"]');

        $ds->close();
    }

    public function query(Request $request): void
    {
        $ds = datastar();
        $db = db();

        $perpage = 20;
        $pagenum = post('pagenum', 'int', 1);
        $pagenum = $pagenum > 0 ? $pagenum : 1;
        $repo_id = post('repo_id', 'int');

        $repo_path = $db->table('git_repo')->where('id', $repo_id)->value('path');
        $db_block = $db->table('git_block')->where('repo_id', $repo_id)->limit($perpage)->offset($perpage * ($pagenum - 1))->orderByDesc('updated');

        // 关键字搜索
        $kword = filter(post('kword'), 'keyword');
        if ($kword) {
            $db_block->where(function ($query) use ($kword) {
                $query->orWhere('name', 'like', '%' . $kword . '%');
                $query->orWhere('keywords', 'like', '%' . $kword . '%');
                $query->orWhere('description', 'like', '%' . $kword . '%');
            });
        }

        $category = post('category');
        if ($category) {
            $db_block->where('category', $category);
        }

        $items = $db_block->get();
        if (empty($items)) {
            $ds->signals(['pagenum' => 1, 'loadmore' => false]);
        } else {
            $ds->signals(['pagenum' => ++$pagenum, 'loadmore' => count($items) == $perpage]);
            $html = view2()->render('builder/repo-blocks/item-li', ['items' => $items, 'repo_path' => $repo_path]);
            $ds->append($html, '#items');
        }

        $ds->close();
    }

    public function addtoPage(Request $request): void
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

    }
}