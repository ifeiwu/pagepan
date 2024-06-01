<?php
namespace cache\adapter;

use Exception;
use RedisException;
use cache\AdapterInterface;

class Redis implements AdapterInterface
{
    private $redis;

	public function __construct($config)
    {
        if ( ! extension_loaded('redis') ) {
            throw new Exception('Redis extension is not installed.');
        }

        $this->redis = new Redis();

        $config['port'] ??= 6379;

        try {
            if ( isset($config['path']) ) {
                $this->redis->connect($config['path']);
            } else {
                $this->redis->connect($config['host'], (int) $config['port'], 3);
            }

            if ( isset($config['password']) )
            {
                if ( isset($config['username']) ) {
                    $credentials = [$config['username'], $config['password']];
                } else {
                    $credentials = $config['password'];
                }

                $this->redis->auth($credentials);
            }

            $this->redis->select($config['database'] ?? 0);
        }
        catch (RedisException $e) {
            throw new Exception($e->getMessage());
        }
	}
	
	public function get($key)
	{
        return unserialize($this->redis->get($key));
	}

	public function set($key, $value, $seconds)
	{
        if ( $seconds > 0 ) {
            return $this->redis->setex($key, $seconds, serialize($value));
        }

        return $this->redis->set($key, serialize($value));
	}

	public function has($key)
	{
        return $this->redis->exists($key);
	}

	public function delete($key)
	{
        return $this->redis->del($key);
	}

	public function clear()
	{
		return $this->redis->flushAll();
	}
}
