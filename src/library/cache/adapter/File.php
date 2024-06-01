<?php
namespace cache\adapter;

use Exception;
use JsonException;
use cache\AdapterInterface;

class File implements AdapterInterface
{
    private $path;
	
	public function __construct($config)
    {
        $this->path = $config['path'];

        if ( ! is_dir($this->path) && ! mkdir($this->path, 0775, true)) {
            throw new Exception(sprintf('Unable to create the "%s" directory.', $this->path));
        }

        $this->secret = $config['secret'] ?? null;

        if ( $config['remove_expired'] ?? false ) {
            $this->removeExpired();
        }
	}
	
	public function get($key)
	{
        if ( ! $this->has($key) ) {
            return false;
        }

        $data = $this->getRaw($key);

        return unserialize($data['data']);
	}

	public function set($key, $value, $seconds)
	{
        $file = $this->getFileName($key);

        try {
            $json = json_encode([
                'time'   => time(),
                'expire' => $seconds,
                'data'   => serialize($value),
            ], JSON_THROW_ON_ERROR);

            return file_put_contents($file, $json, LOCK_EX) !== false;
        } catch (JsonException) {
            return false;
        }
	}

	public function has($key)
	{
        return is_file($this->getFileName($key)) && ! $this->isExpired($key);
	}

	public function delete($key)
	{
        $file = $this->getFileName($key);

        if ( is_file($file) ) {
            return @unlink($file);
        }

        return false;
	}

	public function clear()
	{
        foreach ($this->keys() as $key) {
            if ( unlink($this->path . '/' . $key . '.cache') === false ) {
                return false;
            }
        }

        return true;
	}

    public function ttl(string $key): int {
        $data = $this->getRaw($key);

        if ( $data['expire'] === 0 ) {
            return 0;
        }

        return $data['time'] + $data['expire'] - time();
    }


    /**
     * Get all keys with data.
     *
     * @return array<int, string>
     */
    public function keys(): array {
        $keys = [];

        $handle = opendir($this->path);

        if ( $handle )
        {
            while ( ($file = readdir($handle)) !== false ) {
                if ( $file !== '.' && $file !== '..' ) {
                    $keys[] = str_replace('.cache', '', $file);
                }
            }

            closedir($handle);
        }

        return $keys;
    }

    /**
     * Get raw key data.
     */
    public function getRaw($key) {
        $file = $this->getFileName($key);

        try {
            return json_decode(file_get_contents($file), true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException) {
            return [];
        }
    }

    public function removeExpired() {
        foreach ($this->keys() as $key) {
            $this->isExpired($key);
        }
    }

    private function getFileName($key) {
        $key = $this->secret !== null ? md5($key . $this->secret) : $key;

        return realpath($this->path) . '/' . $key . '.cache';
    }

    private function isExpired($key) {
        $data = $this->getRaw($key);

        if ( ! isset($data['time']) && ! isset($data['expire']) ) {
            return false;
        }

        $expired = false;

        if ( $data['expire'] !== 0 ) {
            $expired = time() - $data['time'] > $data['expire'];
        }

        if ( $expired === true ) {
            $this->delete($key);
        }

        return $expired;
    }

}
