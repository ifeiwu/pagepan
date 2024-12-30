<?php
return function ($id = 0) {
    $item = db()->find('goods', ['id AS goods_id', 'title', 'price', 'image', 'path', 'score', 'utime'], [['id', '=', $id], 'AND', ['state', '=', 1]]);
    /*$item['spec'] = '';
    $specs = $_GET['specs'];
    if ($specs) {
        //规格处理
        $spec_arr = array();
        foreach ($specs as $kv) {
            $kv_arr = explode(':', $kv);
            $spec_arr[$kv_arr[0]] = $kv_arr[1];
            $title = db()->find('goods_spec', 'title', array('id' => $kv_arr[0]));
            $title2 = db()->find('goods_spec', 'title', array('id' => $kv_arr[1]));
            $item['spec'] .= $title . '：' . $title2 . '<br>';
        }
        //规格的价格等参数
        $goods_join_spec = db()->find('goods_join_spec', array('goods_no', 'price', 'price2'), array('AND' => array('goods_id' => $id, 'spec' => serialize($spec_arr))));
        $item['price'] = $goods_join_spec['price'];
    }*/

    return $item;
};