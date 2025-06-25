<?php
ini_set('error_reporting', E_ALL & ~E_WARNING & ~E_NOTICE & ~E_DEPRECATED);

define('DS', DIRECTORY_SEPARATOR);
define('ROOT_PATH', dirname(__DIR__) . DS);

// 导出网站数据库表结构。说明：用sql创建表可以重置有id自动增长字段
$db = new SQLite3(ROOT_PATH . 'src\\data\\sqlite\\pagepan.db');
$sql = '';
$tables = $db->query("SELECT name FROM sqlite_master WHERE type ='table' AND name NOT LIKE 'sqlite_%';");
while ($table = $tables->fetchArray(SQLITE3_NUM)) {
    // 导出结构
    $sql .= $db->querySingle("SELECT sql FROM sqlite_master WHERE name = '{$table[0]}'") . ";\n\n";
    // 导出数据
//    $rows = $db->query("SELECT * FROM \"{$table[0]}\"");
//    $sql .= "INSERT INTO \"{$table[0]}\" (";
//    $columns = $db->query("PRAGMA table_info(\"{$table[0]}\")");
//    $fieldnames = array();
//    while ($column = $columns->fetchArray(SQLITE3_ASSOC)) {
//        $fieldnames[] = $column["name"];
//    }
//    $sql .= implode(",", $fieldnames) . ") VALUES";
//    while ($row = $rows->fetchArray(SQLITE3_ASSOC)) {
//        foreach ($row as $k => $v) {
//            $row[$k] = "'" . SQLite3::escapeString($v) . "'";
//        }
//        $sql .= "\n(" . implode(",", $row) . "),";
//    }
//    $sql = rtrim($sql, ",") . ";\n\n";
}

$db = new SQLite3(ROOT_PATH . 'dist\\data\\sqlite\\pagepan.db');
// 导入表结构
$db->exec($sql);
// 导入默认数据
$sql = <<<EOF
        INSERT INTO "site" VALUES (1, 'open_article_css', '1');
        INSERT INTO "site" VALUES (1, 'open_header_php', '0');
        INSERT INTO "site" VALUES (1, 'open_page_cache', '0');
        INSERT INTO "site" VALUES (0, 'sitemap', '');
        INSERT INTO "site" VALUES (1, 'theme', '{"screen":"","base":{"lang":"zh","font-size":"16","primary-color":"#f2254d","secondary-color":"#364fc7","text-color":"#111","background-color":"#fff"}}');
        INSERT INTO "site" VALUES (0, 'page_group', '[{"id":"0","type":"page","title":"页面"},{"id":"","type":"dataset","title":"数据源"},{"id":"1","type":"","title":"未分组"}]');
        INSERT INTO "site" VALUES (1, 'open_global_css', '1');
        INSERT INTO "site" VALUES (1, 'open_graphic_css', '1');
        INSERT INTO "site" VALUES (1, 'open_footer_php', '0');
        INSERT INTO "site" VALUES (1, 'open_global_js', '0');
        INSERT INTO "page" VALUES (1, 1, 0, 1, 100, 1710915843, 0, 0, 'home', '首页', 'home', '', '', '', '', '', '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');
    EOF;
$db->exec($sql);


// 导出统计数据库表结构
$db = new SQLite3(ROOT_PATH . 'src\\data\\sqlite\\stats.db');
$sql = '';
$tables = $db->query("SELECT name FROM sqlite_master WHERE type ='table' AND name NOT LIKE 'sqlite_%';");
while ($table = $tables->fetchArray(SQLITE3_NUM)) {
    $sql .= $db->querySingle("SELECT sql FROM sqlite_master WHERE name = '{$table[0]}'") . ";\n\n";
}
// 导入表结构
$db = new SQLite3(ROOT_PATH . 'dist\\data\\sqlite\\stats.db');
$db->exec($sql);
