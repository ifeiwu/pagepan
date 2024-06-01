<?php
config('db', Config::file('db'));

function db_init()
{
    $db = config('db');

    if ( isset($db['pdo']) )
    {
        return $db['pdo'];
    }

    if ( $db['type'] == 'sqlite' )
    {
        $pdo = new \PDO('sqlite:' . ROOT_PATH . $db['file']);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    else
    {
        $dsn = 'mysql:host=' . $db['host'] . ';port=' . $db['port'] . ';dbname=' . $db['name'] . ';charset=utf8mb4';
        
        $db_option = [
            \PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4',
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_EMULATE_PREPARES => false
        ];
        
        $pdo = new \PDO($dsn, $db['user'], $db['pass'], $db_option);
    }

	config('db.pdo', $pdo);

    return $pdo;
}


function db_statement($query)
{
    $query = str_replace('{prefix}', config('db.prefix'), $query);

    return db_init()->prepare($query);
}


function db_execute($query, $params = [])
{
    return db_statement($query)->execute($params);
}


function db_insert($table, $params = [], $value = null)
{
    $columns = array_keys($params);
    $values = array_values($params);

    $_values = rtrim(str_repeat('?, ', count($columns)), ', ');

    $_columns = db_quote_columns($columns);
	
	$table = db_quote($table);

    $query = "INSERT INTO {prefix}{$table} ({$_columns}) VALUES ({$_values})";
	
	$result = db_execute($query, $values);
	
	if ( $result == true && $value == 'id' )
	{
		$result = config('db.pdo')->lastInsertId();
	}

    return $result;
}


/**
 * 更新数据
 * $where 等于false，将更新表所有数据
 */
function db_update($table, $params = [], $where = [])
{
    $values = [];
    
	$query = 'UPDATE {prefix}' . db_quote($table) . ' SET ';
	
	foreach ($params as $name => $value)
	{
		$values[] = $value;
	
		$query .= db_quote_column($name) . ' = ?, ';
	}

	$query = rtrim($query, ', ');
	
	if ( $where !== false )
	{
		if ( ! empty($values) && ! empty($where) )
		{
			list($query, $values) = db_where($query, $where, $values);
		}
		else
		{
			throw new Exception('Incorrect sql update statement');
		}
	}

    return db_execute($query, $values);
}


/**
 * 删除数据
 * $where 等于false，将删除表所有数据
 */
function db_delete($table, $where = [])
{
	$values = [];
	
	$query = 'DELETE FROM {prefix}' . $table;
	
	if ( $where !== false )
	{
		list($query, $values) = db_where($query, $where);
	}

	return db_execute($query, $values);
}


function db_save($table, $params = [], $where = [])
{
	if ( db_has($table, $where) )
	{
	    return db_update($table, $params, $where);
	}
	else
	{
	    return db_insert($table, $params);
	}
}


function db_query($query, $params = [])
{
    $statement = db_statement($query);

    $statement->execute($params);

    return $statement;
}


function db_query_get($query, $params = [], $number = null)
{
    $statement = db_query($query, $params);

    if ( ! is_null($number) )
    {
        return $statement->fetchColumn($number);
    }
    else
    {
        return $statement->fetch(\PDO::FETCH_NAMED);
    }
}


function db_query_all($query, $params = [], $number = null)
{
	if ( ! is_null($number) )
	{
	    return db_query($query, $params)->fetchAll(\PDO::FETCH_COLUMN, $number);
	}
	else
	{
	    return db_query($query, $params)->fetchAll();
	}
}


function db_all($table, $columns = '*', $where = [], $order = null, $limit = null, $column_number = null)
{
	$params = [];
	
	$sql = 'SELECT ' . db_quote_columns($columns) . ' FROM {prefix}' . db_quote($table);
	
	if ( ! empty($where) )
	{
		list($sql, $params) = db_where($sql, $where);
	}

	if ( ! empty($order) )
    {
        $sql .= ' ORDER BY ';

        if ( is_string($order) )
        {
            $sql .= $order;
        }
        elseif ( is_array($order) )
        {
            foreach ($order as $k => $v)
            {
                $sql .= db_quote($k) . ' ' . db_quote($v) . ', ';
            }

            $sql = rtrim($sql, ', ');
        }
    }
	
	if ( is_array($limit) )
	{
		if ( count($limit) == 2 )
		{
			$sql .= ' LIMIT ?,?';
		}
		else
		{
			$sql .= ' LIMIT ?';
		}
	    
	    $params = array_merge($params, $limit);
	}
	
	return db_query_all($sql, $params, $column_number);
}


function db_get($table, $columns = '*', $where = [], $order = null, $column_number = null)
{
	$params = [];
	
	$sql = 'SELECT ' . db_quote_columns($columns) . ' FROM {prefix}' . db_quote($table);
	
	if ( ! empty($where) )
	{
		list($sql, $params) = db_where($sql, $where);
	}

    if ( ! empty($order) )
    {
        $sql .= ' ORDER BY ';

        if ( is_string($order) )
        {
            $sql .= $order;
        }
        elseif ( is_array($order) )
        {
            foreach ($order as $k => $v)
            {
                $sql .= db_quote($k) . ' ' . db_quote($v) . ', ';
            }

            $sql = rtrim($sql, ', ');
        }
    }

	return db_query_get($sql, $params, $column_number);
}


function db_count($table, $where = [])
{
	$params = [];
	
	$sql = 'SELECT COUNT(*) FROM {prefix}' . db_quote($table);
	
	if ( ! empty($where) )
	{
		list($sql, $params) = db_where($sql, $where);
	}
	
	return db_query_get($sql, $params, 0);
}


function db_has($table, $where = [])
{
	return db_get($table, '*', $where) ? true : false;
}


function db_is_table($table)
{
    $db = config('db');
    
    $db_name = $db['name'];
    $db_type = $db['type'];
    
    $table = $db['prefix'] . $table;

    if ( $db_type == 'mysql' )
    {
        $table = db_query_get("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='" . $db_name . "' AND TABLE_NAME ='" . $table . "'", [], 0);
    }
    elseif ( $db_type == 'sqlite' )
    {
        $table = db_query_get("SELECT name FROM sqlite_master WHERE type='table' AND name = '" . $table . "'", [], 0);
    }

    return $table ? true : false;
}

/**
 * 返回数据表所有字段名称
 * @param string $table 数据表名称
 * @return array
 */
function db_table_columns($table)
{
    $db_type = config('db.type');
    $sql = '';
    
    if ( $db_type == 'mysql' )
    {
        $sql = "SHOW COLUMNS FROM {prefix}$table";
        $column_name = 'Field';
    }
    elseif ( $db_type == 'sqlite' )
    {
        $sql = "PRAGMA table_info({prefix}$table)";
        $column_name = 'name';
    }
    
    $fields = [];
    $columns = db_query_all($sql);
    
    foreach($columns as $column)
    {
        $fields[] = $column[$column_name];
    }
    
    return $fields;
}

function db_where($sql, $where, $values = [])
{
    $sql .= ' WHERE ';

    if ( empty($where) )
    {
        return [$sql, $values];
    }

    if ( is_array($where) )
    {
        // 一维数组
        if ( count($where) == count($where, 1) )
        {
            $where = [[$where]];
        }
        else
        {
            $where = [$where];
        }

        foreach ($where as $condition)
        {
            foreach ($condition as $compose)
            {
                if ( is_array($compose) )
                {
                    list($name, $symbol, $value) = $compose;

                    $symbol = strtoupper($symbol);

                    $sql .= db_quote_column($name) . ' ' . $symbol;

                    switch ($symbol)
                    {
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
                }
                else
                {
                    $compose = strtoupper($compose);

                    if ( $compose == 'OR' || $compose == 'AND' )
                    {
                        $sql .= ' ' . $compose . ' ';
                    }
                    else
                    {
                        $sql .= $compose;
                    }
                }
            }
        }
    }
    else
    {
        $sql .= $where;
    }

    return [$sql, $values];
}


function db_quote($str)
{
	if ( ! preg_match('/^[a-zA-Z0-9_(),]+$/i', $str) )
	{
		throw new InvalidArgumentException("Incorrect string name \"$str\"");
	}
	
	return $str;
}


function db_quote_column($str)
{
	$str = db_quote($str);
	
	// 不是函数加上`
	if ( ! preg_match('/^[a-zA-Z]+\(.+\)$/i', $str) )
	{
		$str = '`' . $str . '`';
	}
	
	return $str;
}


function db_quote_columns($columns)
{
    $_columns = [];

    if ( is_array($columns) )
    {
        foreach ($columns as $column)
        {
            $_columns[] = db_quote_column($column);
        }
    }
	elseif ( empty($columns) || $columns == '*' )
	{
		return '*';
	}
    else
    {
        $columns = explode(',', $columns);

        foreach ($columns as $column)
        {
            $_columns[] = db_quote_column(trim($column));
        }
    }

    return implode(', ', $_columns);
}