<?php

namespace app\controller\index;

use support\annotation\route\Get;
use support\Db;
use support\Request;

class Index
{
    #[Get('/')]
    public function index(Request $request)
    {
        return view('index/view', ['name' => 'webman']);
    }

    public function view(Request $request)
    {
        return view('index/view', ['name' => 'webman']);
    }

    public function json(Request $request)
    {
        return json(['code' => 0, 'msg' => 'ok']);
    }

}
