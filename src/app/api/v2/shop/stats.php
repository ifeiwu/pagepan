<?php
return function ($request_data) {
    $unit = $request_data['unit'];
    $where = "page_url LIKE '/shop%'";
    switch ($unit) {
        case 'today':
            $today_start = strtotime('today');
            $today_end = strtotime('tomorrow');
            $where = "{$where} AND visit_time >= $today_start AND visit_time < $today_end";
            break;
        case 'yesterday':
            $yesterday = date('Y-m-d', strtotime('-1 day')); // 获取昨天的日期
            $where = "{$where} AND strftime('%Y-%m-%d', visit_time, 'unixepoch', 'localtime') = {$yesterday}";
            break;
        default: // 获取 24 小时前的时间戳
            $hour = time() - (24 * 60 * 60);
            $where = "{$where} AND visit_time >= {$hour}";
            break;
    }

    $sql_views = "SELECT COUNT(*) FROM event WHERE {$where}";
    $sql_visits = "SELECT COUNT(DISTINCT visit_id) FROM event WHERE {$where}";
    $sql_visitors = "SELECT COUNT(DISTINCT visitor_id) FROM event WHERE {$where}";
    $sql_items = "SELECT item_id, COUNT(*) AS item_views FROM event WHERE item_id != '' GROUP BY item_id ORDER BY item_views DESC LIMIT 0,10";

    $sql_charts = "
        SELECT
            strftime('%Y-%m-%d %H:00', visit_time, 'unixepoch', 'localtime') AS hour,
            COUNT(*) AS views,
            COUNT(DISTINCT visitor_id) AS visitors
        FROM
            event
        WHERE
            visit_time >= strftime('%s', datetime('now', '-12 hours'))
        GROUP BY
            hour
        ORDER BY
            hour DESC;
    ";

    $db = new SQLite3(ROOT_PATH . 'data/sqlite/visit.db');
    $views = $db->querySingle($sql_views);
    $visits = $db->querySingle($sql_visits);
    $visitors = $db->querySingle($sql_visitors);
    $result_items = $db->query($sql_items);

    $chart_data = _getCharts($db, $sql_charts);

    $db2 = new SQLite3(ROOT_PATH . 'data/sqlite/pagepan.db');
    while ($row = $result_items->fetchArray(SQLITE3_ASSOC)) {
        $goods_id = $row['item_id'];
        $item_views = $row['item_views'];
        // 查询 goods 表获取标题
        $sql_goods = "SELECT title,price,image,path FROM goods WHERE id = $goods_id";
        $goods = $db2->query($sql_goods)->fetchArray(SQLITE3_ASSOC);
        $goods_list[] = [
            'goods_id' => $goods_id,
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
        $lable = _convertTime($hour);
        $lables[] = $lable;
        $dates[] = $hour;
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

function _convertTime($timeString) {
    $date = DateTime::createFromFormat('Y-m-d H:i', $timeString);
    $formattedTime = $date->format('a g:i');
    $formattedTime = str_replace(['am', 'pm'], ['上午', '下午'], $formattedTime);
    return $formattedTime;
}

function _formatNumberK(float $num): string
{
    if ($num >= 1000) {
        return round($num / 1000, 2) . 'k';
    }
    return (string)$num;
}