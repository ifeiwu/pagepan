<?php

namespace app\admin\controller\blocks;

use support\Request;

class Category
{
    public function list(Request $request): void
    {
        $ds = datastar();
        $db = db();

        $repo_path = $ds->getSignals('repo');

        $repo_id = $db->table('git_repo')->where('path', $repo_path)->value('id');
        $categorys = $db->table('git_block')->where(['repo_id' => $repo_id])->groupBy('category')->pluck('category')->toArray();

        $html = '';
        foreach ($categorys as $category) {
            $html .= '<option value="'.$category.'">'.$category.'</option>';
        }

        $ds->replace($html, '#category_options');
        $ds->close();
    }
}