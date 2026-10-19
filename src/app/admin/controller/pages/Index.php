<?php

namespace app\admin\controller\pages;

use app\exception\DatastarToastException;
use support\Request;

class Index
{
    public function index(Request $request)
    {
        return view2()->response('pages/index');
    }

    public function query(Request $request)
    {
        $items = db()->table('page')
            ->orderByRaw("INSTR(',guide,home,dataset,inside,graphic,pro,layout,404,', ',' || type || ',')")
            ->orderBy('id', 'desc')
            ->get();

        $ds = datastar();
        $html = view2()->fetch('pages/item-li', ['items' => $items]);
        $ds->append($html, '#pages');
        $ds->close();
    }

    public function edit(Request $request)
    {
        $id = get('id', 'int');

        $page = db()->table('page')->where('id', '=', $id)->first();
        if (empty($page)) {
            throw new DatastarToastException('获取页面信息失败');
        }

        $layouts = db()->table('page')->where('type', '=', 'layout')->get(['path', 'title']);

        $html = view2()->fetch('pages/edit', ['page' => $page, 'layouts' => $layouts]);
        $ds = datastar();
        $ds->replace($html);
        $ds->script('EditDialog.show()');
        $ds->close();
    }

    public function save(Request $request)
    {
        $id = post('id', 'int');
        $state = post('state', 'text', 0);
        $type = post('type', 'alnum', 'home');
        $layout = post('layout', 'text', '');
        $title = post('title', 'text', '页面名称');
        $path = post('path', 'text', '');

        if ($path && !preg_match('#\A[a-zA-Z0-9][a-zA-Z0-9/_-]*\z#', $path)) {
            throw new DatastarToastException('页面路径格式不正确');
        }

        $row = [
            'id' => $id,
            'state' => $state,
            'type' => $type,
            'layout' => $layout,
            'title' => $title,
            'path' => $path,
        ];

        $ds = datastar();

        if ($id) {
            db()->table('page')->where('id', '=', $id)->update($row);
            $page = db()->table('page')->where('id', '=', $id)->first();
            $html = view2()->fetch('pages/item-li', ['items' => [$page]]);
            $ds->replace($html, "#page_$id");
        } else {
            $id = db()->table('page')->insertGetId($row);
        }


        $ds->script('EditDialog.close()');
        $ds->close();
    }

    /*public function dialog(Request $request)
    {
        $id = $request->get('id');
        $ds = datastar();

        $html = view2()->fetch('pages/dialog', [
            'id' => $id,
            'title' => ''
        ]);
        $ds->replace($html);

        $ds->script('EditDialog.show()');

        $ds->close();
    }*/
}
