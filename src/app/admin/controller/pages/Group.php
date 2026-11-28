<?php

namespace app\admin\controller\pages;

use support\Request;

class Group
{
    public function dialog(Request $request): void
    {
        $ds = datastar();
        $db = db();

        $items = $db->table('page_group')->orderBy('sort', 'desc')->get();

        $html = view2()->render('pages/group/dialog', [
            'items' => $items,
        ]);

        $ds->element($html);
        $ds->script('sp.dialog(document.querySelector("#PageGroupDialog")).show()');
        $ds->close();
    }

    public function select(Request $request): void
    {
        $ds = datastar();
        $db = db();

        $items = $db->table('page_group')->orderBy('sort', 'desc')->get();

        $html = view2()->render('pages/group/select', [
            'items' => $items,
        ]);

        $ds->element($html);
        $ds->close();
    }
}