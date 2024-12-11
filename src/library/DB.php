<?php
/**
 * 数据库操作类
 */
class DB
{
    public $pdo;

    public $dbtype;

    public $dbname;

    public $prefix;

    public $debug;

    /**
     * 扩展函数数组
     * @var array
     */
    private static $funcs = [];

    /**
     * 单例设计模式
     * @var object
     */
    private static $_instance;

    public static function new($config = [])
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self($config);
        }

        return self::$_instance;
    }

    /**
     * 调用扩展函数
     * @param $name 名称
     * @param $args 参数
     * @return mixed
     */
    public function __call($name, $args)
    {
        if (!isset(self::$funcs[$name])) {
            self::$funcs[$name] = require LIB_PATH . "db/{$name}.php";
        }

        $func = Closure::bind(self::$funcs[$name], $this);

        return call_user_func_array($func, $args);
    }

    /**
     * 连接数据库
     * @param $config
     * @throws Exception
     */
    public function __construct($config)
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

    /**
     * 执行 SQL 语句
     * @param $sql
     * @return false|int
     */
    public function exec($sql)
    {
        return $this->pdo->exec($sql);
    }

    /**
     * 插入一条数据
     * @param $table
     * @param $params
     * @return false|string
     */
    public function insert($table, $params = [])
    {
        $columns = array_keys($params);
        $values = array_values($params);
        $lastId = false;
        $sql = $this->getInsertSQL($table, $columns, $values);

        if ($this->pdo->prepare($sql)->execute($values)) {
            $lastId = $this->pdo->lastInsertId();
        }

        if ($this->debug == true) {
            Log::sql(['sql' => $this->buildRunSQL($sql, $values), 'lastId' => $lastId]);
        }

        return $lastId;
    }

    /**
     * 插入多条数据
     * @param $table
     * @param $columns
     * @param $values
     * @return array
     */
    public function inserts($table, $columns = [], $values = [])
    {
        $lastIds = [];
        $sql = $this->getInsertSQL($table, $columns, $values);
        $statement = $this->pdo->prepare($sql);

        foreach ($values as $value) {
            if ($statement->execute($value)) {
                $lastIds[] = $this->pdo->lastInsertId();
            }
        }

        if ($this->debug == true) {
            Log::sql(['sql' => $sql, 'values' => $values, 'lastIds' => $lastIds]);
        }

        return $lastIds;
    }

    /**
     * 获取插入预处理语句
     * @param $table
     * @param $columns
     * @param $values
     * @return string
     */
    public function getInsertSQL($table, $columns, $values)
    {
        return 'INSERT INTO ' . $this->getTableName($table) . ' (' . $this->quoteColumns($columns) . ') VALUES (' . $this->buildValues($columns) . ')';
    }

    /**
     * 更新数据
     * @param $table
     * @param $params
     * @param $wheres
     * @return bool
     * @throws Exception
     */
    public function update($table, $params, $wheres)
    {
        $values = array_values($params);
        $columns = array_keys($params);
        $sql = 'UPDATE ' . $this->getTableName($table) . ' SET ';

        foreach ($columns as $name) {
            $sql .= $this->quoteColumn($name) . ' = ?,';
        }

        list($sql, $values) = $this->where(rtrim($sql, ','), $wheres, $values);
        $result = $this->pdo->prepare($sql)->execute($values);

        if ($this->debug == true) {
            Log::sql(['sql' => $this->buildRunSQL($sql, $values), 'result' => $result]);
        }

        return $result;
    }

    // 构建可运行 sql
    public function buildRunSQL($sql, $values)
    {
        foreach ($values as $value) {
            $sql = preg_replace('/\?/', "'$value'", $sql, 1);
        }
        return $sql;
    }

    /**
     * 更新多条数据
     * @param $table
     * @param $params
     * @param $wheres
     * @return array
     * @throws Exception
     */
    public function updates($table, $params, $wheres)
    {
        if (!is_array($params[0]) && !is_array($wheres[0])) {
            throw new \Exception('Invalid parameter');
        }

        $results = [];
        $columns = array_keys($params[0]);
        $sql = 'UPDATE ' . $this->getTableName($table) . ' SET ';
        foreach ($columns as $name) {
            $sql .= $this->quoteColumn($name) . ' = ?,';
        }

        $sql = rtrim($sql, ',');
        for ($i = 0; $i < count($params); $i++) {
            list($sql2, $values) = $this->where($sql, $wheres[$i], array_values($params[$i]));
            $results[] = $this->pdo->prepare($sql2)->execute($values);
        }

        if ($this->debug == true) {
            Log::sql(['sql' => $sql2, 'values' => array_map(fn($item) => array_values($item), $params), 'results' => $results]);
        }

        return $results;
    }

    /**
     * 删除数据
     * @param $table
     * @param $where
     * @return bool
     */
    public function delete($table, $wheres)
    {
        $values = [];
        $sql = 'DELETE FROM ' . $this->getTableName($table);
        list($sql, $values) = $this->where($sql, $wheres);
        $result = $this->pdo->prepare($sql)->execute($values);

        if ($this->debug == true) {
            Log::sql(['sql' => $this->buildRunSQL($sql, $values), 'result' => $result]);
        }

        return $result;
    }

    /**
     * 根据条件判断插入或更新数据
     * @param $table
     * @param $params
     * @param $wheres
     * @return bool|string
     * @throws Exception
     */
    public function save($table, $params = [], $wheres = [])
    {
        if ($this->has($table, $wheres)) {
            return $this->update($table, $params, $wheres);
        } else {
            return $this->insert($table, $params);
        }
    }

    /**
     * 自定义预处理语句并执行查询，返回一条数据
     * @param $sql
     * @param $values
     * @param $number
     * @return mixed
     */
    public function query($sql, $values = [], $number = null)
    {
        $statement = $this->pdo->prepare($sql);
        $statement->execute($values);

        if (!is_null($number)) {
            $result = $statement->fetchColumn($number);
        } else {
            $result = $statement->fetch(\PDO::FETCH_NAMED);
        }

        if ($this->debug == true) {
            Log::sql(['sql' => $this->buildRunSQL($sql, $values)]);
        }

        return $result;
    }

    /**
     * 自定义预处理语句并执行查询，返回多条数据
     * @param $sql
     * @param $params
     * @param $number
     * @return array|false
     */
    public function queryAll($sql, $values = [], $number = null)
    {
        $statement = $this->pdo->prepare($sql);
        $statement->execute($values);

        if (!is_null($number)) {
            $result = $statement->fetchAll(\PDO::FETCH_COLUMN, $number);
        } else {
            $result = $statement->fetchAll();
        }

        if ($this->debug == true) {
            Log::sql(['sql' => $this->buildRunSQL($sql, $values)]);
        }

        return $result;
    }

    /**
     * 根椐字段名称自动生成预处理语句并执行查询结果
     * @param $table
     * @param $columns
     * @param $wheres
     * @param $order
     * @param $limit
     * @param $column_number
     * @return array|false
     */
    public function select($table, $columns = '*', $wheres = [], $order = null, $limit = null, $column_number = null)
    {
        $params = [];
        $values = [];
        $sql = 'SELECT ' . $this->quoteSelectColumns($columns) . ' FROM ' . $this->getTableName($table);

        if (!empty($wheres)) {
            list($sql, $values) = $this->where($sql, $wheres);
        }

        if (!empty($order)) {
            $sql = $this->buildSqlOrderby($sql, $order);
        }

        if (is_array($limit)) {
            if (count($limit) == 2) {
                $sql .= ' LIMIT ?,?';
            } else {
                $sql .= ' LIMIT ?';
            }
            $values = array_merge($values, $limit);
        }

        return $this->queryAll($sql, $values, $column_number);
    }

    /**
     * 根椐字段名称自动生成预处理语句并执行查询，返回一条数据
     * @param $table
     * @param $columns
     * @param $wheres
     * @param $order
     * @param $column_number
     * @return mixed
     */
    public function find($table, $columns = '*', $wheres = [], $order = null, $column_number = null)
    {
        $values = [];
        $sql = 'SELECT ' . $this->quoteSelectColumns($columns) . ' FROM ' . $this->getTableName($table);

        if (!empty($wheres)) {
            list($sql, $values) = $this->where($sql, $wheres);
        }

        if (!empty($order)) {
            $sql = $this->buildSqlOrderby($sql, $order);
        }

        return $this->query($sql, $values, $column_number);
    }

    /**
     * 返回单列数据
     * @param $table
     * @param $column
     * @param $wheres
     * @return mixed
     */
    public function column($table, $column = '*', $wheres = [])
    {
        $values = [];
        $sql = 'SELECT ' . $this->quoteSelectColumn($column) . ' FROM ' . $this->getTableName($table);

        if (!empty($wheres)) {
            list($sql, $values) = $this->where($sql, $wheres);
        }

        return $this->query($sql, $values, 0);
    }

    /**
     * 构建字段排序 sql 语句
     * @param $sql
     * @param $order
     * @return string
     */
    private function buildSqlOrderby($sql, $order)
    {
        $sql .= ' ORDER BY ';

        if (is_string($order)) {
            $sql .= $order;
        } elseif (is_array($order)) {
            foreach ($order as $k => $v) {
                $sql .= $this->quote($k) . ' ' . $this->quote($v) . ', ';
            }
            $sql = rtrim($sql, ', ');
        }

        return $sql;
    }

    /**
     * 获取查询总数量
     * @param $table
     * @param $wheres
     * @return mixed
     */
    public function count($table, $wheres = [])
    {
        $values = [];
        $sql = 'SELECT COUNT(*) FROM ' . $this->getTableName($table);

        if (!empty($wheres)) {
            list($sql, $values) = $this->where($sql, $wheres);
        }

        return $this->query($sql, $values, 0);
    }

    /**
     * 是否查询到数据
     * @param $table
     * @param $where
     * @return bool
     */
    public function has($table, $wheres = [])
    {
        return $this->find($table, '*', $wheres) ? true : false;
    }


    /**
     * 获取表名加前缀
     * @param $name
     * @param $backtick
     * @return string
     */
    public function getTableName($name, $backtick = true)
    {
        $table = $this->quote($this->prefix . $name);
        if ($backtick == true) {
            $table = '`' . $table . '`';
        }
        return $table;
    }

    /**
     * 构建 where 条件的预处理语句
     * @param $sql
     * @param $wheres [['id', '=', $id], 'OR', ['user_id', '=', $user_id]]
     * @param $values
     * @return array
     */
    public function where($sql, $wheres = [], $values = [])
    {
        $sql .= ' WHERE ';
        // 一维数组
        if (count($wheres) == count($wheres, 1)) {
            $wheres = [[$wheres]];
        } else {
            $wheres = [$wheres];
        }

        foreach ($wheres as $condition) {
            foreach ($condition as $compose) {
                if (is_array($compose)) {
                    list($name, $symbol, $value) = $compose;
                    $symbol = strtoupper($symbol);
                    $sql .= $this->quoteColumn($name) . ' ' . $symbol;
                    switch ($symbol) {
                        case 'IN':
                            $value = is_array($value) ? $value : explode(',', $value);
                            $sql .= ' (' . rtrim(str_repeat('?,', count($value)), ',') . ')';
                            $values = array_merge($values, $value);
                            break;
                        case 'IS NULL':
                            break;
                        case 'IS NOT NULL':
                            break;
                        default:
                            $sql .= ' ?';
                            $values[] = $value;
                            break;
                    }
                } else {
                    $compose = strtoupper($compose);
                    if ($compose == 'OR' || $compose == 'AND') {
                        $sql .= ' ' . $compose . ' ';
                    } else {
                        $sql .= $compose;
                    }
                }
            }
        }
        return [$sql, $values];
    }

    /**
     * 处理安全字符串如：表名或字段名
     * @param $str
     * @return false|string
     */
    public function quote($str)
    {
        $str = trim($str);
        if (!preg_match('/^[a-zA-Z0-9_]+$/', $str)) {
            throw new InvalidArgumentException("Incorrect string name \"$str\"");
        }
        return $str;
    }

    /**
     * SELECT 单个字段名添加反引号（`），除了指定的函数以外。
     * @param $name
     * @return string
     */
    public function quoteSelectColumn($name)
    {
        $name = trim($name);
        // AS 字段指定别名处理，支持函数。例如：id AS user_id
        if (preg_match('/\s+AS\s+/i', $name)) {
            preg_match('/(.*)\s+AS\s+(.*)/i', $name, $matches);
            $field = trim($matches[1]);
            $field = preg_match('/\w+\(.*?\)/i', $field) ? $field : $this->quoteColumn($field);
            $alias = $this->quote($matches[2]);
            return $field . ' AS ' . $this->quoteColumn($alias);
        } // /\w+\(.*?\)/ 匹配任意函数。例如：COUNT(id)
        elseif (preg_match('/\w+\(.*?\)/i', $name) || $name == '*') {
            return $name;
        } else {
            return $this->quoteColumn($name);
        }
    }

    /**
     * SELECT 多个字段名添加反引号（`），除了指定的函数以外。
     * @param $columns string|array
     * @return string
     */
    public function quoteSelectColumns($columns)
    {
        $_columns = [];
        if (is_array($columns)) {
            foreach ($columns as $column) {
                $_columns[] = $this->quoteSelectColumn($column);
            }
            return implode(',', $_columns);
        } else {
            return $columns;
        }
    }

    /**
     * UPDATE,INSERT,WHERE 单字段名添加反引号（`）
     * @param $name
     * @return false|string
     */
    public function quoteColumn($name)
    {
        return '`' . $this->quote($name) . '`';
    }

    /**
     * INSERT 多字段名添加反引号（`）
     * @param $name
     * @return false|string
     */
    public function quoteColumns($columns)
    {
        if (is_array($columns)) {
            $_columns = [];
            foreach ($columns as $column) {
                $_columns[] = $this->quoteColumn($column);
            }
            return implode(',', $_columns);
        }

        return $columns;
    }

    /**
     * 构建预处理语句 INSERT 值的占位符
     * @param $columns
     * @return string
     */
    public function buildValues($columns)
    {
        return rtrim(str_repeat('?,', count($columns)), ',');
    }
}