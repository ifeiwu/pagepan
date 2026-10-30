<?php

namespace app\admin\controller\repository;

use support\Request;
use support\Response;

class Index
{
    public function index(): Response
    {
        return view2()->display('repository/index');
    }

    // 显示内容块封面图片
    public function blockCover(Request $request): Response
    {
        $repo = get('repo', 'text');
        $path = get('path', 'text');
        $file_path = storage_path("repository/$repo/$path/cover.webp");

        if (!is_file($file_path)) {
            return response('Not Found', 404);
        }

        return response(file_get_contents($file_path))->withHeader('Content-Type', mime_content_type($file_path));
    }
}