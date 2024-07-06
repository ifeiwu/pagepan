<?php
//
return function () {
    $config = Config::file('db');
    if ( $config['type'] == 'sqlite' ) {
        Response::success("数据库已经是 SQLite，无需进行迁移。");
    }

    $mysql = DB::new($config);
    $sqlite = new PDO('sqlite:' . DATA_PATH . 'sqlite/pagepan.db');


    $fail_sqls = [];
    $ok_sqls = [];
    $tables = $mysql->getTables();
    foreach ($tables as $talbe) {
        // 指定表名
        $talbe = str_replace('pagepan_', '', $talbe);
        if ( ! in_array($talbe, ['admin', 'site', 'item', 'page', 'message', 'log', 'trash']) ) {
            continue;
        }

        // sqlite表所有字段
        $sqlite_columns = [];
        $fields = $sqlite->query("PRAGMA table_info({$talbe})")->fetchAll();
        foreach ($fields as $field) {
            $sqlite_columns[] = $field['name'];
        }

        // mysql表所有字段
        $mysql_columns = $mysql->getTableColumns($talbe);
        // 两个数据库字段是否相同
        if ( $mysql_columns != $sqlite_columns ) {
            echo "数据表的结构不一致：<br>";
            echo "MySql({$table}): [" . implode(',', $mysql_columns) . ']<br>';
            echo "Sqlite({$table}): [" . implode(',', $sqlite_columns) . ']<br>';
            exit;
        }

        // 查找表数据
        $items = $mysql->select($talbe);
        if ( empty($items) ) {
            continue;
        }

        // 清空表内容再插入新数据
        if ( $sqlite->exec("DELETE FROM {$talbe}") === false ) {
            Response::success("清空表出错：{$talbe}");
        }

        // 导入数据
        $columns = '`' . implode('`,`', $sqlite_columns) . '`';
        foreach ($items as $item) {
            $values = array_values($item);
            $values = "'" . implode("','", $values) . "'";
            $insert_sql = "INSERT INTO `{$talbe}` ({$columns}) VALUES ({$values})";
            if ( $sqlite->exec($insert_sql) === false ) {
                $fail_sqls[] = $insert_sql;
            } else {
                $ok_sqls[] = $insert_sql;
            }
        }
    }

    if ( ! empty($fail_sqls) ) {
        $fail_log_file = Log::mysql2sqlite_fail(implode("\n", $fail_sqls));
    }
    if ( ! empty($ok_sqls) ) {
        $ok_log_file = Log::mysql2sqlite_ok(implode("\n", $ok_sqls));
    }

    if ( is_file($fail_log_file) && ! is_file($ok_log_file) ) {
        Response::success("数据迁移出现错误，请查阅日志文件：<br>{$fail_log_file}。");
    } elseif ( is_file($fail_log_file) && is_file($ok_log_file) ) {
        Response::success("部分数据迁移出现错误，请查阅日志文件：<br>{$fail_log_file}。");
    } else {
        // 修改配置文件
        file_put_contents(CONF_PATH . 'db.php', "<?php
return [
    'debug' => false,
    'type' => 'sqlite',
    'file' => 'data/sqlite/pagepan.db',
    'prefix' => ''
];");
        Response::success("数据已成功从MySQL迁移至SQLite。同时，config/db.php 配置文件已经修改。");
    }
};