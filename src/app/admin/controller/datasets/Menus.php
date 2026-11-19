<?php

namespace app\admin\controller\datasets;

use support\Request;

class Menus
{
    public function index(Request $request)
    {
        $dataset_id = get('id');

        $ds = datastar();
        $db = db();
        $datasets = $db->table('dataset')->get();

        $html = '';
        foreach ($datasets as $dataset) {
            $id = $dataset->id;
            $count = $db->table($dataset->table)->where('dataset_id', $id)->count();
            $title = $dataset->title;
            $active = $id == $dataset_id ? ' active' : '';
            $html .= '
                <div class="sidebar-menu-item">
                    <a href="/admin/datasets?id=' . $id . '" class="sidebar-menu-button' . $active . '">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
                        <span>' . $title . '</span>
                    </a>
                    <span class="sidebar-menu-badge">' . $count . '</span>
                </div>
            ';
        }
        $ds->inner($html, '#sidebar_menu');

        $ds->close();
    }
}