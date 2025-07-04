<?php
//
return function () {
    $public_path = ROOT_PATH . 'public';
    $public_data_path = $public_path . '/data';
    if (FS::rmkdir($public_data_path) === false) {
        Response::error("创建【{$public_data_path}】目录失败");
    }

    if (is_file($public_path . 'index.php')) {
        Response::success("网站Web根目录已经是【/public】");
    }

    // 备份站点
    loader_vendor();
    $zipname = date('Ymdh');
    $zipfile = ROOT_PATH . "data/backup/{$zipname}.zip";
    if (!is_file($zipfile)) {
        $zip = new \PhpZip\ZipFile();
        try {
            $finder = (new \Symfony\Component\Finder\Finder())
                ->exclude('data/backup/')
                ->exclude('public/')
                ->exclude('vendor/')
                ->exclude('.git')
                ->in(ROOT_PATH);
            $zip->addFromFinder($finder);
            $zip->saveAsFile($zipfile);
        } catch (\PhpZip\Exception\ZipException $e) {
            throw new Exception($e->getMessage());
        } finally {
            $zip->close();
        }

        if (!is_file($zipfile) || filesize($zipfile) < 10000) {
            Response::success('备份网站失败');
        }
    }

    if (FS::rcopy(ROOT_PATH . 'assets', $public_path . '/assets') === true) {
        FS::rrmdir(ROOT_PATH . 'assets');
    }
    if (FS::rcopy(ROOT_PATH . 'data/file', $public_data_path . '/file') === true) {
        FS::rrmdir(ROOT_PATH . 'data/file');
    }
    if (FS::rcopy(ROOT_PATH . 'data/json', $public_data_path . '/json') === true) {
        FS::rrmdir(ROOT_PATH . 'data/json');
    }
    if (FS::rcopy(ROOT_PATH . 'data/pack', $public_data_path . '/pack') === true) {
        FS::rrmdir(ROOT_PATH . 'data/pack');
    }
    if (FS::rcopy(ROOT_PATH . 'data/fonts', $public_data_path . '/font') === true) {
        FS::rrmdir(ROOT_PATH . 'data/fonts');
    }
    if (FS::rcopy(ROOT_PATH . 'data/font', $public_data_path . '/font') === true) {
        FS::rrmdir(ROOT_PATH . 'data/font');
    }
    if (FS::rcopy(ROOT_PATH . 'data/js', $public_data_path . '/js') === true) {
        FS::rrmdir(ROOT_PATH . 'data/js');
    }
    if (FS::rcopy(ROOT_PATH . 'data/css', $public_data_path . '/css') === true) {
        FS::rrmdir(ROOT_PATH . 'data/css');
    }

    $db = db();
    $site = $db->select('site', ['name', 'value'], ['state', '=', 1]);
    $site = helper('arr/tokv', [$site]);
    $logo = $site['logo'];
    if ($logo && strlen($logo) > 2) {
        if (FS::rcopy(ROOT_PATH . $logo, $public_path . "/{$logo}") === true) {
            unlink(ROOT_PATH . $logo);
        }
    }
    $favicon = $site['favicon'];
    if ($favicon && strlen($favicon) > 2) {
        if (FS::rcopy(ROOT_PATH . $favicon, $public_path . "/{$favicon}") === true) {
            unlink(ROOT_PATH . $favicon);
        }
    }
    $touchicon = $site['touchicon'];
    if ($touchicon && strlen($touchicon) > 2) {
        if (FS::rcopy(ROOT_PATH . $touchicon, $public_path . "/{$touchicon}") === true) {
            unlink(ROOT_PATH . $touchicon);
        }
    }
    if (FS::rcopy(ROOT_PATH . '.htaccess', $public_path . '/.htaccess') === true) {
        unlink(ROOT_PATH . '.htaccess');
    }
    if (FS::rcopy(ROOT_PATH . 'robots.txt', $public_path . '/robots.txt') === true) {
        unlink(ROOT_PATH . 'robots.txt');
    }

    $index_file = $public_path . '/index.php';
    if (FS::rcopy(ROOT_PATH . 'index.php', $index_file) === true) {
        $index_code = file_get_contents($index_file);
        if ($index_code) {
            $index_code = str_replace("define('ROOT_PATH', WEB_ROOT);", "define('ROOT_PATH', dirname(WEB_ROOT) . '/');", $index_code);
            if (!file_put_contents($index_file, $index_code)) {
                Response::error('写入文件失败：' . $index_file);
            }
        } else {
            Response::error('获取文件内容失败：' . $index_file);
        }
        unlink(ROOT_PATH . 'index.php');
    }

    Response::success("必要文件已经移动至【/public】目录，您现在可以将 public 目录设置为Web根目录。");
};