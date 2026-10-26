<?php

namespace app\admin\controller\pages;

use app\exception\DatastarAlertException;
use app\exception\DatastarToastException;
use HeadlessChromium\BrowserFactory;
use support\Request;
use support\Response;

class Index
{
    public function index(Request $request): Response
    {
        $page_count = db()->table('page')->count();

        return view2()->display('pages/index', [
            'page_count' => $page_count
        ]);
    }
}
