<?php

namespace app\admin\controller\repository;

use support\Response;

class Index
{
    public function index(): Response
    {
        return view2()->display('repository/index');
    }
}