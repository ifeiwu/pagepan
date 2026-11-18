<?php

namespace app\admin\controller;

use support\Request;

class Datasets
{
    public function index(Request $request)
    {
        $dataset_id = get('id');
        $dataset = db()->table('dataset')->where('id', $dataset_id)->first();

        return view2()->display('dataset/index', [
            'dataset' => $dataset
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
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
                        <span>' . $title . '</span>
                    </a>
                    <span class="sidebar-menu-badge">8</span>
                </div>
            ';
        }
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
