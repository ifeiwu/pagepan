<?php

namespace app\admin\controller\datasets;

use support\Request;

class Index
{
    public function index(Request $request)
    {
        $dataset_id = get('id');
        if ($dataset_id) {
            $dataset = db()->table('dataset')->where('id', $dataset_id)->first();
        } else {
            $dataset = db()->table('dataset')->first();
        }

        return view2()->display('datasets/index', [
            'dataset' => $dataset
        ]);
    }
}