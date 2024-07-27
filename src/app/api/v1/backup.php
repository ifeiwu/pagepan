<?php
use utils\FS;
use utils\Log;

class Backup extends Base
{
    private $backup_path;

    private $sql_path;

    function __construct() {
        $this->backup_path = ROOT_PATH . 'data/backup/';
        if (FS::rmkdir($this->backup_path)) {
            FS::write($this->backup_path . '.htaccess', 'deny from all');
        }

        $this->sql_path = ROOT_PATH . 'data/sql/';
        if (FS::rmkdir($this->sql_path)) {
            FS::write($this->sql_path . '.htaccess', 'deny from all');
        }
    }


    // 备份整站
    protected function postSite($request_data) {
        $filename = date('Ymdhis') . '-' . rand();
        $zipfile = $this->backup_path . $filename . '.zip';
        if (!$this->_dumpSql($filename)) {
            Log::alert('备份数据库失败！');
        }

        $zipFile = new \PhpZip\ZipFile();

        try {
            $finder = (new \Symfony\Component\Finder\Finder())
                ->exclude('!backup/')
                // ->exclude('data/')
                // ->exclude('vendor/')
                ->exclude('.git')
                ->in(ROOT_PATH);
            $zipFile->addFromFinder($finder);
            $zipFile->saveAsFile($zipfile);
        } catch (\PhpZip\Exception\ZipException $e) {
            throw new Exception($e->getMessage());
        } finally {
            $zipFile->close();
        }

        if (is_file($zipfile)) {
            return $this->_success(['filename' => $filename, 'base_uri' => $_SERVER['HTTP_BASEURI'] . '!backup/']);
        } else {
            return $this->_error(['filename' => $filename, 'base_uri' => $_SERVER['HTTP_BASEURI'] . '!backup/']);
        }
    }

    // 备份数据库
    protected function postDatabase() {
        $sqlname = date('Ymdhis') . '-' . rand();
        $sqlpath = $this->sql_path . $sqlname;
        if ($this->_dumpSql($sqlname)) {
            return $this->_success(['name' => $sqlname . '.sql', 'size' => filesize($sqlpath . '.sql')]);
        } else {
            return $this->_error();
        }
    }

    /**
     * 导出 SQL
     * @param {Object} $sqlname 不带扩展的文件名
     */
    private function _dumpSql($sqlname) {
        $sqlpath = $this->sql_path . $sqlname;
        $dbconf = config('db');
        $mb = new MySQLBackup($dbconf['host'], $dbconf['user'], $dbconf['pass'], $dbconf['name'], $dbconf['port']);
        $mb->addCreateDatabaseIfNotExists(false);
        $mb->setFilename($sqlpath);
        $mb->dump();
        if (is_file($sqlpath . '.sql')) {
            return true;
        } else {
            return false;
        }
    }

    // 删除备份
    protected function postDelete($request_data) {
        if ($request_data['type'] == 'sql') {
            unlink($this->sql_path . $request_data['name']);
        } elseif ($request_data['type'] == 'zip') {
            unlink($this->backup_path . $request_data['name']);
        }
    }
}