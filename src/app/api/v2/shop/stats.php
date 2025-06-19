<?php
return function ($request_data) {
    $unit = $request_data['unit'];
    $where = "page_url LIKE '/shop%'";
    switch ($unit) {
        case 'hour':// 获取 24 小时前的时间戳
            $hour = time() - (24 * 60 * 60);
            // "SELECT COUNT(*) FROM event WHERE visit_time >= :hour"
            break;
        case 'today':
            $today_start = strtotime('today');
            $today_end = strtotime('tomorrow');
            $where = "{$where} AND visit_time >= $today_start AND visit_time < $today_end";
            break;
        case 'yesterday':
            $yesterday = date('Y-m-d', strtotime('-1 day')); // 获取昨天的日期
            $where = "{$where} AND strftime('%Y-%m-%d', timestamp, 'unixepoch', 'localtime') = {$yesterday}";
            break;
        default:
            $hour = time() - (24 * 60 * 60);
            $where = "{$where} AND visit_time >= {$hour}";
            break;
    }

    $sql_views = "SELECT COUNT(*) FROM event WHERE {$where}";
    $sql_visits = "SELECT COUNT(DISTINCT visit_id) FROM event WHERE {$where}";
    $sql_visitors = "SELECT COUNT(DISTINCT visitor_id) FROM event WHERE {$where}";
    $sql_items = "SELECT item_id, COUNT(*) AS item_views FROM event WHERE item_id != '' GROUP BY item_id ORDER BY item_views DESC";


    $db = new SQLite3(ROOT_PATH . 'data/sqlite/visit.db');
    $views = $db->querySingle($sql_views);
    $visits = $db->querySingle($sql_visits);
    $visitors = $db->querySingle($sql_visitors);
    $result = $db->query($sql_items);

    $db2 = new SQLite3(ROOT_PATH . 'data/sqlite/pagepan.db');
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $goods_id = $row['item_id'];
        $item_views = $row['item_views'];
        // 查询 goods 表获取标题
        $sql_goods = "SELECT title FROM goods WHERE id = $goods_id";
        $title = $db2->querySingle($sql_goods);
        $goods_views[] = ['goods_id' => $goods_id, 'title' => $title, 'views' => $item_views];
    }
    $db->close();
    $db2->close();

    Response::json(['views' => $views, 'visits' => $visits, 'visitors' => $visitors, 'goods_views' => $goods_views]);
};