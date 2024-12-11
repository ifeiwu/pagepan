<?php
return function ($request_data) {
    $db = db();
    $db->debug = false;
    $today_count = $db->query("select count(id) from `order` where strftime('%Y-%m-%d', datetime(ctime, 'unixepoch')) = strftime('%Y-%m-%d', 'now');", [], 0);
    $today_total = $db->query("select sum(price) from `order` where strftime('%Y-%m-%d', datetime(ctime, 'unixepoch')) = strftime('%Y-%m-%d', 'now');", [], 0);
    $yesterday_total = $db->query("select sum(price) from `order` where strftime('%Y-%m-%d', datetime(ctime, 'unixepoch')) = strftime('%Y-%m-%d', 'now', '-1 day');", [], 0);

    Response::success('订单统计', [], [
        'today_count' => $today_count ?? 0,
        'today_total' => $today_total ?? 0,
        'yesterday_total' => $yesterday_total ?? 0
    ]);
};