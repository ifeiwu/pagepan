<?php
// 返回当前 item 的 level 对象层级数组
return function ($id) {
    $dataset_table = view()->setting['dataset.table'];

    $item = db()->find($dataset_table, 'id,pid,type,level,title', [['state', '=', 1], 'AND', ['id', '=', $id]]);
    $level_ids = explode(',', $item['level']);
    $levels = [];

    if ( ! empty($level_ids) )
    {
        $level_ids = array_filter($level_ids); // 过虑空值
        array_pop($level_ids); // 删除最后一个

        foreach ($level_ids as $id) {
            $levels[] = db()->find($dataset_table, 'id,pid,type,title', [['state', '=', 1], 'AND', ['id', '=', $id]]);
        }
    }

    // 分类才追加到数组
    if ( $item['type'] == 2 ) {
        $levels[] = $item;
    }

    return $levels;
};