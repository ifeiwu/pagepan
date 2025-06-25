<?php
return function ($request_data) {
    $tab = $request_data['tab'];
    $where = "page_url LIKE '/shop%'";
    switch ($tab) {
        case 'yesterday':
            $where = "{$where} AND DATE(ctime, 'unixepoch') = DATE('now', '-1 day')";
            $sql_chart = "SELECT strftime('%Y-%m-%d %H:00', ctime, 'unixepoch', 'localtime') AS vtime, COUNT(*) AS views, COUNT(DISTINCT visitor_id) AS visitors FROM event WHERE {$where} GROUP BY vtime ORDER BY vtime DESC";
            break;
        case 'week':
            $where = "{$where} AND ctime BETWEEN strftime('%s', 'now', 'weekday 0', '-7 days') AND strftime('%s', 'now', 'weekday 0', '-1 days')";
            $sql_chart = "SELECT strftime('%Y-%m-%d', ctime, 'unixepoch', 'localtime') AS vtime, COUNT(*) AS views, COUNT(DISTINCT visitor_id) AS visitors FROM event WHERE {$where} GROUP BY vtime ORDER BY vtime DESC";
            break;
        case 'month':
            $where = "{$where} AND strftime('%Y-%m', datetime(ctime, 'unixepoch')) = strftime('%Y-%m', 'now', 'localtime')";
            $sql_chart = "SELECT strftime('%Y-%m-%d', ctime, 'unixepoch', 'localtime') AS vtime, COUNT(*) AS views, COUNT(DISTINCT visitor_id) AS visitors FROM event WHERE {$where} GROUP BY vtime ORDER BY vtime DESC";
            break;
        case 'year':
            $where = "{$where} AND strftime('%Y', datetime(ctime, 'unixepoch', 'localtime')) = strftime('%Y', 'now')";
            $sql_chart = "SELECT strftime('%Y-%m', ctime, 'unixepoch', 'localtime') AS vtime, COUNT(*) AS views, COUNT(DISTINCT visitor_id) AS visitors FROM event WHERE {$where} GROUP BY vtime ORDER BY vtime DESC";
            break;
        default:
            $where = "{$where} AND DATE(ctime, 'unixepoch', 'localtime') = DATE('now', 'localtime')";
            $sql_chart = "SELECT strftime('%Y-%m-%d %H:00', ctime, 'unixepoch', 'localtime') AS vtime, COUNT(*) AS views, COUNT(DISTINCT visitor_id) AS visitors FROM event WHERE {$where} GROUP BY vtime ORDER BY vtime DESC";
            break;
    }

    $sql_views = "SELECT COUNT(*) FROM event WHERE {$where}";
    $sql_visits = "SELECT COUNT(DISTINCT visit_id) FROM event WHERE {$where}";
    $sql_visitors = "SELECT COUNT(DISTINCT visitor_id) FROM event WHERE {$where}";
    $sql_items = "SELECT item_id, COUNT(*) AS item_views, page_url FROM event WHERE item_id != '' GROUP BY item_id ORDER BY item_views DESC LIMIT 0,10";

    $db = new SQLite3(ROOT_PATH . 'data/sqlite/stats.db');
    $views = $db->querySingle($sql_views); // 浏览量
    $visits = $db->querySingle($sql_visits); // 访问次数
    $visitors = $db->querySingle($sql_visitors); // 独立访客
    $items = $db->query($sql_items); // 商品浏览排行
    $chart_data = _getCharts($db, $sql_chart, $tab); // 图表数据

    $db2 = new SQLite3(ROOT_PATH . 'data/sqlite/pagepan.db');
    while ($row = $items->fetchArray(SQLITE3_ASSOC)) {
        $goods_id = $row['item_id'];
        $item_views = $row['item_views'];
        $sql_goods = "SELECT title,price,image,path FROM goods WHERE id = $goods_id";
        $goods = $db2->query($sql_goods)->fetchArray(SQLITE3_ASSOC);
        $goods_list[] = [
            'id' => $goods_id,
            'title' => $goods['title'],
            'price' => $goods['price'],
            'image' => "{$goods['path']}/{$goods['image']}",
            'page_url' => ltrim($row['page_url'], '/'),
            'views' => _formatNumberK($item_views)
        ];
    }

    $db->close();
    $db2->close();

    $data['tab'] = $tab;
    $data['views'] = _formatNumberK($views);
    $data['visits'] = _formatNumberK($visits);
    $data['visitors'] = _formatNumberK($visitors);
    $data['goods_list'] = $goods_list;

    Response::json(array_merge($data, ['chart_data' => $chart_data]));
};

