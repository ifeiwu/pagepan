<?php

namespace app\admin\controller;

use support\Request;

class Index
{
    public function index(Request $request)
    {
        var_export('admin');
    }
}
