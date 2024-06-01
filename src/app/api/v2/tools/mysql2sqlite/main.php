<?php
//
return function () {

    $mysql = DB::new([
        'debug' => false,
        'type' => 'mysql',
        'port' => 3306,
        'host' => '192.168.31.5',
        'name' => 'qing.10003',
        'user' => 'root',
        'pass' => 'root',
        'prefix' => 'pagepan_'
    ]);

    $sqlite = new PDO('sqlite:' . DATA_PATH . 'sqlite/pagepan-test.db');

    $inserts_sql = [];

    $tables = $mysql->getTables();

    foreach ($tables as $talbe)
    {
        $talbe = str_replace('pagepan_', '', $talbe);
        // 忽略的表名
        if ( $talbe == 'part' || $table == 'stats' ) {
            continue;
        }
        // 查找表数据
        $items = $mysql->select($talbe);

        if ( empty($items) ) {
            continue;
        }

        // 提取表所有字段
        $columns = $mysql->getTableColumns($talbe);
        $columns = '`' . implode('`,`', $columns) . '`';

        // 拼接 SQL 插入数据语句
        $insert_sql = "INSERT INTO `{$talbe}` ({$columns}) VALUES ";
        foreach ($items as $item)
        {
            $values = array_values($item);
            $values = "'" . implode("','", $values) . "'";

            $insert_sql .= "\n({$values}),";
        }

        $insert_sql = rtrim($insert_sql, ',') . ';';

        // 清空表内容再插入新数据
        if ( $sqlite->exec("DELETE FROM {$talbe}") ) {
            if ( $sqlite->exec($insert_sql) ) {
                $inserts_sql[] = $insert_sql;
            }
        }
    }

    Response::success('数据已成功从 MySQL 迁移至 SQLite！');
};