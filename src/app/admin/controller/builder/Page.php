<?php

namespace app\admin\controller\builder;

use support\Request;
use support\Response;

class Page
{
    public function index(Request $request): Response
    {
        $page_id = $request->get('id');

        $db = db();

        // 站点信息
        $site_list = $db->table('site')->where('state', 1)->get();
        $site = [];
        foreach ($site_list as $obj) {
            $value = $obj->value;
            if ($value) {
                $site[$obj->name] = $value;
            }
        }

        $page = $db->table('page')->where('id', $page_id)->first();
        $blocks = $db->table('page_block')->where('page_id', $page_id)->get();

        return view2()->display('builder/page', [
            'site' => $site,
            'page' => $page,
            'blocks' => $blocks
        ]);
    }
}