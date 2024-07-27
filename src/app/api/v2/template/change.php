<?php
// 更换模板
return function ($request_data) {
    $version = $request_data['version'];

    if ( Config::file('db', 'type') != 'sqlite' ) {
        Response::error('目录只支持 SQLite 数据库更换网站模板！');
    }

    $zip_path = DATA_PATH . 'backup/';
    $zip_name = 'template-' . date('Ymdhi') . '.zip';
    $zip_file = $zip_path . $zip_name;
    if ( ! FS::rmkdir($zip_path) ) {
        Response::error('创建目录失败：' . $zip_path);
    }

    // 备份网站文件
    try {
        loader_vendor();
        $zipFile = new \PhpZip\ZipFile();
        $finder = (new \Symfony\Component\Finder\Finder())
            ->exclude('.git')
            ->exclude('vendor')
            ->exclude('data/!backup')
            ->exclude('data/backup')
            ->exclude('data/cache')
            ->exclude('data/pack')
            ->in(ROOT_PATH);

        $zipFile->addFromFinder($finder);
        $zipFile->saveAsFile($zip_file);
        $count = $zipFile->count();
        $zipFile->close();

        if ( $count == 0 ) {
            Response::error('压缩文件出错：' . $zip_file);
        }
    } catch(\PhpZip\Exception\ZipException $e) {
        Response::error($e->getMessage());
    }

    // 下载更新文件
    $ctx = stream_context_create(array('http' => array('timeout' => 10)));
    $url = 'http://get.pagepan.com/install/' . $version . '/template?t=' . time();
    $code = file_get_contents($url, false, $ctx);
    $filename = ROOT_PATH . 'template.php';
    if ( ! file_put_contents($filename, $code) ) {
        Response::error('无法写入更新文件：' . $filename);
    }

    // 执行更新文件
    $url = $request_data['domain'] . '/template.php';
    $data = ['demo' => $request_data['demo'], 'version' => $version]; // 更换模板的URL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    $res = curl_exec($ch);
    curl_close($ch);

    $res = json_decode($res, true);
    if ( $res['code'] == 1 ) {
        Response::error($res['message']);
    }

    Response::success($res['message']);
};