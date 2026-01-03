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
    $site = [];
    foreach ($request_data as $name => $value) {
        // 名称是以下划线(_)开头的不保存
        if (stripos($name, '_') === 0) {
            continue;
        }
        // 正常格式不需要接装数组
        if (is_numeric($name) && is_array($value)) {
            $site[] = $value;
        } elseif ($name == '{state=0}') {
            // 置后更改状态为 0
            // 例子：<input type="hidden" name="{state=0}" value="manifest">
            $_names = explode(',', $value);
            foreach ($_names as $_name) {
                $site[] = ['name' => $_name, 'state' => 0];
            }
        } elseif ($name == '{value=base64}') {
            // 置后编码值为 base64
            // 例子：<input type="hidden" name="{value=base64}" value="manifest">
            $_names = explode(',', $value);
            foreach ($_names as $_name) {
                $_value = _findValue($site, $_name);
                $site[] = ['name' => $_name, 'value' => base64_encode($_value)];
            }
        } else {
            // 编码 value
            $_value = '';
            if ($value !== null) {
                if (is_array($value)) {
                    $_value = json_encode2($value);
                } else if (is_string($value)) {
                    // json 格式不编码
                    json_decode($value);
                    if (json_last_error() !== JSON_ERROR_NONE) {
                        $_value = html_encode($value);
                    }
                }
            }
            $site[] = ['name' => $name, 'value' => $_value];
        }
    }

    $db = db();
    $error = [];
    foreach ($site as $name => $row) {
        if ($db->save('site', $row, ['name', '=', $row['name']]) === false) {
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

function _findValue($site, $name) {
    foreach ($site as $row) {
        if ($row['name'] === $name) {
            return $row['value'];
        }
    }
    return null;
}