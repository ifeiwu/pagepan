<?php
// 构建树形数组
return function ($list, $pk = 'id', $pid = 'pid', $child = '_child', $root = 0) {
    $tree = array();

    if ( is_array($list) )
    {
        $refer = array();
        foreach ($list as $key => $data) {
            $refer[$data[$pk]] = &$list[$key];
        }

        foreach ($list as $key => $data) {
            $parentId = $data[$pid];
            if ( $root == $parentId ) {
                $tree[] = &$list[$key];
            } else {
                if ( isset($refer[$parentId]) ) {
                    $parent = &$refer[$parentId];
                    $parent[$child][] = &$list[$key];
                }
            }
        }
    }

    return $tree;
};