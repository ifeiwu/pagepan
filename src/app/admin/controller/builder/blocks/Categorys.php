<?php

namespace app\admin\controller\builder\blocks;

use support\Request;

class Categorys
{
    public function index(Request $request): void
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
}