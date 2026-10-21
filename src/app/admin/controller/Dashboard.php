<?php

namespace app\admin\controller;

use support\annotation\route\Get;
use support\Db;
use support\Request;

class Dashboard
{
    public function index(Request $request)
    {
        return view2()->display('admin/dashboard/index');
    }

}
