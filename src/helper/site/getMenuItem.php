<?php
// 获取菜单指定项目，如：作者、资源和版权等。
return function ($json, $id) {

    if ( ! $json ) {
        return [];
    }

    $items = json_decode($json, true);
    $id = intval($id);

    if ( is_array($items) && $id > 0 )
    {
        $ids = array_column($items, 'id');
        $index = array_search($id, $ids);

        return $items[$index];
    }

    return [];
};