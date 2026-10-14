<?php

namespace app\controller\admin;

use support\annotation\route\Get;
use support\Db;
use support\Request;

class Dashboard
{
    public function index(Request $request)
    {
        return view2()->response('admin/dashboard/index');
    }

}
