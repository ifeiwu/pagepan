<?php
// 网站升级程序
set_time_limit(300);
date_default_timezone_set('PRC');
header('Content-type:text/html; charset=utf-8');

define('RUN_MODE', 'dev');
define('WEB_ROOT', __DIR__ . '/');
// 判断当前目录是否为public目录
if ( basename(dirname(__FILE__)) === 'public' ) {
    define('IS_PUBLIC', true);
    define('ROOT_PATH', dirname(WEB_ROOT) . '/');
} else {
    define('IS_PUBLIC', false);
    define('ROOT_PATH', WEB_ROOT);
}
define('DATA_PATH', ROOT_PATH . 'data/');
define('CACHE_PATH', DATA_PATH . 'cache/');

// 所有错误和异常记录
ini_set('error_reporting', E_ALL & ~E_WARNING & ~E_NOTICE & ~E_DEPRECATED);
ini_set('display_errors', false);
ini_set('log_errors', true);
ini_set('error_log', DATA_PATH . 'logs/upgrade.log');

set_error_handler(function ($errno, $errstr, $errfile, $errline) {
    error_log(date('[Y-m-d H:i:s]') . " Runtime Error: $errstr in $errfile:$errline" . PHP_EOL, 3, ini_get('error_log'));
}, error_reporting());

set_exception_handler(function ($e) {
    error_log(date('[Y-m-d H:i:s]') . " Exception Error: {$e->getMessage()}" . PHP_EOL, 3, ini_get('error_log'));
});

register_shutdown_function(function () {
    if ( is_null($error = error_get_last()) ) {
        return;
    }
    if ( in_array($error['type'], [E_ERROR, E_CORE_ERROR, E_COMPILE_ERROR, E_PARSE]) ) {
        error_log(date('[Y-m-d H:i:s]') . " Fatal Error: {$error['message']}" . PHP_EOL, 3, ini_get('error_log'));
    }
});


$config = require ROOT_PATH . 'config/db.dev.php';
$db = new Database($config);

// 在这里输入测试代码 ---------------------------------------------------------


// end --------------------------------------------------------------------

// 获取已更新的动态组件设置页面内容
function get_updated_setting_page_content($content)
{
    $pattern = "/\\\$this->uikit->load\(\s*'([^']+)'\s*,\s*'({(?:[^{}]*|(?2))*})'\s*\)/";
    preg_match_all($pattern, $content, $matches, PREG_SET_ORDER);

    foreach ($matches as $match) {
        $number = $match[1];
        $config = $match[2];
        // 当前页面组件设置
        $config_array = json_decode($config, true);
        $config_setting_array = $config_array['setting'];
        // 远程获取组件设置
        $uikit_setting_array = get_uikit_setting($number);
        // 当前页面组件设置【合并到】远程获取组件设置
        if (is_array($config_setting_array) && is_array($uikit_setting_array)) {
            $config_array['setting'] = array_merge($uikit_setting_array, $config_setting_array);
            $new_config = json_encode($config_array, JSON_UNESCAPED_UNICODE);
            $content = str_replace("<?php \$this->uikit->load('{$number}', '{$config}'); ?>", "<?php \$this->uikit->load('{$number}', '{$new_config}'); ?>", $content);
        }
    }

    return $content;
}

// 获取已更新的动态组件设置页面源码
function get_updated_setting_page_source($source)
{
    $pattern = '/<div\b[^>]*\bcomponent-path="([^"]*)"[^>]*\bconfig="([^"]*)"[^>]*>/i';
    preg_match_all($pattern, $source, $matches, PREG_SET_ORDER);

    foreach ($matches as $match) {
        $number = $match[1];
        $config = $match[2];
        // 当前页面组件设置
        $config_array = json_decode(htmlspecialchars_decode($config), true);
        $config_setting_array = $config_array['setting'];
        // 远程获取组件设置
        $uikit_setting_array = get_uikit_setting($number);
        // 当前页面组件设置【合并到】远程获取组件设置
        if (is_array($config_setting_array) && is_array($uikit_setting_array)) {
            $config_array['setting'] = array_merge($uikit_setting_array, $config_setting_array);
            $new_config = json_encode($config_array, JSON_UNESCAPED_UNICODE);
            $source = str_replace('config="' . $config . '"', 'config="' . htmlspecialchars($new_config) . '"', $source);
        }
    }

    return $source;
}

// 远程获取组件设置
function get_uikit_setting($number) {
    $uikit_config = require ROOT_PATH . 'config/uikit.dev.php';
    $url = $uikit_config['url'] . 'get-setting';
    $curlApi = include ROOT_PATH . 'helper/curl/api.php';
    $res = $curlApi($url, ['path' => $number]);
    if ($res['code'] === 0) {
        return json_decode($res['data'], true);
    } else {
        return [];
    }
}

// 数据库操作 -----------------------------------------------------------------------------------
class Database
{

    public $db = null;

    public $prefix = null;

