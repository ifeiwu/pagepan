<?php

namespace app\admin\controller;

use support\Request;

class Datasets
{
    public function index(Request $request)
    {
        return view2()->display('datasets/index', [
            'id' => $request->get('id')
        ]);
    }

    public function menus(Request $request)
    {
        $id = $request->get('id');

        $ds = datastar();
        $items = db()->table('dataset')->get()->toArray();
        $lis = view2()->fetch('datasets/menu-li', ['id' => $id, 'items' => $items]);
        $ds->inner($lis, '#menus');

        $ds->close();
    }

    public function query(Request $request)
    {
        $id = $request->get('id');
        $ds = datastar();
        $signals = $ds->getSignals();

        if ($id) {
            $dataset = db()->table('dataset')->where("id", '=', $id)->first();
            $items = db()->table("item_$id")->orderByDesc('sortby')->orderByDesc('ctime')->get()->toArray();
            $lis = view2()->fetch('datasets/items', ['items' => $items]);
            $ds->append($lis, '#items');
        }

        $ds->close();
    }
}
