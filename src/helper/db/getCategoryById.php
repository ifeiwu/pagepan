<?php
// 获取一个分类
return function ($id, $columns = []) {
    $setting = view()->setting;
    $page_id = $setting['dataset.id'];
    $table = $setting['dataset.table'];
    $category = [];

    if ( $page_id && $table )
    {
        $page_alias = view()->page['page_alias'];
        $columns = $columns ?: 'id,title';
        $category = db()->find($table, $columns, [['page_id', '=', $page_id], 'AND', ['id', '=', $id]]);

        if ( $category ) {
            $category['url'] = $page_alias . '/category/' . $category['id'] . '.html';
        }
    }
    else
    {
        // 演示数据
        $categorys = helper('db/getCategorysByDataset');

        if ( $categorys )
        {
            foreach ($categorys as $category)
            {
                if ( $category['id'] == $id ) {
                    break;
                }
            }

            $category['url'] = 'javascript:;';
        }
    }

    return $category;
};