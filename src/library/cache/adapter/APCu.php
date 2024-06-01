<?php
namespace cache\adapter;

use Exception;
use cache\AdapterInterface;

class APCu implements AdapterInterface
{
	public function __construct()
    {
        if ( ! extension_loaded('apcu') ) {
            throw new Exception('APCu extension is not installed.');
        }
	}
	
	public function get($key)
	{
        return unserialize(apcu_fetch($key));
	}

	public function set($key, $value, $seconds)
	{
        return apcu_store($key, serialize($value), $seconds);
	}

	public function has($key)
	{
        return apcu_exists($key);
	}

	public function delete($key)
	{
        return apcu_delete($key);
	}

	public function clear()
	{
		return apcu_clear_cache();
	}
}
