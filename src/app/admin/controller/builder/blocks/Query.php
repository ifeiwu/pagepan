<?php

namespace app\admin\controller\builder\blocks;

use support\Request;

class Query
{
    public function index(Request $request): void
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

        $items = $db_block->get();var_dump($items);
        if (empty($items)) {
            $ds->signals(['pagenum' => 1, 'loadmore' => false]);
        } else {
            $ds->signals(['pagenum' => ++$pagenum, 'loadmore' => count($items) == $perpage]);
            $html = view2()->render('builder/blocks/item-li', ['items' => $items, 'repo_path' => $repo_path]);

            $ds->append($html, '#items');
        }

        $ds->close();
    }
}