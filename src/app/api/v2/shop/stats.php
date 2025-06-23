<?php
return function ($request_data) {
    $date = $request_data['date'];
    $where = "page_url LIKE '/shop%'";
    switch ($date) {
        case '24hour': // 获取 24 小时前的时间戳
            $hour = time() - (24 * 60 * 60);
            $where = "{$where} AND visit_time >= {$hour}";
            break;
        case 'yesterday':
            $yesterday = date('Y-m-d', strtotime('-1 day')); // 获取昨天的日期
            $where = "{$where} AND strftime('%Y-%m-%d', visit_time, 'unixepoch', 'localtime') = '{$yesterday}'";
            $sql_chart = "SELECT strftime('%Y-%m-%d %H:00', visit_time, 'unixepoch', 'localtime') AS hour, COUNT(*) AS views, COUNT(DISTINCT visitor_id) AS visitors FROM event WHERE {$where} GROUP BY hour ORDER BY hour DESC";
            break;
        case 'week':
            // 确定本周的开始日期
            $start_of_week = strtotime('monday this week');
            $start_date = date('Y-m-d', $start_of_week);
            $where = "{$where} AND DATE(timestamp, 'unixepoch', 'localtime') >= '$start_date'";
            $sql_chart = "SELECT strftime('%Y-%m-%d', visit_time, 'unixepoch', 'localtime') AS hour, COUNT(*) AS views, COUNT(DISTINCT visitor_id) AS visitors FROM event WHERE {$where} GROUP BY hour ORDER BY hour DESC";
            break;
        default:
            $today_start = strtotime('today');
            $today_end = strtotime('tomorrow');
            $where = "{$where} AND visit_time >= $today_start AND visit_time < $today_end";
            $sql_chart = "SELECT strftime('%Y-%m-%d %H:00', visit_time, 'unixepoch', 'localtime') AS hour, COUNT(*) AS views, COUNT(DISTINCT visitor_id) AS visitors FROM event WHERE {$where} GROUP BY hour ORDER BY hour DESC";
            break;
    }
    debug($sql_chart);
    $sql_views = "SELECT COUNT(*) FROM event WHERE {$where}";
    $sql_visits = "SELECT COUNT(DISTINCT visit_id) FROM event WHERE {$where}";
    $sql_visitors = "SELECT COUNT(DISTINCT visitor_id) FROM event WHERE {$where}";
    $sql_items = "SELECT item_id, COUNT(*) AS item_views FROM event WHERE item_id != '' GROUP BY item_id ORDER BY item_views DESC LIMIT 0,10";


    $db = new SQLite3(ROOT_PATH . 'data/sqlite/visit.db');
    $views = $db->querySingle($sql_views); // 浏览量
    $visits = $db->querySingle($sql_visits); // 访问次数
    $visitors = $db->querySingle($sql_visitors); // 独立访客
    $items = $db->query($sql_items); // 商品浏览排行
    $chart_data = _getCharts($db, $sql_chart, $date); // 图表数据

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
            'views' => _formatNumberK($item_views)
        ];
    }

    $db->close();
    $db2->close();

    $data['views'] = _formatNumberK($views);
    $data['visits'] = _formatNumberK($visits);
    $data['visitors'] = _formatNumberK($visitors);
    $data['goods_list'] = $goods_list;

    Response::json(array_merge($data, ['chart_data' => $chart_data]));
};

function _getCharts($db, $sql_chart, $date)
{
    $lables = [];
    $visitors = [];
    $views = [];

    // 查找12个小时段的访问数据
    $result = $db->query($sql_chart);
    // 将查询结果存储到数组中
    $hourly = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $hourly[$row['hour']] = ['visitors' => $row['visitors'], 'views' => $row['views']];
    }

    if ($date == 'today') {
        $hours = _getTodayHours();
    } elseif ($date == 'yesterday') {
        $hours = _getYesterdayHours();
    }



    // 填充缺失的小时数
    $hours = array_reverse($hours);
    foreach ($hours as $hour) {
        $lables[] = $hour;
        if (isset($hourly[$hour])) {
            $visitors[] = $hourly[$hour]['visitors'];
            $views[] = $hourly[$hour]['views'];
        } else {
            $visitors[] = 0;
            $views[] = 0;
        }
    }

    return ['lables' => $lables, 'visitors' => $visitors, 'views' => $views];
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
function getPastDaysOfWeek()
{
    $today = new DateTime(); // 获取当前日期时间
    $currentDayOfWeek = $today->format('w'); // 获取今天是星期几，0 表示星期日，1-6 表示星期一到星期六

    $pastDays = [];
    for ($i = 0; $i < $currentDayOfWeek; $i++) {
        $date = clone $today; // 克隆当前日期，避免修改原始对象
        $date->modify("-$i days"); // 往前推 $i 天
        $pastDays[] = $date->format('Y-m-d'); // 格式化日期并添加到数组
    }

    return array_reverse($pastDays); // 反转数组，使日期按时间先后顺序排列
}

// 格式化数字
function _formatNumberK(float $num): string
{
    if ($num >= 1000) {
        return round($num / 1000, 2) . 'k';
    }
    return (string)$num;
}