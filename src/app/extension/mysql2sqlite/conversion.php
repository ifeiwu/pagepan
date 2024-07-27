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
    if ( empty($tables) ) {
        Response::error('读取 MySQL 所有数据表失败。');
    }

    foreach ($tables as $table) {
        // 指定表名
        $table = str_replace($config['prefix'], '', $table);
        if ( ! in_array($table, ['admin', 'site', 'item', 'page', 'message', 'log', 'trash']) ) {
            continue;
        }

        // sqlite表所有字段
        $sqlite_columns = [];
        $fields = $sqlite->query("PRAGMA table_info({$table})")->fetchAll();
        foreach ($fields as $field) {
            $sqlite_columns[] = $field['name'];
        }

        // mysql表所有字段
//        $mysql_columns = $mysql->getTableColumns($table);
//        // 两个数据库字段是否相同
//        if ( $mysql_columns != $sqlite_columns ) {
//            $message = "MySQL: [" . implode(',', $mysql_columns) . ']<br>';
//            $message .= "SQLite: [" . implode(',', $sqlite_columns) . ']<br>';
//            Response::error("【{$table}】数据表的结构或字段顺序不一致：<br>" . $message);
//        }

        // 查找表数据
        $items = $mysql->select($table);
        if ( empty($items) ) {
            continue;
        }

        // 清空表内容再插入新数据
        if ( $sqlite->exec("DELETE FROM {$table}") === false ) {
            Response::error("清空表出错：{$table}");
        }

        // 导入数据
        $columns = '`' . implode('`,`', $sqlite_columns) . '`';
        foreach ($items as $item) {
            // mysql表结构字段顺序转换成sqlite字段顺序
            $sqlite_item = [];
            foreach ($sqlite_columns as $sqlite_column) {
                $sqlite_item[$sqlite_column] = $item[$sqlite_column];
            }

            $values = array_values($sqlite_item);
            $values = "'" . implode("','", $values) . "'";
            $insert_sql = "INSERT INTO `{$table}` ({$columns}) VALUES ({$values})";
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
    } else {
        Response::error("数据迁移出现错误。");
    }

    if ( is_file($fail_log_file) && ! is_file($ok_log_file) ) {
        Response::error("数据迁移出现错误，请查阅日志文件：<br>{$fail_log_file}。");
    } elseif ( is_file($fail_log_file) && is_file($ok_log_file) ) {
        Response::error("部分数据迁移出现错误，请查阅日志文件：<br>{$fail_log_file}。");
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