<?php

namespace app\admin\controller\builder;

use support\Request;
use support\Response;

class Edit
{
    public function index(Request $request): Response
    {
        $page_id = get('page_id', 'int');

        $db = db();
        $page = $db->table('page')->where('id', $page_id)->first();
        $domain = $db->table('site')->where('name', 'domain')->value('value');

        return view2()->display('builder/edit', [
            'domain' => $domain,
            'page' => $page,
            'page_url' => "{$domain}{$page->path}"
        ]);
    }
}