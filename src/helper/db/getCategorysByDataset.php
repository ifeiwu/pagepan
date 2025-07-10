<?php
// 通过数据源 id 获取分类列表
return function ($columns = 'id,pid,title', $where = []) {
    $setting = view()->setting;
    $page_id = $setting['dataset.id'];
    $table = $setting['dataset.table'];
    $order = $setting['dataset.category.orderby'];
    $order = $order ?: 'sortby DESC, id DESC';

    if ( $page_id && $table )
    {
        $where[] = ['state', '=', 1];
        $where[] = 'AND';
        $where[] = ['type', '=', 2];
        $where[] = 'AND';
        $where[] = ['page_id', '=', $page_id];

        $order = $order ?: 'sortby DESC, id DESC';

        return db()->select($table, '*', $where, $order);
    }
    else
    {
        return view()->uikit->demoData['categorys'];
    }
};