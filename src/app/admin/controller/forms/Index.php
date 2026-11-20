<?php

namespace app\admin\controller\forms;

use support\Request;

class Index
{
    public function index(Request $request)
    {
        $item_id = get('item_id');
        $dataset_id = get('dataset_id');

        $db = db();
        $dataset = $db->table('dataset')->where('id', $dataset_id)->first();
        $item = $db->table($dataset->table)->where('dataset_id', $dataset_id)->where('id', $item_id)->first();

        return view2()->display('forms/' . ltrim($dataset->table, 'dataset_'), [
            'dataset' => $dataset,
            'item' => $item
        ]);
    }
}