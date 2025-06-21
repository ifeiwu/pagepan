<?php
date_default_timezone_set('PRC');

define('WEB_ROOT', __DIR__ . '/');
define('ROOT_PATH', dirname(WEB_ROOT) . '/');

// 所有错误和异常记录
ini_set('error_reporting', E_ALL & ~E_WARNING & ~E_NOTICE & ~E_DEPRECATED);
ini_set('display_errors', false);
ini_set('ignore_repeated_errors', true);
ini_set('log_errors', true);
ini_set('error_log', ROOT_PATH . 'data/logs/error.log');

if ($_POST) {
    $events = $_POST['events_json'];
    $events = json_decode($events, true);
    $data = $events[0]['properties'];
    $data['referrer'] = '';
    $visit_id = $_POST['visit_token'];
    $visitor_id = $_POST['visitor_token'];
} else {
    $body_data = file_get_contents('php://input');
    $data = json_decode($body_data, true);
    $visit_id = $data['visit_token'];
    $visitor_id = $data['visitor_token'];
}

if (!$visitor_id) {
    exit;
}

$db = new SQLite3(ROOT_PATH . 'data/sqlite/visit.db');
$statement = $db->prepare('INSERT INTO "event" ("visit_time", "visit_id", "visitor_id", "item_id", "page_id", "page_alias", "page_url", "referrer") VALUES (:visit_time, :visit_id, :visitor_id, :item_id, :page_id, :page_alias, :page_url, :referrer)');
$statement->bindValue(':visit_time', time());
$statement->bindValue(':visit_id', $visit_id);
$statement->bindValue(':visitor_id', $visitor_id);
$statement->bindValue(':item_id', $data['get_id'] ?? '');
$statement->bindValue(':page_id', $data['page_id'] ?? '');
$statement->bindValue(':page_alias', $data['page_alias'] ?? '');
$statement->bindValue(':page_url', $data['page_url'] ?? '');
$statement->bindValue(':referrer', $data['referrer'] ?? '');
$statement->execute();
$db->close();