<?php
return function ($request_data) {
    $unit = $request_data['unit'];
    $where = "page_url LIKE '/shop%'";
    switch ($unit) {
        case '24hour': // 获取 24 小时前的时间戳
            $hour = time() - (24 * 60 * 60);
            $where = "{$where} AND visit_time >= {$hour}";
            break;
        case 'yesterday':
            $yesterday = date('Y-m-d', strtotime('-1 day')); // 获取昨天的日期
            $where = "{$where} AND strftime('%Y-%m-%d', visit_time, 'unixepoch', 'localtime') = {$yesterday}";
            break;
        default:
            $today_start = strtotime('today');
            $today_end = strtotime('tomorrow');
            $where = "{$where} AND visit_time >= $today_start AND visit_time < $today_end";
            break;
    }

    $sql_views = "SELECT COUNT(*) FROM event WHERE {$where}";
    $sql_visits = "SELECT COUNT(DISTINCT visit_id) FROM event WHERE {$where}";
    $sql_visitors = "SELECT COUNT(DISTINCT visitor_id) FROM event WHERE {$where}";
    $sql_items = "SELECT item_id, COUNT(*) AS item_views FROM event WHERE item_id != '' GROUP BY item_id ORDER BY item_views DESC LIMIT 0,10";
    $sql_charts = "SELECT strftime('%Y-%m-%d %H:00', visit_time, 'unixepoch', 'localtime') AS hour, COUNT(*) AS views, COUNT(DISTINCT visitor_id) AS visitors FROM event WHERE visit_time >= strftime('%s', datetime('now', '-12 hours')) GROUP BY hour ORDER BY hour DESC;";

    $db = new SQLite3(ROOT_PATH . 'data/sqlite/visit.db');
    $views = $db->querySingle($sql_views); // 浏览量
    $visits = $db->querySingle($sql_visits); // 访问次数
    $visitors = $db->querySingle($sql_visitors); // 独立访客
    $items = $db->query($sql_items); // 商品浏览排行
    $chart_data = _getCharts($db, $sql_charts); // 图表数据

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

function _getCharts($db, $sql)
{
    $result = $db->query($sql);

    // 3. 将查询结果存储到数组中
    $hourly = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $hourly[$row['hour']] = ['visitors' => $row['visitors'], 'views' => $row['views']];
    }

    // 4. 创建包含所有小时的数组
    $all_hours = [];
    $current_time = time();
    for ($i = 0; $i < 12; $i++) {
        $hour = strftime('%Y-%m-%d %H:00', $current_time - $i * 3600);
        $all_hours[] = $hour;
    }

    $lables = [];
    $dates = [];
    $visitors = [];
    $views = [];

    // 5. 填充缺失的小时数
    foreach ($all_hours as $hour) {
        $lables[] = strtotime($hour);
        $dates[] = date('H点（Y年m月d日）', strtotime($hour));
        if (isset($hourly[$hour])) {
            $visitors[] = $hourly[$hour]['visitors'];
            $views[] = $hourly[$hour]['views'];
        } else {
            $visitors[] = 0;
            $views[] = 0;
        }
    }

    return ['lables' => $lables, 'dates' => $dates, 'visitors' => $visitors, 'views' => $views];
}

function _formatNumberK(float $num): string
{
    if ($num >= 1000) {
        return round($num / 1000, 2) . 'k';
    }
    return (string)$num;
}