<?php
// 安装酷店
return function ($request_data) {
    if (RUN_MODE == 'dev') {
        Response::error('开发模式无法使用此功能');
    }

    $last_version2 = $request_data['last_version2'];
    $save_file = ROOT_PATH . 'data/sqlite/pagepan-shop.db';
    $res = Response::download("http://get.pagepan.com/install/{$last_version2}/pagepan.db", $save_file);
    if ($res !== true) {
        Response::error($res);
    }
    $old_file = DATA_PATH . 'sqlite/pagepan.db'; // 本地测试改为 pagepan-test.db
    $new_file = DATA_PATH . 'sqlite/pagepan-shop.db';
    $result = cloneDB($old_file, $new_file);
    if ($result === true) {
        $backup_path = ROOT_PATH . 'data/backup';
        if (!is_dir($backup_path)) {
            mkdir($backup_path, 0755);
        }
        $backup_dbfile = $backup_path . '/pagepan-' . date('YmdH') . '.db';
        if (copy($old_file, $backup_dbfile)) {
            if (rename($new_file, $old_file) !== true) {
                Response::error("重命名数据库文件失败：{$new_file}");
            }
        } else {
            Response::error("备份数据库文件失败：{$backup_dbfile}");
        }
    } else {
        Response::error($result);
    }

    try {
        $db = db();
        $db->pdo->beginTransaction();
        // 添加页面分组“酷店”如果存在不重复添加
        $page_group = $db->column('site', 'value', ['name', '=', 'page_group']);
        $page_group = json_decode2($page_group);
        $ids = array_column($page_group, 'id');
        if (!in_array('9', $ids)) {
            $page_group[] = ['id' => '9', 'type' => '', 'title' => '酷店'];
            $db->save('site', ['state' => 0, 'name' => 'page_group', 'value' => json_encode2($page_group)], ['name', '=', 'page_group']);
        }
        // 设置开店状态
        $db->save('site', ['state' => 1, 'name' => 'shop_open', 'value' => 1], ['name', '=', 'shop_open']);
        $db->save('site', ['state' => 1, 'name' => 'shop_delivery', 'value' => 1], ['name', '=', 'shop_delivery']);
        $db->save('site', ['state' => 1, 'name' => 'shop_opening', 'value' => 1], ['name', '=', 'shop_opening']);
        $db->save('site', ['state' => 1, 'name' => 'shop_name', 'value' => ''], ['name', '=', 'shop_name']);

        if ($db->count('page', ['alias', '=', 'shop']) == 0) {
            $tplsql = $request_data['tplsql'];
            if ($db->pdo->exec($tplsql) !== false) {
                $db->pdo->commit();
                Response::success('开通酷店成功');
            } else {
                $db->pdo->rollBack();
                Response::error('开通酷店失败');
            }
        } else {
            $db->pdo->commit();
            Response::success('酷店己开通');
        }
    } catch (\Exception $e) {
        $db->pdo->rollBack();
        Response::error($e->getMessage());
    }
};

// 升级数据库
function cloneDB($form_dbfile, $to_dbfile)
{
    try {
        $oldDb = new \PDO("sqlite:{$form_dbfile}");
        $oldDb->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_ASSOC);
        $oldDb->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

        $newDb = new \PDO("sqlite:{$to_dbfile}");
        $newDb->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_ASSOC);
        $newDb->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        $newDb->beginTransaction();

        // 获取 $oldDb 中的所有表
        $tables = $oldDb->query("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")->fetchAll();
        foreach ($tables as $table) {
            $tableName = $table['name'];

            // 检查表是否存在于 $newDb 中
            $stmt = $newDb->query("SELECT 1 FROM sqlite_master WHERE type='table' AND name='$tableName'");
            if ($stmt->fetchColumn() === false) {
                // 表不存在，从 $oldDb 中获取表结构并创建表
                $sql = $oldDb->query("SELECT sql FROM sqlite_master WHERE type='table' AND name='$tableName'")->fetchColumn();
                $newDb->exec($sql);
            }

            // 获取 $oldDb 中表的列名
            $columns = $oldDb->query("PRAGMA table_info(`$tableName`)")->fetchAll();
            $columnNames = [];
            foreach ($columns as $col) {
                $columnNames[] = '"' . $col['name'] . '"';
            }
            $columnsStr = implode(',', $columnNames);

            // 清空表再插入数据
            $newDb->exec("DELETE FROM `{$tableName}`");

            // 从 $oldDb 中获取数据
            $rows = $oldDb->query("SELECT $columnsStr FROM `$tableName`")->fetchAll();
            foreach ($rows as $row) {
                $placeholders = implode(',', array_fill(0, count($columnNames), '?'));
                $sql = "INSERT INTO `$tableName` ($columnsStr) VALUES ($placeholders)";
                $newDb->prepare($sql)->execute(array_values($row));
            }
        }
        $newDb->commit();
        return true;
    } catch (\PDOException $e) {
        $newDb->rollBack();
        return $e->getMessage();
    }
}