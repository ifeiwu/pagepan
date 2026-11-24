<?php

namespace app\admin\controller\forms;

use support\Request;
use support\Response;

class Index
{
    public function index(Request $request): Response
    {
        $item_id = get('item_id');
        $dataset_id = get('dataset_id');

        $db = db();
        $dataset = $db->table('dataset')->where('id', $dataset_id)->first();
        $item = $db->table($dataset->table)->where('dataset_id', $dataset_id)->where('id', $item_id)->first();

        $view = view2();
        $view->assign([
            'dataset' => $dataset,
            'item' => $item
        ]);

        return $view->display('forms/' . ltrim($dataset->table, 'dataset_'));
    }
}