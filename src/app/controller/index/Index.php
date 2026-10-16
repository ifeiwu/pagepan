<?php

namespace app\controller\index;

use support\annotation\route\Get;
use support\Db;
use support\Request;

class Index
{
//    #[Get('/[{alias:\w+}]')]
    public function index(Request $request)
    {
        var_export('index');
//        return view('index/view', ['name' => 'webman']);
    }

    public function index2(Request $request, $alias)
    {
        return view('index/view', ['name' => 'webman']);
    }

    /*public function view(Request $request)
    {
        return view('index/view', ['name' => 'webman']);
    }

    public function json(Request $request)
    {
        return json(['code' => 0, 'msg' => 'ok']);
    }*/

}
