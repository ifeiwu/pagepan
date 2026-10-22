<?php

namespace app\admin\controller\builder;

use support\Db;
use support\Request;
use support\Response;

class Index
{
    public function index(Request $request): Response
    {
        return view2()->display('pages/index');
    }

    public function dialog(Request $request): void
    {
        $id = $request->get('id');
        $ds = datastar();

        $html = view2()->fetch('builder/dialog', [
            'id' => $id,
            'title' => ''
        ]);
        $ds->replace($html);
        $ds->script('BuilderDialog.show()');

        $ds->close();
    }

    public function edit(Request $request): Response
    {
        $id = $request->get('id');
        return view2()->display('builder/edit', [
            'id' => $id,
        ]);
    }

    public function page(Request $request): Response
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