    function __construct($config)
    {
        $this->debug = $config['debug'];
        $this->prefix = $config['prefix'];
        $this->dbname = $config['name'];
        $this->dbtype = $config['type'];

        try {
            if ($this->dbtype == 'sqlite') {
                $this->pdo = new \PDO('sqlite:' . ROOT_PATH . $config['file']);
                $this->pdo->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_ASSOC);
                $this->pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            } else {
                $option = [
                    \PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4',
                    \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
                    \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
                    \PDO::ATTR_EMULATE_PREPARES => false
                ];

                $dsn = 'mysql:host=' . $config['host'] . ';port=' . $config['port'] . ';dbname=' . $this->dbname . ';charset=utf8mb4';

                $this->pdo = new \PDO($dsn, $config['user'], $config['pass'], $option);
            }
        } catch (\PDOException $e) {
            throw new \Exception($e);
        }
    }

    // 执行SQL
    function execute($sql)
    {
        $this->pdo->exec($sql);
    }

    // 添加字段
    function add_column($table, $cname, $ctype, $after_cname = '')
    {
        $_table = $this->prefix . $table;
        if ($this->dbtype == 'sqlite') {
            $_after = ''; // 不支持在指定字段插入新字段
            $_cname = '"' . $cname . '"';
        } else {
            $_after = $after_cname ? ' AFTER `' . $after_cname . '`' : '';
            $_cname = '`' . $cname . '`';
        }
        $sql = 'ALTER TABLE ' . $_table . ' ADD ' . $_cname . ' ' . $ctype . $_after;
        $bool = true;
        if (!$this->has_column($table, $cname)) {
            $bool = $this->pdo->exec($sql);
        }
        return $bool;
    }

    // 修改字段名称
    function change_column($table, $oldname, $newname, $newtype)
    {
        $_table = $this->prefix . $table;
        $sql = 'ALTER TABLE ' . $_table . ' CHANGE `' . $oldname . '` `' . $newname . '` ' . $newtype;
        $bool = true;
        if ($this->has_column($table, $oldname)) {
            $bool = $this->pdo->exec($sql);
        }
        return $bool;
    }

    // 修改字段类型
    function modify_column($table, $cname, $ctype)
    {
        $table = $this->prefix . $table;
        $bool = true;
        if ($this->query('Describe ' . $table . ' ' . $cname)->fetch()) {
            $bool = $this->pdo->exec('ALTER TABLE ' . $table . ' MODIFY COLUMN `' . $cname . '` ' . $ctype);
        }
        return $bool;
    }

    // 删除字段
    function drop_column($table, $cname)
    {
        $table = $this->prefix . $table;
        $bool = true;
        if ($this->query('Describe ' . $table . ' ' . $cname)->fetch()) {
            $bool = $this->pdo->exec('ALTER TABLE ' . $table . ' DROP COLUMN `' . $cname . '`');
        }
        return $bool;
    }

    // 是否有字段
    function has_column($table, $cname)
    {
        $table = $this->prefix . $table;
        if ($this->dbtype == 'sqlite') {
            return $this->pdo->query("SELECT * FROM sqlite_master WHERE name='{$table}' AND sql like '%\"{$cname}\"%'")->fetch() ? true : false;
        } else {
            return $this->pdo->query('Describe ' . $table . ' ' . $cname)->fetch() ? true : false;
        }
    }

    // 是否有表名
    function has_table($table)
    {
        $table = $this->prefix . $table;
        if ($this->dbtype == 'sqlite') {
            return $this->pdo->query("SELECT name FROM sqlite_master WHERE type='table' AND name = '{$table}'")->fetch() ? true : false;
        } else {
            return $this->pdo->query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='{$table}' AND TABLE_NAME ='{$table}'")->fetch() ? true : false;
        }
    }

    function has($table, $where)
    {
        return $this->pdo->query('SELECT * FROM ' . $this->prefix . $table . ' WHERE ' . $where)->fetch() ? true : false;
    }

    function find($table, $where)
    {
        return $this->pdo->query('SELECT * FROM ' . $this->prefix . $table . ' WHERE ' . $where)->fetch();
    }

    // 查询
    function query($sql)
    {
        return $this->pdo->query($sql);
    }

    // 查询返回数据列表
    function select($table, $where = '')
    {
        $where = $where ? ' WHERE ' . $where : '';
        return $this->pdo->query('SELECT * FROM ' . $this->prefix . $table . $where)->fetchAll();
    }

    // 添加数据
    function insert($table, $column, $data)
    {
        $this->pdo->exec('INSERT INTO ' . $this->prefix . $table . ' (' . $column . ') VALUES (' . $data . ')');
    }

    // 更新数据
    function update($table, $data, $where)
    {
        $this->pdo->exec('UPDATE ' . $this->prefix . $table . ' SET ' . $data . ' WHERE ' . $where);
    }

    // 删除数据
    function delete($table, $where)
    {
        $this->pdo->exec('DELETE FROM ' . $this->prefix . $table . ' WHERE ' . $where);
    }
}