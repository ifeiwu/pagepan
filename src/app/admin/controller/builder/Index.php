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
        $id = $request->get('id');
        return view2()->response('builder/page');
    }

}
