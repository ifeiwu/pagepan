<?php
define('WEB_ROOT', __DIR__ . '/');
define('ROOT_PATH', dirname(WEB_ROOT) . '/');

// 所有错误和异常记录
ini_set('error_reporting', E_ALL & ~E_WARNING & ~E_NOTICE & ~E_DEPRECATED);
ini_set('display_errors', false);
ini_set('ignore_repeated_errors', true);
ini_set('log_errors', true);
ini_set('error_log', ROOT_PATH . 'data/logs/error.log');

require ROOT_PATH . 'library/DB.php';

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

$params = [
    'visit_id' => $visit_id,
    'visitor_id' => $visitor_id,
    'get_id' => $data['get_id'] ?? '',
    'page_id' => $data['page_id'] ?? '',
    'page_url' => $data['page_url'] ?? '',
    'page_alias' => $data['page_alias'] ?? '',
    'referrer' => $data['referrer'] ?? '',
    'visit_time' => time(),
];

$db = DB::new(['debug' => false, 'type' => 'sqlite', 'file' => 'data/sqlite/visit.db', 'prefix' => '']);
$db->insert('event', $params);