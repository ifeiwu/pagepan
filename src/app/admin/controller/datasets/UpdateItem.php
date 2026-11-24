<?php

namespace app\admin\controller\datasets;

use support\Request;

class UpdateItem
{
    public function index(Request $request): void
    {
        $ds = datastar();
        $db = db();
        $id = get('id', 'int');
        $table = get('table', 'text');

        $item = $db->table($table)->where('id', $id)->first();

        $html = view2()->render('datasets/items', [
            'items' => [$item]
        ]);

        $ds->replace($html, "#item-$id");

        $ds->close();
    }
}