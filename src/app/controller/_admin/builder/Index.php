<?php

namespace app\controller\admin\builder;

use support\Db;
use support\Request;

class Index
{
    public function index(Request $request)
    {
        return view2()->response('admin/pages/index');
    }

    public function page(Request $request)
    {
        $id = $request->get('id');
        return view2()->response('admin/builder/page');
    }

}
