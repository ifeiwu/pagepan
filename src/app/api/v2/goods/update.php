<?php
define('MAGIC_QUOTES_GPC', ini_set('magic_quotes_runtime', 0) ? true : false);
return function ($request_data) {
    $data = $request_data;
    $db = db();
    $db->debug = false;

    $table = 'goods';
    $id = $request_data['id'];
    if (!$db->has($table, array('id', '=', $id))) {
        Response::error('没有找到需要修改的商品');
    }

    $data = [];
    // 构建表数据
    $tableColumnNames = $db->getTableColumnNames($table);
    foreach ($tableColumnNames as $column) {
        $value = $request_data[$column];
        if (!is_null($value)) {
            if (is_array($value)) {
                $data[$column] = json_encode($value, JSON_UNESCAPED_UNICODE);
            } else {
                $data[$column] = MAGIC_QUOTES_GPC ? stripslashes($value) : $value;
            }
        }
    }
    // 当前更新时间
    if (isset($data['utime'])) {
        $data['utime'] = time();
    }
    // 修改创建时间
    if (isset($data['ctime'])) {
        $data['ctime'] = strtotime($data['ctime']);
    }
    // 状态转整型
    if (isset($data['state'])) {
        $data['state'] = intval($data['state']);
    }
    // 分类层次
    if (isset($data['pid'])) {
        $pid = intval($data['pid']);
        $data['pid'] = $pid;
        if (in_array('level', $tableColumnNames)) {
            $data['level'] = (include APP_PATH . 'api/v2/item/_getLevel.php')($table, $pid, $id);
        }
    }
    // 删除文件
    if (isset($request_data['_removefiles'])) {
        (include APP_PATH . 'api/v2/item/_removeFiles.php')($request_data['_removefiles']);
    }

    // 上传路径
    $upload_name = $request_data['$upload_name'];
    if (in_array($upload_name, $tableColumnNames)) {
        $upload_path = $request_data['$upload_path'];
        $upload_path2 = WEB_ROOT . $upload_path;
        if (!is_dir($upload_path2)) {
            mkdir($upload_path2, true);
        }
        $data[$upload_name] = $upload_path;
    }

    // 更新数据
    if ($db->update($table, $data, ['id', '=', $id])) {
//        $this->_log('update', ['title' => $data['title']]);
        Response::success('更新成功', ['id' => $id]);
    } else {
        Response::error('更新失败', ['id' => $id]);
    }
};