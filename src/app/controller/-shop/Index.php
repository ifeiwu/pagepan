<?php

namespace app\controller\shop;

use support\annotation\route\Get;
use support\Db;
use support\Request;

class Index
{
    #[Get('/shop')]
    public function index(Request $request)
    {
//        var_export(view2());
        return view2()->response('shop/index');
    }

}
