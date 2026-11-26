<?php

namespace app\admin\controller\datasets;

use support\Request;

class ItemCategorys
{
    public function index(Request $request): void
    {
        $ds = datastar();

        $html = view2()->display('datasets/item-categorys', [
            'item' => $item ?? []
        ]);
        $ds->element($html);
        $ds->script('sp.dialog(document.querySelector("#ItemCategoryDialog")).show()');

        $ds->close();
    }
}