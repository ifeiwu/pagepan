<?php
return function ($request_data) {
//    unset($request_data['admin']);
//
//    // 添加更新时间
//    $request_data[] = [
//        'name' => 'timestamp',
//        'value' => time()
//    ];
//
//    // 保存站点数据
//    $db = db();
//    $error = [];
//    foreach ($request_data as $key => $vo) {
//        if (!is_numeric($key)) {
//            continue;
//        }
//        $is_save = $db->save('site', $vo, array('name', '=', $vo['name']));
//        if ($is_save === false) {
//            $error[] = $name;
//        }
//    }
    $res = call_user_func_array(require 'save.php', [$request_data]);
//    $res = $save($request_data);
    debug($res);
    // 响应数据
    if (count($error) === 0) {
        $request_data['manifest']["display"] = "standalone";
        $request_data['manifest']["oriention"] = "landscape";
        $request_data['manifest']["icons"] = [
            [
                "src" => "icons/icon-192.png",
                "sizes" => "192x192",
                "type" => "image/png"
            ],
            [
                "src" => "icons/icon-512.png",
                "sizes" => "512x512",
                "type" => "image/png"
            ]
        ];

        $manifest = json_encode($request_data['manifest'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        file_put_contents(WEB_DATA_PATH . 'manifest/manifest.json', $manifest);

        return Response::success('保存数据成功');
    } else {
        return Response::error('保存数据失败');
    }
};