<?php
// http://192.168.31.5:8087/dev/update-demo-db-url
// 用于线上更新 path 字段本地链接为
return function ($request_data) {

    // 演示数据库
    $demo_db = DB::new(['debug' => false, 'type' => 'sqlite', 'file' => 'data/sqlite/demo.db', 'prefix' => '']);
    $demo_tables = ['url_nav']; // 注意：在这里添加表名
    foreach ($demo_tables as $table) {
        $demo_columns = $demo_db->getTableColumns($table);
        // 两个数据库字段是否相同
        if ($demo_columns != $dev_columns) {
            echo "数据表的结构不一致：<br>";
            echo "{$table}: [" . implode(',', $demo_columns) . ']<br>';
            echo "item: [" . implode(',', $dev_columns) . ']<br>';
            exit;
        }

        $columns = '`' . implode('`,`', $dev_columns) . '`';
        $items = $demo_db->select($table);
        foreach ($items as $item) {
            $values = array_values($item);
            $values = "'" . implode("','", $values) . "'";
            $insert_sql = "INSERT INTO `item` ({$columns}) VALUES ({$values})";
            if ( ! $dev_db->query("SELECT `id` FROM `item` WHERE `id`={$item['id']}")->fetch() ) {
                if ($dev_db->exec($insert_sql) === false) {
                    echo "执行SQL出错：{$insert_sql}<br>";
                }
            }
        }
        // 创建数据源
        if ( ! $dev_db->query("SELECT `id` FROM `page` WHERE `id`={$item['page_id']}")->fetch() ) {
            $dev_db->exec("INSERT INTO `page` (`id`, `pid`, `cid`, `state`, `sortby`, `ctime`, `utime`, `cache`, `type`, `title`, `alias`, `dataset`) VALUES ({$item['page_id']}, 1, 0, 1, 100, 0, 0, 0, 'dataset', '{$table}', 'item', 'uikit/news')");
        }
    }

    echo '导入完成！';
};