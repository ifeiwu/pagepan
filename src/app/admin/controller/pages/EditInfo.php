<?php

namespace app\admin\controller\pages;

use app\exception\DatastarToastException;
use support\Request;

class EditInfo
{
    public function index(Request $request): void
    {
        $id = get('id', 'int');

        $page = $id
            ? db()->table('page')->where('id', $id)->first()
            : new class {
                public function __get($name) {
                    return '';
                }
            };

        if ($id && !$page) {
            throw new DatastarToastException('获取页面信息失败');
        }

        $layouts = db()->table('page')
            ->where('type', 'layout')
            ->get(['path', 'title']);

        $html = view2()->render('pages/edit-info', [
            'page' => $page,
            'layouts' => $layouts,
        ]);

        $ds = datastar();
        $ds->replace($html);
        $ds->script('EditModal.show()');
        $ds->close();
    }
}