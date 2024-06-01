<?php
// 返回当前数据源所有分类
return function ($dataset_id = null, $dataset_table = null) {

    if ( ! $dataset_table || ! $dataset_id )
    {
        $setting = view()->setting;
        $dataset_table = $dataset_table ?: $setting['dataset.table'];
        $dataset_id = $dataset_id ?: $setting['dataset.id'];
    }

    $where = [];
    $where[] = ['state', '=', 1];
    $where[] = 'AND';
    $where[] = ['type', '=', 2];
    $where[] = 'AND';
    $where[] = ['page_id', '=', $dataset_id];

    $categorys = db()->select($dataset_table, '*', $where, ['sortby' => 'DESC', 'ctime' => 'DESC']);

    return $categorys;
};