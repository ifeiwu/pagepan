<?php

namespace app\shop\controller;

use support\annotation\route\Get;
use support\Db;
use support\Request;

class Index
{
    public function index(Request $request)
    {
        var_export($request->app);
//        return view2()->response('shop/index');
    }

}
