<?php
// site 数据表查找
return function ($name = null) {
    if ($name) {
        return db()->find('site', ['value'], [['name', '=', $name], 'AND', ['state', '=', 1]], null, 0);
    } else {
        $site = db()->select('site', ['name', 'value'], ['state', '=', 1]);
        $data = [];
        foreach ($site as $ov) {
            $value = $ov['value'];
            if ($value) {
                $data[$ov['name']] = $value;
            }
        }
        return $data;
    }
};