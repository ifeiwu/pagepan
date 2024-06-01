<?php
class Cache
{
	private $adapter;

    /**
     * 单例设计模式
     * @var object
     */
	private static $_instance;
	
	public static function new($adapter, $config = [])
	{
		if ( ! (self::$_instance instanceof self) )
		{
			self::$_instance = new self($adapter, $config);
		}

		return self::$_instance;
	}
	
	private function __construct($adapter, $config)
    {
        $this->setAdapter($adapter, $config);
    }
	
	public function setAdapter($adapter, $config)
    {
        switch ($adapter) {
            case 'apcu':
                $this->adapter = new cache\adapter\APCu();
                break;
            case 'redis':
                $this->adapter = new cache\adapter\Redis($config['redis']);
                break;
            case 'sqlite':
                $this->adapter = new cache\adapter\Mysql($config['sqlite']);
                break;
            default:
                $this->adapter = new cache\adapter\File($config['file']);
                break;
        }
    }
	
	public function get($key)
    {
        return $this->adapter->get($key);
    }
	
	public function set($key, $value, $seconds = 0)
    {
        $this->adapter->set($key, $value, $seconds);
    }
	
	public function has($key)
    {
        return $this->adapter->has($key);
    }
	
	public function delete($key)
    {
        $this->adapter->delete($key);
    }
	
	public function clear()
    {
		$this->adapter->clear();
    }

	public function __call($func, $params)
	{
		if ( method_exists($this->adapter, $func) )
		{
			return call_user_func_array([$this->adapter, $func], $params);
		}
	}
	
}
