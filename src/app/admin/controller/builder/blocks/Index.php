<?php

namespace app\admin\controller\builder\blocks;

use support\Request;

class Index
{
    public function openDrawer(Request $request): void
    {
        $html = view2()->render('builder/blocks/open-drawer');

        $ds = datastar();
        $ds->replace($html);
        $ds->script('sp.drawer(document.querySelector("#drawer_repo_blocks")).show();');
        $ds->close();
    }
}