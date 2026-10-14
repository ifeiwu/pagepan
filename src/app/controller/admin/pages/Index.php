<?php

namespace app\controller\admin\pages;

use support\Request;

class Index
{
    public function index(Request $request)
    {
        return view2()->response('admin/pages/index');
    }

    public function query(Request $request)
    {
        $items = db()->table('page')->get()->toArray();

        $ds = datastar();
        $lis = view2()->fetch('admin/pages/item-li', ['items' => $items]);
        $ds->append($lis, '#pages');
        $ds->close();
    }
}
