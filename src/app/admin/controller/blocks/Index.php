<?php

namespace app\admin\controller\blocks;

use app\exception\DatastarAlertException;
use CzProject\GitPhp\Git;
use support\Db;
use support\Request;
use support\Response;

class Index
{
    public function modal(Request $request): void
    {
        $repos = db()->table('git_repo')->get();

        $html = view2()->fetch('blocks/modal', [
            'repos' => $repos
        ]);

        $ds = datastar();
        $ds->replace($html);
        $ds->script('BlocksModal.show()');
        $ds->close();
    }

    public function image(Request $request): Response
    {
        $repo = get('repo', 'text');
        $path = get('path', 'text');
        $file_path = storage_path("blocks/$repo/$path/cover.webp");

        if (!is_file($file_path)) {
            return response('Not Found', 404);
        }

        return response(file_get_contents($file_path))->withHeader('Content-Type', mime_content_type($file_path));
    }
}