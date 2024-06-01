<?php
namespace cache\adapter;

use PDO;
use PDOException;
use Exception;
use cache\AdapterInterface;

class SQLite implements AdapterInterface
{
	protected $pdo;

	public function __construct($config)
    {
        try {
            $this->pdo = new PDO('sqlite:' . $config['file']);
            $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch (PDOException $e) {
            throw new Exception($e);
        }
    }
	
	public function delete($key)
    {
    	$this->pdo->exec("DELETE FROM cache WHERE `key` = '$key'");
    }
	
	public function get($key)
    {
    	$statement = $this->pdo->query("SELECT `value` FROM cache WHERE `key` = '$key'");

        return unserialize($statement->fetchColumn());
    }
	
	public function set($key, $value, $seconds = 0)
    {
		$value = serialize($value);

		$rs = $this->pdo->query("SELECT COUNT(*) FROM cache WHERE `key` = '$key'");
		
		if ( $rs->fetchColumn() == 0 ) {
			$this->pdo->exec("INSERT INTO cache(`key`, `value`, `expire`) VALUES ('$key', '$value', '$seconds')");
		} else {
			$this->pdo->exec("UPDATE cache SET `value`='$value', `expire`='$seconds' WHERE `key`='$key'");
		}
    }

	public function has($key)
    {
		return $this->pdo->query("SELECT COUNT(*) FROM cache WHERE `key` = '$key'")->fetchColumn();
    }
	
	public function clear()
    {
        return $this->pdo->exec('truncate table cache');
    }
	
}
