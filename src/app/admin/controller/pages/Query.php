<?php

namespace app\admin\controller\pages;

use support\Request;

class Query
{
    public function index(Request $request): void
    {
        $items = db()->table('page')
            ->orderByRaw("INSTR(',guide,home,dataset,inside,graphic,pro,layout,404,', ',' || type || ',')")
            ->orderBy('id', 'desc')
            ->get();

        $ds = datastar();
        $html = view2()->render('pages/item-li', [
            'items' => $items
        ]);
        $ds->append($html, '#pages');
        $ds->close();
    }
}