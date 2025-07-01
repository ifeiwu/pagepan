<?php
return function ($request_data) {
    $db = db();
    $db->debug = false;

    $tab = $request_data['tab'];
    switch ($tab) {
        case 'today':
            $where = "DATE(ctime, 'unixepoch') = DATE('now')";
            break;
        case 'yesterday':
            $where = "DATE(ctime, 'unixepoch') = DATE('now', '-1 day')";
            break;
        case 'week':
            $where = "ctime BETWEEN strftime('%s', 'now', 'weekday 0', '-7 days') AND strftime('%s', 'now', 'weekday 0', '-1 days')";
            break;
        case 'month':
            $where = "strftime('%Y-%m', datetime(ctime, 'unixepoch')) = strftime('%Y-%m', 'now')";
            break;
        case 'year':
            $where = "strftime('%Y', datetime(ctime, 'unixepoch')) = strftime('%Y', 'now')";
            break;
        default:
            $where = '1=1';
            break;
    }

    $sql_count = "select count(id) from `order` WHERE {$where}";
    $sql_total = "select sum(total) from `order` WHERE {$where}";
    $today_count = $db->query($sql_count, [], 0);
    $today_total = $db->query($sql_total, [], 0);

    Response::success('订单统计', [], [
        'today_count' => $today_count ?? 0,
        'today_total' => $today_total ?? 0,
    ]);
};