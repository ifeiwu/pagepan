<?php

namespace app\admin\controller\pages;

use app\exception\DatastarToastException;
use support\Request;

class Delete
{
    public function index(Request $request): void
    {
        $id = get('id', 'int');

        if (db()->table('page')->where('id', $id)->delete()) {
            $ds = datastar();
            $ds->remove("#page_$id");
            $ds->close();
        } else {
            throw new DatastarToastException('删除页面失败');
        }
    }
}