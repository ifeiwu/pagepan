<?php
// 清理缓存
return function ($request_data) {
    $cache = $request_data['cache'];
    if (empty($cache)) {
        Response::error('未选择清理缓存');
    }

    $error = 0;
    foreach ($cache as $value) {
        // 更新时间戳，用于清除静态文件缓存
        if ($value == 'timestamp') {
            $is_save = db()->save('site', ['name' => 'timestamp', 'value' => time()], ['name', '=', 'timestamp']);
            if ($is_save === false) {
                $error++;
            }
            $path = CACHE_PATH . 'glide';
            FS::rrmdir($path);
            if (is_dir($path)) {
                $error++;
            }
        } // 所有被缓存页面
        elseif ($value == 'page') {
            $path = CACHE_PATH . 'page';
            FS::rrmdir($path);
            if (is_dir($path)) {
                $error++;
            }
        } // 更新动态组件，用于获取最新组件
        elseif ($value == 'uikit') {
            $path = CACHE_PATH . 'uikit';
            FS::rrmdir($path);
            if (is_dir($path)) {
                $error++;
            }
        }
    }

    if ($error === 0) {
        Response::success('清理缓存成功');
    } else {
        Response::error('清理缓存失败');
    }
};