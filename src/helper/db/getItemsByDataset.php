<?php
// 通过数据源 id 获取项目列表
return function ($columns = [], $where = []) {
    $setting = view()->setting;
    $dataset_id = $setting['dataset.id'];
    $dataset_table = $setting['dataset.table'];
    $dataset_orderby = $setting['dataset.orderby'];
    $dataset_orderby = $dataset_orderby ?: 'sortby DESC, id DESC';
    $dataset_perpage = $setting['dataset.perpage'];
    $dataset_perpage = is_numeric($dataset_perpage) ? $dataset_perpage : 0;

    if ( $dataset_id && $dataset_table )
    {
        $where[] = ['state', '=', 1];
        $where[] = 'AND';
        $where[] = ['type', '=', 1];
        $where[] = 'AND';
        $where[] = ['page_id', '=', $dataset_id];

        $columns = $columns ?: 'id,pid,ctime,title,subtitle,summary,link,image,path';

        if ( $dataset_perpage > 0 )
        {
            $pagenum = view()->pagevar['get_pagenum'] ?: 1;

            return db()->select($dataset_table, $columns, $where, $dataset_orderby, [($pagenum - 1) * $dataset_perpage, $dataset_perpage]);
        }
        else
        {
            return db()->select($dataset_table, $columns, $where, $dataset_orderby);
        }
    }
    else
    {
        return view()->uikit->demoData['items'];
    }
};