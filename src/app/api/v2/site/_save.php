<?php
return function ($request_data) {
    unset($request_data['admin']);
    // 删除上传的文件
    if (isset($request_data['_removefiles'])) {
        helper('api/v2/removeFiles', [$request_data['_removefiles']]);
        unset($request_data['_removefiles']);
    }
    // 添加更新时间
    $request_data['timestamp'] = time();
    // 保存站点数据
    $error = [];
    $data = [];
    $db = db();
    foreach ($request_data as $name => $value) {
        // 名称是以下划线(_)开头的不保存
        if (stripos($name, '_') === 0) {
            continue;
        }
        // 注意：提交的名称必需是置后的来覆盖原来的值
        // 更改状态为 0
        // 例子：<input type="hidden" name="{state=0}" value="manifest">
        if ($name == '{state=0}') {
            $data = ['name' => $value, 'state' => 0];
        }
        // 更改值为 base64 编码
        // 例子：<input type="hidden" name="{value=base64}" value="manifest">
        elseif ($name == '{value=base64}') {
            $name = $value;
            $value = $request_data[$name];
            if (is_array($value)) {
                $value = base64_encode(json_encode2($value));
            }
            $data = ['name' => $name, 'value' => $value];
        }
        // 如果名称不是数字，修改结构
        elseif (!is_numeric($name)) {
            if (is_array($value)) {
                $value = json_encode2($value);
            }
            $data = ['name' => $name, 'value' => $value];
        }
        // 保存数据
        if ($db->save('site', $data, ['name', '=', $data['name']]) === false) {
            $error[] = $name;
        }
    }

    // 响应数据
    if (count($error) === 0) {
        return true;
    } else {
        return false;
    }
};