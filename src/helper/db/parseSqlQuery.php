<?php
return function ($items) {
    // 查询格式： SELECT * FROM {prefix}item WHERE page_id=10 AND pid=[get.pid,10] AND type=1 ORDER BY id DESC,sortby DESC
    // 大括号[]里逗号分隔分别是$_GET的键和默认值
    $sql = $items;

    preg_match_all("/\[get\.(\w*?),(\w*?)\]/i", $sql, $matches, PREG_SET_ORDER);

    foreach ($matches as $matche)
    {
        $name = $matche[1];
        $value = $matche[2];
        $sql = str_replace('[get.' . $name . ',' . $value . ']', $_GET[$name] ?: $value, $sql);
    }

    return db()->query($sql);
};