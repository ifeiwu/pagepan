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
        $dataset_id = get('id');

        $ds = datastar();
        $items = db()->table('dataset')->get();

        $html = '';
        foreach ($items as $item) {
            $id = $item->id;
            $title = $item->title;
            $active = $id == $dataset_id ? ' active' : '';
            $html .= '
                <div class="sidebar-menu-item">
                    <a href="/admin/datasets?id=' . $id . '" class="sidebar-menu-button' . $active . '">
                        <span>' . $title . '</span>
                    </a>
                    <span class="sidebar-menu-badge">8</span>
                </div>
            ';
        }
//        $lis = view2()->render('datasets/menu-li', ['dataset_id' => $id, 'items' => $items]);
        $ds->inner($html, '#sidebar_menu');

        $ds->close();
    }

    public function query(Request $request): void
    {
        $id = get('id');
        $ds = datastar();

        if ($id) {
            $db = db();
            $dataset = $db->table('dataset')->where('id', $id)->first();
            $items = $db->table($dataset->table)->orderByDesc('sort')->orderByDesc('created')->get()->toArray();
            $html = view2()->render('datasets/items', ['items' => $items]);
            $ds->inner($html, '#items');


        }

        $ds->close();
    }
}
