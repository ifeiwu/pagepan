<?php

namespace app\admin\controller\pages;

use app\exception\DatastarAlertException;
use support\Request;

class SaveInfo
{
    public function index(Request $request): void
    {
        $id = post('id', 'int');
        $path = post('path', 'text', '') ?: 'index';
        $row = [
            'state' => post('state', 'text', 0),
            'type' => post('type', 'alnum', 'home'),
            'layout' => post('layout', 'text', ''),
            'title' => post('title', 'text', '页面名称'),
            'path' => $path,
        ];

        $excludes = ['admin', 'api', 'imgph', 'assets', 'data'];
        foreach ($excludes as $prefix) {
            if ($path === $prefix || str_starts_with($path, $prefix . '/')) {
                throw new DatastarAlertException("页面路径「{$path}」为系统保留路径，请更换其他路径。");
            }
        }

        if ($path && !preg_match('#\A[a-zA-Z0-9][a-zA-Z0-9/_-]*\z#', $path)) {
            throw new DatastarAlertException('页面路径格式不正确');
        }

        $db = db();

        if ($id) {
            $db->table('page')->where('id', $id)->update($row);
            $target = "#page_$id";
            $action = 'replace';
        } else {
            $page = $db->table('page')->where('path', $path)->first(['title', 'path']);
            if ($page) {
                throw new DatastarAlertException("路径 {$path} 已被「{$page->title}」页面占用，请更换其它路径。");
            }
            $id = $db->table('page')->insertGetId($row);
            $target = '#pages';
            $action = 'prepend';
        }

        $page = $db->table('page')->where('id', $id)->first();
        $html = view2()->render('pages/item-li', ['items' => [$page]]);

        $ds = datastar();
        $ds->$action($html, $target);
        $ds->script('EditModal.close()');
        $ds->close();
    }
}