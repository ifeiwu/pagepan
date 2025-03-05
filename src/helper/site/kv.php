<?php
// site 数据转为键值对
return function ($names = []) {
    // 两种条件查询
    if (empty($names)) {
        $wheres = [['state', '=', 1]];
    } else {
        $wheres = [['name', 'IN', $names]];
    }

    $site = db()->select('site', ['name', 'value'], $wheres);
    $data = [];
    foreach ($site as $ov) {
        $value = $ov['value'];
        if ($value) {
            $data[$ov['name']] = $value;
        }
    }
    return $data;
};