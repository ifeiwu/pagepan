<?php
define('MAGIC_QUOTES_GPC', ini_set('magic_quotes_runtime', 0) ? true : false);
return function ($table, $request_data) {
    $db = db();
    $db->debug = false;
    // 是否存在数据
    $id = $request_data['id'];
    if (!$db->has($table, array('id', '=', $id))) {
        return false;
    }
    // 构建表数据
    $data = [];
    $colnames = $db->getTableColumnNames($table);
    foreach ($colnames as $name) {
        $value = $request_data[$name];
        if (!is_null($value)) {
            if (is_array($value)) {
                $data[$name] = json_encode2($value);
            } else {
                $data[$name] = MAGIC_QUOTES_GPC ? stripslashes($value) : $value;
            }
        }
    }
    // 当前更新时间
    if (in_array('utime', $colnames)) {
        $data['utime'] = time();
    }
    // 修改创建时间
    if (in_array('ctime', $colnames) && isset($data['ctime'])) {
        $data['ctime'] = strtotime($data['ctime']);
    }
    // 状态转整型
    if (in_array('state', $colnames) && isset($data['state'])) {
        $data['state'] = intval($data['state']);
    }
    // 分类层次
    if (in_array('pid', $colnames) && isset($data['pid'])) {
        $pid = intval($data['pid']);
        $data['pid'] = $pid;
        if (in_array('level', $colnames)) {
            $data['level'] = helper('api/v2/getLevel', [$table, $pid, $id]);
        }
    }
    // 删除文件
    if (isset($request_data['_removefiles'])) {
        helper('api/v2/removeFiles', [$request_data['_removefiles']]);
    }
    // 上传路径
    $upload_name = $request_data['$upload_name'];
    if (in_array($upload_name, $colnames)) {
        $upload_path = $request_data['$upload_path'];
        $upload_path2 = WEB_ROOT . $upload_path;
        if (!is_dir($upload_path2)) {
            mkdir($upload_path2, 0755, true);
        }
        $data[$upload_name] = $upload_path;
    }

//    helper('api/v2/logger', ['title' => $data['title']]);

    return $db->update($table, $data, ['id', '=', $id]);
};