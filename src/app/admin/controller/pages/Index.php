<?php

namespace app\admin\controller\pages;

use app\exception\DatastarAlertException;
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
        $html = view2()->fetch('pages/item-li', [
            'items' => $items
        ]);
        $ds->append($html, '#pages');
        $ds->close();
    }

    public function edit(Request $request)
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

        $html = view2()->fetch('pages/edit', [
            'page' => $page,
            'layouts' => $layouts,
        ]);

        $ds = datastar();
        $ds->replace($html);
        $ds->script('EditDialog.show()');
        $ds->close();
    }

    public function save(Request $request)
    {
        $id = post('id', 'int');
        $row = [
            'state' => post('state', 'text', 0),
            'type' => post('type', 'alnum', 'home'),
            'layout' => post('layout', 'text', ''),
            'title' => post('title', 'text', '页面名称'),
            'path' => post('path', 'text', ''),
        ];

        if (in_array($row['path'], ['admin', 'shop', 'api'])) {
            throw new DatastarAlertException("页面路径「{$row['path']}」为系统保留路径，请更换其他路径。");
        }

        if ($row['path'] && !preg_match('#\A[a-zA-Z0-9][a-zA-Z0-9/_-]*\z#', $row['path'])) {
            throw new DatastarAlertException('页面路径格式不正确');
        }

        $db = db();

        if ($id) {
            $db->table('page')->where('id', $id)->update($row);
            $target = "#page_$id";
            $action = 'replace';
        } else {
            $page = $db->table('page')->where('path', $row['path'])->first(['title', 'path']);
            if ($page) {
                throw new DatastarAlertException("路径 {$row['path']} 已被「{$page->title}」页面占用，请更换其它路径。");
            }
            $id = $db->table('page')->insertGetId($row);
            $target = '#pages';
            $action = 'prepend';
        }

        $page = $db->table('page')->where('id', $id)->first();
        $html = view2()->fetch('pages/item-li', ['items' => [$page]]);

        $ds = datastar();
        $ds->$action($html, $target);
        $ds->script('EditDialog.close()');
        $ds->close();
    }

    public function delete(Request $request) {
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
