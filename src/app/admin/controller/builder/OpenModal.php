<?php

namespace app\admin\controller\builder;

use support\Request;

class OpenModal
{
    public function index(Request $request): void
    {
        $page_id = $request->get('page_id');
        $edit_mode = request()->cookie('builder-edit-mode', 'design');

        $html = view2()->render('builder/modal', [
            'edit_mode' => $edit_mode,
            'page_id' => $page_id,
        ]);

        $ds = datastar();
        $ds->replace($html);
        $ds->script('BuilderModal.show()');
        $ds->close();
    }
}