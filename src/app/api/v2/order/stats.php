<?php
return function ($request_data) {
    $db = db();
    $db->debug = false;
    $day = intval($request_data['day']);
    if ($day === 0 || $day === -1) {
        $where = "where strftime('%Y-%m-%d', datetime(ctime, 'unixepoch')) = strftime('%Y-%m-%d', 'now', '{$day} day')";
        $sql_count = "select count(id) from `order` {$where}";
        $sql_total = "select sum(total) from `order` {$where}";
    } else {
        $where = "where strftime('%Y-%m-%d', datetime(ctime, 'unixepoch')) >= strftime('%Y-%m-%d', 'now', '{$day} day') AND strftime('%Y-%m-%d', datetime(ctime, 'unixepoch')) <= strftime('%Y-%m-%d', 'now')";
        $sql_count = "select count(id) from `order` {$where}";
        $sql_total = "select sum(total) from `order` {$where}";
    }
    $today_count = $db->query($sql_count, [], 0);
    $today_total = $db->query($sql_total, [], 0);

    Response::success('订单统计', [], [
        'today_count' => $today_count ?? 0,
        'today_total' => $today_total ?? 0,
    ]);
};