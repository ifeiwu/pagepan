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

        $layouts = db()->table('page')->where('type', '=', 'layout')->get(['id', 'title']);

        $html = view2()->fetch('pages/edit', ['page' => $page, 'layouts' => $layouts]);
        $ds = datastar();
        $ds->replace($html);
        $ds->script('EditDialog.show()');
        $ds->close();
    }

    public function save(Request $request)
    {
        $id = post('id', 'int');
        $type = post('type', 'lower');
        $title = post('title', 'text');
        $path = post('path', '/[^0-9a-zA-Z\/_-]/');

        $row = [
            'id' => $id,
            'type' => $type,
            'title' => $title,
            'path' => $path,
        ];

        if ($id) {
            db()->table('page')->where('id', '=', $id)->update($row);
        } else {
            $id = db()->table('page')->insertGetId($row);
        }

        $page = db()->table('page')->where('id', '=', $id)->first();

        $ds = datastar();
        $html = view2()->fetch('pages/item-li', ['items' => [$page]]);
        $ds->prepend($html, '#pages');
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
