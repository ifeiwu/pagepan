<?php

namespace app\admin\controller\builder\blocks;

use support\Request;

class Repositories
{
    public function index(Request $request): void
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
}