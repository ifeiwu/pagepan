<?php

namespace app\admin\controller\repository;

use support\Request;

class BlockCategorys
{
    public function index(Request $request): void
    {
        $ds = datastar();
        $db = db();

        $repo_id = $ds->getSignals('repo_id');
        $categorys = $db->table('git_block')->where(['repo_id' => $repo_id])->groupBy('category')->pluck('category')->toArray();

        $html = '';
        foreach ($categorys as $category) {
            $html .= '<option value="' . $category . '">' . $category . '</option>';
        }

        $ds->inner($html, '#category_options');
        $ds->close();
    }
}