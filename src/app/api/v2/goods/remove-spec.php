<?php
return function ($request_data) {
    $spec_id = intval($request_data['specid']);

    $db = db();
    $db->debug = false;
    if ($db->delete('goods_spec', ['id', '=', $spec_id])) {
        Response::success('删除商品规格成功');
    } else {
        Response::error('删除商品规格失败');
    }
};