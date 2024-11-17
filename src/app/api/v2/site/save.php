<?php
return function ($request_data) {
    unset($request_data['admin']);
    $db = db();
    $db->debug = false;

    $error = [];
    foreach ($request_data as $name => $value) {
        $is_save = $db->save('site', $value, array('name', '=', $name));
        if ($is_save === false) {
            $error[] = $name;
        }
    }

    if (count($error) === 0) {
        return Response::success('保存站点数据成功');
    } else {
        return Response::error('保存站点数据失败');
    }
};