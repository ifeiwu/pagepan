<?php

namespace app\controller\admin\pages;

use app\middleware\AuthCheck;
use support\annotation\Middleware;
use support\annotation\route\Get;
use support\Request;

class Edit
{
    public function index(Request $request)
    {
        $id = $request->get('id');
        return view2()->response('admin/pages/edit', [
            'id' => $id,
//            'item' => $item,
        ]);
    }

    public function dialog(Request $request)
    {
        $id = $request->get('id');
        $ds = datastar();

        $html = view2()->fetch('/admin/pages/edit-dialog', [
            'id' => $id,
            'title' => ''
        ]);
        $ds->replace($html);

        $ds->script('EditDialog.show()');

        return $ds->close();
    }
}
