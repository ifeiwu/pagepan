<?php

namespace app\admin\controller\builder;

use support\Request;

class OpenModal
{
    public function index(Request $request): void
    {
        $page_id = $request->get('page_id');
        $ds = datastar();

        $html = view2()->render('builder/modal', [
            'page_id' => $page_id,
            'title' => ''
        ]);
        $ds->replace($html);
        $ds->script('BuilderModal.show()');

        $ds->close();
    }
}