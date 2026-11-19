<?php

namespace app\admin\controller\datasets;

use support\Request;

class ItemEdit
{
    public function index(Request $request): void
    {
        $ds = datastar();
//        $id = get('id');
//        if ($id) {
//        }

        $html = view2()->display('datasets/item-edit', [
            'item' => $item ?? []
        ]);
//        $ds->element($html);
//        $ds->script('sp.dialog(document.querySelector("#ItemEditDialog")).show()');

        $ds->close();
    }
}