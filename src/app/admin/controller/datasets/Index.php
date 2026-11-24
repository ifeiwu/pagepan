<?php

namespace app\admin\controller\datasets;

use support\Request;
use support\Response;

class Index
{
    public function index(Request $request): Response
    {
        $dataset_id = get('id');
        if ($dataset_id) {
            $dataset = db()->table('dataset')->where('id', $dataset_id)->first();
        } else {
            $dataset = db()->table('dataset')->first();
        }

        $view = view2();
        $view->assign([
            'dataset' => $dataset
        ]);

        return $view->display('datasets/index');
    }
}