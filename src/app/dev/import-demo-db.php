<?php
// http://192.168.31.5:8087/dev/import-demo-db
return function ($request_data) {
    echo '更新演示数据库<br>-----------------------<br><br>';

    // AI生成输入：
    // 1、生成20条JSON格式的家具作品列表示例数据，字段有：分类(category)，标题(title)，副标题(subtitle)，摘要(summary)，标签(tags)，详情内容(content)。只需要分类有桌子，椅子，电脑桌。标签用空格分开。详情内容至少500字。字段是英文，值是中文的数据。
    // 2、生成10条JSON格式的家具问答列表示例数据，字段有：分类(category)，标题(title)，详情内容(content)。只需要分类有衣柜，窗帘，梳妆台。
    // 3、生成20条JSON格式的资源库列表示例数据，字段有：分类(category)，标题(title)，摘要(summary)。分类有设计、科技、文化。值要中文的

    $json = '[
    {
        "category": "Music",
        "image": "applemusic.svg",
        "title": "Apple Music",
        "subtitle": "苹果公司提供的音乐串流平台，拥有数百万首歌曲和精选专辑，适合iOS和Android用户。",
        "link": "https://www.apple.com/apple-music/"
    },
    {
        "category": "Music",
        "image": "spotify.svg",
        "title": "Spotify",
        "subtitle": "全球领先的流行音乐串流服务，用户可以免费或付费订阅，享受广泛的音乐库和个性化推荐。",
        "link": "https://www.spotify.com/"
    },
    {
        "category": "Music",
        "image": "tidal.svg",
        "title": "TIDAL",
        "subtitle": "高保真音乐串流服务，提供无损音质音乐流畅播放，专注于音乐品质和艺术家支持。",
        "link": "https://tidal.com/"
    },
    {
        "category": "Music",
        "image": "youtubemusic.svg",
        "title": "YouTube Music",
        "subtitle": "由YouTube推出的音乐平台，整合了音乐视频和音频流，为用户提供广泛的音乐内容和社交功能。",
        "link": "https://music.youtube.com/"
    }
]';

    $db = DB::new(['debug' => false, 'type' => 'sqlite', 'file' => 'data/sqlite/demo.db', 'prefix' => '']);
    $table = 'url_nav';
    $items = json_decode($json, true);
    foreach ($items as $item) {
        $page_id = 6;
        $category_id = 0;
        $category_title = $item['category'];
        $title = $item['title'];
        $subtitle = $item['subtitle'];
        $summary = $item['summary'];
        $image = $item['image'];
        $link = $item['link'];
        $bgc = $item['bgc'];
        $tags = $item['tags'];
        $ctime = strtotime($item['ctime']);
        $utime = strtotime($item['utime']);
        $content = $item['content'];
        $levels = [];

        // 分类
        if (!$db->has($table, [['title', '=', $category_title], 'AND', ['type', '=', 2], 'AND', ['page_id', '=', $page_id]])) {
            $category_id = $db->insert($table, ['page_id' => $page_id, 'title' => $category_title, 'type' => 2, 'state' => 1], 'id');
            $level = _getLevel($db, $table, '', $category_id);
            $db->update($table, ['level' => $level], ['id', '=', $category_id]);
            echo "insert category: $category_id<br>";
        } else {
            $category_id = $db->find($table, 'id', [['title', '=', $category_title], 'AND', ['page_id', '=', $page_id]], null, 0);
            $level = _getLevel($db, $table, '', $category_id);
            $db->update($table, ['level' => $level], ['id', '=', $category_id]);
            echo "update category: $category_id<br>";
        }

        // 项目
        $item = $db->find($table, '*', [['title', '=', $title], 'AND', ['type', '=', 1], 'AND', ['page_id', '=', $page_id]]);
        if (!$item) {
            $id = $db->insert($table, ['page_id' => $page_id, 'pid' => $category_id, 'title' => $title, 'subtitle' => $subtitle, 'summary' => $summary, 'image' => $image, 'link' => $link, 'bgc' => $bgc, 'tags' => $tags, 'content' => $content, 'ctime' => $ctime, 'utime' => $utime, 'type' => 1, 'state' => 1], 'id');
            $level = _getLevel($db, $table, $category_id, $id);
            $db->update($table, ['level' => $level], ['id', '=', $id]);
            echo "insert item: $id<br>";
        } else {
            $id = $item['id'];
            $level = _getLevel($db, $table, $category_id, $id);
            $db->update($table, ['level' => $level, 'subtitle' => $subtitle, 'summary' => $summary, 'image' => $image, 'bgc' => $bgc, 'tags' => $tags, 'content' => $content, 'ctime' => $ctime, 'utime' => $utime], array('id', '=', $id));
            echo "update item: $id<br>";
        }
    }
};

function _getLevel($db, $table, $pid, $id = 0, $list = []) {
    if ($pid === '') {
        $pid = $db->find($table, 'pid', array('id', '=', $id), null, 0);
    }

    if ($pid != 0) {
        $list[] = $pid;
        _getLevel($db, $table, '', $pid, $list);
    }

    if (count($list) == 0) {
        return ',' . $id . ',';
    } else {
        if ($id) {
            return ',' . implode(',', array_reverse($list)) . ',' . $id . ',';
        } else {
            return ',' . implode(',', array_reverse($list)) . ',';
        }
    }
}