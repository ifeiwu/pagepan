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

// 页面组件更新
$pagelist = $db->select('page', "id IN (1001)");
foreach ($pagelist as $page) {
    $id = $page['id'];

    $page_content = unserialize(gzuncompress(base64_decode($page['content'])));
    $page_source = unserialize(gzuncompress(base64_decode($page['source'])));

    $page_content = preg_replace_callback(
        '/<\?php \$this->uikit->load\(\'(.+)\', \'(.+)\'\); \?>/U',
        function ($matches) {
            $path = $matches[1];
            $config = $matches[2];
            if ($path == 'number/orderok/01') {
                $path = 'number/order/ok';
                $config = json_decode($config, true);
                $config['setting']['userdata.image'] = 'https://uikit.pagepan.com/assets/number/order/ok/1.png';
                $config['setting']['dataset.path'] = 'number/order/ok';
                $config = json_encode($config, JSON_UNESCAPED_UNICODE);
            }

            return "<?php \$this->uikit->load('$path', '$config'); ?>";
        },
        $page_content
    );

    $dom = new DOMDocument();
    @$dom->loadHTML($page_source);
    $xpath = new DOMXPath($dom);
    $divs = $xpath->query('//div[@component-path="number/orderok/01"]');
    if ($divs->length > 0) {
        foreach ($divs as $div) {
            $path = $div->getAttribute('component-path');
            if ($path == 'number/orderok/01') {
                $config = $div->getAttribute('config');
                $new_config = json_decode($config, true);
                $new_config['name'] = 'orderok';
                $new_config['path'] = 'number/order/ok';
                $new_config['image_path'] = 'https://uikit.pagepan.com/assets/number/order/ok/';
                $new_config['setting']['userdata.image'] = 'https://uikit.pagepan.com/assets/number/order/ok/1.png';
                $new_config['setting']['dataset.path'] = 'number/order/ok';
                $new_config = json_encode($new_config, JSON_UNESCAPED_UNICODE);

                $page_source = str_replace('component-alias="orderok01"', 'component-alias="orderok"', $page_source);
                $page_source = str_replace('component-path="number/orderok/01"', 'component-path="number/order/ok"', $page_source);
                $page_source = str_replace('uk="number/orderok/01"', 'uk="number/order/ok"', $page_source);
                $page_source = str_replace('config="' . htmlspecialchars($config) . '"', 'config="' . htmlspecialchars($new_config) . '"', $page_source);
            }
        }
    }
    var_dump($page_source);
//    $page_content = base64_encode(gzcompress(serialize($page_content)));
//    $page_source = base64_encode(gzcompress(serialize($page_source)));

//    $db->update('page', "content = '$page_content', source = '$page_source'", "`id` = $id");
}


// 数据库操作 -----------------------------------------------------------------------------------
class Database {

    public $db = null;

    public $prefix = null;

    function __construct($config) {
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
    function execute($sql) {
        $this->pdo->exec($sql);
    }

    // 添加字段
    function add_column($table, $cname, $ctype, $after_cname = '') {
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
        if ( ! $this->has_column($table, $cname) ) {
            $bool = $this->pdo->exec($sql);
        }
        return $bool;
    }

    // 修改字段名称
    function change_column($table, $oldname, $newname, $newtype) {
        $_table = $this->prefix . $table;
        $sql = 'ALTER TABLE ' . $_table . ' CHANGE `' . $oldname . '` `' . $newname . '` ' . $newtype;
        $bool = true;
        if ( $this->has_column($table, $oldname) ) {
            $bool = $this->pdo->exec($sql);
        }
        return $bool;
    }

    // 修改字段类型
    function modify_column($table, $cname, $ctype) {
        $table = $this->prefix . $table;
        $bool = true;
        if ( $this->query('Describe ' . $table . ' ' . $cname)->fetch() ) {
            $bool = $this->pdo->exec('ALTER TABLE ' . $table . ' MODIFY COLUMN `' . $cname . '` ' . $ctype);
        }
        return $bool;
    }

    // 删除字段
    function drop_column($table, $cname) {
        $table = $this->prefix . $table;
        $bool = true;
        if ( $this->query('Describe ' . $table . ' ' . $cname)->fetch() ) {
            $bool = $this->pdo->exec('ALTER TABLE ' . $table . ' DROP COLUMN `' . $cname . '`');
        }
        return $bool;
    }

    // 是否有字段
    function has_column($table, $cname) {
        $table = $this->prefix . $table;
        if ( $this->dbtype == 'sqlite' ) {
            return $this->pdo->query("SELECT * FROM sqlite_master WHERE name='{$table}' AND sql like '%\"{$cname}\"%'")->fetch() ? true : false;
        } else {
            return $this->pdo->query('Describe ' . $table . ' ' . $cname)->fetch() ? true : false;
        }
    }

    function has($table, $where) {
        return $this->pdo->query('SELECT * FROM ' . $this->prefix . $table . ' WHERE ' . $where)->fetch() ? true : false;
    }

    function find($table, $where) {
        return $this->pdo->query('SELECT * FROM ' . $this->prefix . $table . ' WHERE ' . $where)->fetch();
    }

    // 查询
    function query($sql) {
        return $this->pdo->query($sql);
    }

    // 查询返回数据列表
    function select($table, $where = '') {
        $where = $where ? ' WHERE ' . $where : '';
        return $this->pdo->query('SELECT * FROM ' . $this->prefix . $table . $where)->fetchAll();
    }

    // 添加数据
    function insert($table, $column, $data) {
        $this->pdo->exec('INSERT INTO ' . $this->prefix . $table . ' (' . $column . ') VALUES (' . $data . ')');
    }

    // 更新数据
    function update($table, $data, $where) {
        $this->pdo->exec('UPDATE ' . $this->prefix . $table . ' SET ' . $data . ' WHERE ' . $where);
    }

    // 删除数据
    function delete($table, $where) {
        $this->pdo->exec('DELETE FROM ' . $this->prefix . $table . ' WHERE ' . $where);
    }
}