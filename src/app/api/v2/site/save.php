<?php
return function ($request_data) {
    unset($request_data['admin']);

    // 删除上传的文件
    if (isset($request_data['_removefiles'])) {
        helper('api/v2/removeFiles', [$request_data['_removefiles']]);
        unset($request_data['_removefiles']);
    }

    $db = db();
    $db->debug = false;

    // 添加更新时间
    $request_data[] = [
        'name' => 'timestamp',
        'value' => time()
    ];

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

    // 响应数据
    if (count($error) === 0) {
        return Response::success('保存数据成功');
    } else {
        return Response::error('保存数据失败');
    }
};