<?php

namespace app\admin\controller\builder;

use support\Request;
use support\Response;

class Winbox
{
    public function svgEdit(Request $request): Response
    {
        return view2()->display('builder/winbox/svg-edit');
    }

}
