<?php

class Session
{
    /**
     * 单例设计模式
     * @var object
     */
	private static $_instance;
	
	public static function new($config = [])
	{
		if ( ! (self::$_instance instanceof self) )
		{
			self::$_instance = new self($config);
		}

		return self::$_instance;
	}

	private function __construct($config)
	{
		if ( isset($config['id']) )
		{
			session_id($config['id']);
		}
		
		if ( isset($config['name']) )
		{
			session_name($config['name']);
		}
		
		if ( isset($config['path']) )
		{
			session_save_path($config['path']);
		}
		
		if ( isset($config['domain']) )
		{
			ini_set('session.cookie_domain', $config['domain']);
		}
		
		if ( isset($config['expire']) )
		{
			ini_set('session.gc_maxlifetime', $config['expire']);
			ini_set('session.cookie_lifetime', $config['expire']);
		}
		
		if (isset($config['use_cookies']))
		{
			ini_set('session.use_cookies', $config['use_cookies'] ? 1 : 0);
		}

		session_start();
	}

	public function set($name, $value = '')
	{
		if ( strpos($name, '.') )
		{
			list($name1, $name2) = explode('.', $name);

            $_SESSION[$name1][$name2] = $value;
		}
		else
		{
			$_SESSION[$name] = $value;
		}
	}

	public function get($name = '')
	{
		if ($name == '')
		{
			$value = $_SESSION;
		}
		else
		{
			if (strpos($name, '.'))
			{
				list($name1, $name2) = explode('.', $name);
				
				$value = isset($_SESSION[$name1][$name2]) ? $_SESSION[$name1][$name2] : null;
			}
			else
			{
				$value = isset($_SESSION[$name]) ? $_SESSION[$name] : null;
			}
		}
		return $value;
	}

	public function delete($name)
	{
		if ( strpos($name, '.') )
		{
			list($name1, $name2) = explode('.', $name);

            unset($_SESSION[$name1][$name2]);
		}
		else
		{
            unset($_SESSION[$name]);
		}
	}

	public function has($name)
	{
		if ( strpos($name, '.') )
		{
			list($name1, $name2) = explode('.', $name);
			
			return isset($_SESSION[$name1][$name2]);
		}
		else
		{
			return isset($_SESSION[$name]);
		}
	}

	public function clear()
	{
        $_SESSION = [];
	}

	public static function destroy()
	{
		$_SESSION = [];
		session_unset();
		session_destroy();
	}

}
