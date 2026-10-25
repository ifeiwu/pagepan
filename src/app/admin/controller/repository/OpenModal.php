<?php

namespace app\admin\controller\repository;

use support\Request;

class OpenModal
{
    public function index(Request $request): void
    {
        $html = view2()->render('blocks/modal');

        $ds = datastar();
        $ds->replace($html);
        $ds->script('BlocksModal.show()');
        $ds->close();
    }
}