<?php
return function ($request_data) {
    $db = db();
    $db->debug = false;
    $day = intval($request_data['day']);
    $today_count = $db->query("select count(id) from `order` where strftime('%Y-%m-%d', datetime(ctime, 'unixepoch')) = strftime('%Y-%m-%d', 'now', '{$day} day');", [], 0);
    $today_total = $db->query("select sum(total) from `order` where strftime('%Y-%m-%d', datetime(ctime, 'unixepoch')) = strftime('%Y-%m-%d', 'now', '{$day} day');", [], 0);

    Response::success('订单统计', [], [
        'today_count' => $today_count ?? 0,
        'today_total' => $today_total ?? 0,
    ]);
};