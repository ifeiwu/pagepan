<?php
return function ($request_data) {
    unset($request_data['admin']);
    $db = db();
    $db->debug = false;

    // 删除上传的文件
    if (isset($request_data['_removefiles'])) {
        helper('api/v2/removeFiles', [$request_data['_removefiles']]);
        unset($request_data['_removefiles']);
    }

    // 保存站点数据
    $error = [];
    foreach ($request_data as $key => $vo) {
        if (!is_numeric($key)) {
            continue;
        }
        $is_save = $db->save('site', $vo, array('name', '=', $vo['name']));
        if ($is_save === false) {
            $error[] = $name;
        }
    }

    // 响应
    if (count($error) === 0) {
        return Response::success('保存站点数据成功');
    } else {
        return Response::error('保存站点数据失败');
    }
};