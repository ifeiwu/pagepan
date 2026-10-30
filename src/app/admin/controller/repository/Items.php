<?php

namespace app\admin\controller\repository;

use support\Request;

class Items
{
    public function index(Request $request): void
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
}