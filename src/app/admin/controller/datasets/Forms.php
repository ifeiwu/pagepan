<?php

namespace app\admin\controller\datasets;

use support\Request;

class Forms
{
    public function index(Request $request)
    {
        $dataset_id = get('id');
        $dataset = db()->table('dataset')->where('id', $dataset_id)->first();

        return view2()->display('datasets/forms/' . ltrim($dataset->table, 'dataset_'), [
            'dataset' => $dataset
        ]);
    }
}