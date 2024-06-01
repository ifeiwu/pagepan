<?php
return function () {
    $columns = '`id`, `pid`, `cid`, `state`, `sortby`, `ctime`, `utime`, `type`, `title`, `alias`, `dataset`, `layout`, `seo`, `setting`, `body`';
    $wheres = "type IN ('guide', 'home', 'dataset', 'inside', 'graphic', 'pro', 'layout', '404')";
    $orders = "CASE type WHEN 'guide' THEN 1 WHEN 'home' THEN 2 WHEN 'dataset' THEN 3 WHEN 'inside' THEN 4 WHEN 'graphic' THEN 5 WHEN 'pro' THEN 6 WHEN 'layout' THEN 7 WHEN '404' THEN 8 END, ctime DESC";

    $db = db();
    $db->debug = false;
    
    $table = $db->prefix . 'page';
    $items = $db->queryAll("SELECT {$columns} FROM {$table} WHERE {$wheres} ORDER BY {$orders}");
    foreach ($items as $key => $item)
    {
        if ( $item['type'] == 'dataset' )
        {
            $table = $item['alias'] ? $item['alias'] : 'item';
            if ( $db->isTable($table) ) {
                $items[$key]['item_count'] = $db->count($table, ['page_id', '=', $item['id']]);
            }
        }
    }

    Response::success('页面查询', $items);
};