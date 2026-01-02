<?php
return function ($request_data) {
    unset($request_data['_removefiles']);
    $callback = require '_save.php';

    // 响应数据
    if ($callback($request_data) === true) {
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

        // 写入文件
        $manifest = json_encode($request_data['manifest'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        file_put_contents(WEB_DATA_PATH . 'manifest/manifest.json', $manifest);

        Response::success('保存成功');
    } else {
        Response::error('保存失败');
    }
};