// 获取图表数据
function _getCharts($db, $sql_chart, $tab)
{
    $unit = 'hour';
    $lables = [];
    $visitors = [];
    $views = [];

    // 查找到的访问时间
    $result = $db->query($sql_chart);
    $vtimes = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $vtimes[$row['vtime']] = ['visitors' => $row['visitors'], 'views' => $row['views']];
    }

    // 获取所有时间段
    $alltime = [];
    if ($tab == 'today') {
        $alltime = _getTodayHours();
    } elseif ($tab == 'yesterday') {
        $alltime = _getYesterdayHours();
    } elseif ($tab == 'week') {
        $alltime = _getWeekDays();
    } elseif ($tab == 'month') {
        $alltime = _getMonthDays();
    } elseif ($tab == 'year') {
        $alltime = _getYearMonths();
    }
    // 填充没有的访问时间
    foreach ($alltime as $time) {
        $lables[] = $time;
        if (isset($vtimes[$time])) {
            $visitors[] = $vtimes[$time]['visitors'];
            $views[] = $vtimes[$time]['views'];
        } else {
            $visitors[] = 0;
            $views[] = 0;
        }
    }

    return ['lables' => $lables, 'visitors' => $visitors, 'views' => $views, 'tab' => $tab];
}

// 获取今天的时间段
function _getTodayHours()
{
    // 获取当前小时 (24小时制)
    $cur_hour = intval(date('H'));
    $hours = [];
    // 循环生成今天已经过的小时
    for ($i = 0; $i <= $cur_hour; $i++) {
        $hour = date('Y-m-d H:00', strtotime(date('Y-m-d ' . $i . ':00')));
        $hours[] = $hour;
    }
    return $hours;
}

// 获取昨天的时间段
function _getYesterdayHours()
{
    $yesterday = date('Y-m-d', strtotime('yesterday'));
    $hours = [];
    for ($i = 0; $i < 24; $i++) {
        $timestamp = strtotime($yesterday . " " . sprintf('%02d', $i) . ':00:00');
        $hours[] = date('Y-m-d H:00', $timestamp);
    }
    return $hours;
}

// 获取本周已过天数的数组
function _getWeekDays()
{
    $dateTime = new DateTime('monday this week');
    $days = [];
    for ($i = 0; $i < 7; $i++) {
        $days[] = $dateTime->format('Y-m-d');
        $dateTime->modify('+1 day');
    }
    return $days;
}

// 获取本月已过天数
function _getMonthDays()
{
    $today = new DateTime(); // 获取当前日期
    $year = (int)$today->format('Y'); // 获取年份
    $month = (int)$today->format('m'); // 获取月份
    $day = (int)$today->format('d');   // 获取当前是哪一天
    $days = [];
    for ($i = 1; $i <= $day; $i++) {
        $days[] = sprintf('%04d-%02d-%02d', $year, $month, $i); // 格式化日期
    }
    return $days;
}

// 获取一年的月份
function _getYearMonths()
{
    $months = [];
    $year = date('Y');
    for ($i = 1; $i <= 12; $i++) {
        $months[] = sprintf('%04d-%02d', $year, $i); // 格式化日期;
    }
    return $months;
}

// 格式化数字
function _formatNumberK(float $num): string
{
    if ($num >= 1000) {
        return round($num / 1000, 2) . 'k';
    }
    return (string)$num;
}