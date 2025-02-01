<?php
class FS {
    /**
     * 创建目录
     */
    public static function rmkdir($dir, $mode = 0755): bool
    {
        if (is_dir($dir)) {
            return true;
        }
        return mkdir($dir, $mode, true);
    }

    /**
     * 删除目录
     * @param {Object} $dir
     */
    public static function rrmdir($dir)
    {
        try {
            if (is_dir($dir)) {
                $files = scandir($dir);
                foreach ($files as $file) {
                    if ($file != '.' && $file != '..') {
                        self::rrmdir("$dir/$file");
                    }
                }
                rmdir($dir);
            } elseif (is_file($dir)) {
                unlink($dir);
            }
            return true;
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }


    /**
     * 复制目录
     * @param {Object} $src
     * @param {Object} $dst
     */
    public static function rcopy($src, $dst)
    {
        try {
            if (file_exists($dst)) {
                self::rrmdir($dst);
            }
            if (is_dir($src)) {
                mkdir($dst);
                $files = scandir($src);
                foreach ($files as $file) {
                    if ($file != '.' && $file != '..') {
                        self::rcopy("$src/$file", "$dst/$file");
                    }
                }
            } else {
                copy($src, $dst);
            }
            return true;
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }


    /**
     * 内容写入文件
     */
    public static function write($file, $content): bool
    {
        if (file_put_contents($file, $content) !== false) {
            return true;
        } else {
            return false;
        }
    }


    /**
     * 写入或读取JSONP文件
     */
    public static function jsonp($file, $data = null, $callback = 'result')
    {
        if (is_array($data)) {
            return self::write($file, $callback . '(' . json_encode2($data) . ')');
        } else {
            if (!is_file($file)) {
                return [];
            }
            $json_str = file_get_contents($file);
            if (preg_match("/^$callback\((.*)\)$/i", $json_str, $result)) {
                return json_decode($result[1], true);
            }
            return [];
        }
    }


    /**
     * 写入或读取JSON文件
     */
    public static function json($file, $data = null)
    {
        if (is_array($data)) {
            return self::write($file, json_encode2($data));
        } else {
            if (!is_file($file)) {
                return [];
            }
            return json_decode(file_get_contents($file), true);
        }
    }


    /**
     * 获取目录下的所有文件
     */
    public static function toFiles($path, &$files, $recursive = true)
    {
        if (is_dir($path)) {
            if ($handle = opendir($path)) {
                while (false !== ($item = readdir($handle))) {
                    if ($item != '.' && $item != '..') {
                        if (is_dir("$path/$item")) {
                            if ($recursive == true) {
                                self::toFiles("$path/$item", $files);
                            }
                        } else {
                            $files[] = "$path/$item";
                        }
                    }
                }
                closedir($handle);
            }
        }
    }

    /**
     * 检查目录是否为空
     * @return bool
     */
    public static function isDirEmpty($dir) {
        $handle = opendir($dir);
        while (($file = readdir($handle)) !== false) {
            if ($file !== '.' && $file !== '..') {
                closedir($handle);
                return false;
            }
        }
        closedir($handle);
        return true;
    }

    /**
     * 返回目录文件数量
     * @return int
     */
    public static function fileCount($dir) {
        $handle = opendir($dir);
        $count = 0;
        while (($file = readdir($handle)) !== false) {
            if ($file !== '.' && $file !== '..') {
                $count++;
            }
        }
        closedir($handle);
        return $count;
    }

    /**
     * 返回目录字节大小
     */
    public static function dirSize($dir): int
    {
        $size = 0;
        $flags = FilesystemIterator::CURRENT_AS_FILEINFO | FilesystemIterator::SKIP_DOTS;
        $dirIterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir, $flags));

        foreach ($dirIterator as $key) {
            if ($key->isFile()) {
                $size += $key->getSize();
            }
        }

        return $size;
    }


    /**
     * 格式化字节单位
     */
    public static function format($bytes, $decimals = 2): string
    {
        $exp = 0;
        $value = 0;
        $symbol = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        $bytes = (float)$bytes;

        if ($bytes > 0) {
            $exp = floor(log($bytes) / log(1024));
            $value = ($bytes / (1024 ** floor($exp)));
        }

        if ($symbol[$exp] === 'B') {
            $decimals = 0;
        }

        return number_format($value, $decimals, '.', '') . ' ' . $symbol[$exp];
    }
}