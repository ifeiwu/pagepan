<?php

namespace app\admin\controller\builder;

use support\Db;
use support\Request;

class Index
{
    public function index(Request $request)
    {
        return view2()->response('pages/index');
    }

    public function page(Request $request)
    {
        $page_id = $request->get('id');
        $blocks = db()->table('page_block')->where('page_id', $page_id)->get();

        return view2()->response('builder/page', [
            'title' => '首页',
            'blocks' => $blocks
        ]);
    }

}
