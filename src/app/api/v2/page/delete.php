<?php
return function ($request_data) {
    $db = db();
    $db->debug = false;

    $table = 'page';
    $layouts = $datasets = [];
    $ids = $request_data['id'];

    foreach ($ids as $id)
    {
        $page = $db->find($table, '*', ['id', '=', $id]);
        // 布局页面是否关联其它页面
        if ( $page['type'] == 'layout' )
        {
            if ( $db->count($table, ['layout', '=', $page['alias']]) > 0 ) {
                $layouts[] = $page['title'];
                break;
            }
        }
        // 数据源是否还有数据
        else if ( $page['type'] == 'dataset' )
        {
            $page_alias = $page['alias'] ?: 'item';
            if ( $db->count($page_alias, ['page_id', '=', $page['id']]) > 0 ) {
                $datasets[] = $page['title'];
                break;
            }
        }
        // 删除页面
        if ( $db->delete($table, array('id', '=', $id)) ) {
            helper('api/v2/addTrash', [$table, $page, $request_data]); // 回收站
        }
    }

    if ( ! empty($layouts) ) {
        return Response::error('【' . implode(',', $layouts) . '】布局与其他页面有关联，请先取消关联，然后再进行删除操作。');
    } elseif ( ! empty($datasets) ) {
        return Response::error('【' . implode(',', $datasets) . '】数据源中还包含其他数据，请在删除之前先清空。');
    } else {
        return Response::success('删除页面');
    }
};