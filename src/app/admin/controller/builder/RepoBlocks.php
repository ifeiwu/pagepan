<?php

namespace app\admin\controller\builder;

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

        $html = '';
        $repos = db()->table('git_repo')->orderByDesc('id')->get();
        foreach ($repos as $repo) {
            $html .= '<option value="' . $repo->id . '">' . $repo->path . '</option>';
        }

        $ds->inner($html, '#repo_options');

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

        $html = '';
        foreach ($categorys as $category) {
            $html .= '<div class="combobox-item">
                        <input type="radio" name="cb-block-category" value="' . $category . '" />
                        ' . $category . '
                    </div>';
        }

        $ds->inner($html, '#combobox_category_list');

        $ds->close();
    }
}