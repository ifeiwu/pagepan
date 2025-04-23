<?php
require_once VEN_PATH . 'autoload.php';

// 网站升级（使用覆盖方式）
return function ($request_data) {
    $last_version2 = $request_data['last_version2'];
    $last_version = $request_data['last_version'];
    $cur_version = $request_data['cur_version'];
    $site_domain = $request_data['site_domain'];

    if (_check_writable(ROOT_PATH) == false) {
        Response::error('检测到部分文件或目录缺乏写入权限。');
    }

    if (_backupsql() == false) {
        Response::error('数据库备份失败。');
    }

    // 备份网站文件
    $zipfile = DATA_PATH . 'backup/upgrade-' . date('Ymdh') . '.zip';
    $zipFile = new \PhpZip\ZipFile();
    try {
        $finder = (new \Symfony\Component\Finder\Finder())
            ->exclude('data/backup')
            ->exclude('data/cache')
            ->exclude('data/logs')
            ->exclude('data/file')
            ->exclude('data/pack')
            ->exclude('public/data/file')
            ->exclude('public/data/pack')
            ->exclude('.git')
            ->in(ROOT_PATH);

        $zipFile->addFromFinder($finder);
        $zipFile->saveAsFile($zipfile);
    } catch (\PhpZip\Exception\ZipException $e) {
        Response::error('备份网站失败：' . $e->getMessage());
    } finally {
        $zipFile->close();
    }

    if (!is_file($zipfile)) {
        Response::error('备份网站失败：未找到备份压缩包。');
    }

    // 下载更新文件
    $ctx = stream_context_create(array('http' => array('timeout' => 30)));
    $upgrade_code = file_get_contents('http://get.pagepan.com/install/' . $last_version2 . '/upgrade?t=' . time(), 0, $ctx);

    if ($upgrade_code === false) {
        Response::error('无法远程访问升级文件。');
    }

    $upgrade_file = WEB_ROOT . 'upgrade.php';
    if (file_put_contents($upgrade_file, $upgrade_code) === false) {
        Response::error("无法将数据写入文件【{$upgrade_file}】。");
    }

    Response::success("文件【{$upgrade_file}】已经准备就绪，可以进行升级操作。");
};

// 备份数据库
function _backupsql($sqlname = null)
{
    $dbconf = Config::file('db');

    // Sqlite 不需要备份
    if ($dbconf['type'] == 'sqlite') {
        return true;
    }

    // MySql 导出查询语句文件
    $sqlname = $sqlname ?: date('Ymdhis');
    $sqlfile = DATA_PATH . 'sql/' . $sqlname;
    $mb = new MySQLBackup($dbconf['host'], $dbconf['user'], $dbconf['pass'], $dbconf['name'], $dbconf['port']);
    $mb->addCreateDatabaseIfNotExists(false);
    $mb->setFilename($sqlfile);
    $mb->dump();

    if (is_file($sqlfile . '.sql')) {
        return true;
    } else {
        return false;
    }
}

// 检测文件或目录是否具有写入权限
function _check_writable($directory)
{
    // 打开目录句柄
    if ($handle = opendir($directory)) {
        // 遍历目录中的所有文件和子目录
        while (($item = readdir($handle)) !== false) {
            // 跳过当前目录(.)和上级目录(..)
            if ($item === '.' || $item === '..') {
                continue;
            }

            $filepath = $directory . '/' . $item; // 拼接完整的路径

            // 检查是否是目录
            if (is_dir($filepath)) {
                // 递归检查子目录
                if (!_check_writable($filepath)) {
                    return false; // 如果子目录中任何一个文件或目录没有写入权限
                }
            } elseif (is_file($filepath)) {
                // 检查文件是否可写
                if (!is_writable($filepath)) {
                    return false; // 文件不可写
                }
            }
        }

        closedir($handle); // 关闭目录句柄

        // 检查当前目录是否可写
        if (!is_writable($directory)) {
            return false; // 当前目录不可写
        }

        return true; // 如果所有文件和目录都可写
    } else {
        return false; // 无法打开目录
    }
}