<?php

namespace app\admin\controller\pages;

use support\Request;

class Index
{
    public function index(Request $request)
    {
//        var_export($request->app);
//        return view('pages/index');
        var_export($request->get('id'));
        return view2()->response('pages/index');
    }

    public function query(Request $request)
    {
        $items = db()->table('page')->get()->toArray();

        $ds = datastar();
        $lis = view2()->fetch('pages/item-li', ['items' => $items]);
        $ds->append($lis, '#pages');
        $ds->close();
    }
}
