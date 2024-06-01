<?php
// 获取跳转到页面的别名
return function ($jid = null) {
    // 当前页面别名
    if ( ! $jid ) {
        $page_alias = view()->page['page_alias'];
    }
    // 引用关联数据的页面别名
    else
    {
        $join_pageid = db()->find($dataset_table, 'page_id', ['id', '=', $jid], null, 0);
        $join_page = db()->find('page', ['title', 'alias'], ['id', '=', $join_pageid]);
        $page_alias = $join_page['alias'];
    }

    return $page_alias;
};