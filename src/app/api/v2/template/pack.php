<?php
// 打包模板
return function ($request_data) {
    set_time_limit(300);

    $zip_path = WEB_ROOT . 'data/pack/';
    $zip_name = 'template.zip';
    $zip_file = $zip_path . $zip_name;
    if ( ! FS::rmkdir($zip_path) ) {
        Response::error('创建目录失败：' . $zip_path);
    }

    try {
        loader_vendor();
        $zipFile = new \PhpZip\ZipFile();
        $finder = (new \Symfony\Component\Finder\Finder())
            ->exclude('.git')
            ->exclude('data/backup')
            ->exclude('data/logs')
            ->exclude('data/cache')
            ->exclude('data/sql')
            ->exclude('data/pack')
            ->exclude('public/data/pack')
            ->notPath('install.lock')
            ->notPath('robots.txt')
            ->notPath('app/api/token.php')
            ->notPath('app/extension/token.php')
            ->in(ROOT_PATH);

        $zipFile->addFromFinder($finder);
        $zipFile->saveAsFile($zip_file);
        $count = $zipFile->count();
        $zipFile->close();

        if ( $count > 0 ) {
            Response::success();
        } else {
            Response::error('压缩文件出错：' . $zip_file);
        }
    } catch(\PhpZip\Exception\ZipException $e) {
        Response::error($e->getMessage());
    }
};