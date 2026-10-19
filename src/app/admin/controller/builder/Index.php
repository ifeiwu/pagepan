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

    public function dialog(Request $request)
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

    public function edit(Request $request)
    {
        $id = $request->get('id');
        return view2()->response('builder/edit', [
            'id' => $id,
        ]);
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
