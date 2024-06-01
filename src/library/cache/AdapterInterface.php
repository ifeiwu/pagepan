<?php
namespace cache;

interface AdapterInterface
{
	public function get($key);
	
	public function set($key, $value, $seconds);
	
	public function delete($key);

	public function has($key);
	
	public function clear();
	
}
