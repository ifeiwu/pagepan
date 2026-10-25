<?php

namespace support;

class FileSystem
{
    /**
     * 创建目录（递归）
     * @param string $path
     * @param int $mode
     * @return bool
     */
    public static function rmkdir(string $path, int $mode = 0755): bool
    {
        $path = dirname($path);
        if (is_dir($path)) {
            return true;
        }

        // 尝试创建目录并检查是否成功
        return mkdir($path, $mode, true) || is_dir($path);
    }

    /**
     * 删除目录及其内容
     * @param string $dir
     * @return bool
     */
    public static function rrmdir(string $dir): bool
    {
        if (is_link($dir) || is_file($dir)) {
            return unlink($dir);
        }

        if (!is_dir($dir)) {
            return true;
        }

        foreach (scandir($dir) as $file) {
            if ($file === '.' || $file === '..') {
                continue;
            }

            if (!self::rrmdir($dir . DIRECTORY_SEPARATOR . $file)) {
                return false;
            }
        }

        return rmdir($dir);
    }

    /**
     * 复制目录及其内容
     * @param string $src
     * @param string $dst
     * @return bool
     */
    public static function rcopy(string $src, string $dst): bool
    {
        if (file_exists($dst)) {
            self::rrmdir($dst); // 如果目标目录存在，先删除
        }

        if (is_dir($src)) {
            mkdir($dst); // 创建目标目录

            $files = scandir($src);
            foreach ($files as $file) {
                if ($file != '.' && $file != '..') {
                    self::rcopy("$src/$file", "$dst/$file"); // 递归复制目录
                }
            }
        } else {
            copy($src, $dst); // 复制文件
        }

        return true;
    }

    /**
     * 内容写入文件
     * @param string $file
     * @param string $content
     * @return bool
     */
    public static function write(string $file, string $content): bool
    {
        if (file_put_contents($file, $content) === false) {
            throw new \RuntimeException("Failed to write content to file: $file");
        }
        return true;
    }

    /**
     * 获取目录下的所有文件
     * @param string $path
     * @param array $files
     * @param bool $recursive
     * @return void
     */
    public static function toFiles(string $path, array &$files, bool $recursive = true): void
    {
        if (is_dir($path)) {
            $handle = opendir($path);
            while (false !== ($item = readdir($handle))) {
                if ($item != '.' && $item != '..') {
                    if (is_dir("$path/$item")) {
                        if ($recursive) {
                            self::toFiles("$path/$item", $files); // 递归获取目录下的文件
                        }
                    } else {
                        $files[] = "$path/$item"; // 添加文件到数组
                    }
                }
            }
            closedir($handle); // 关闭目录句柄
        }
    }

    /**
     * 返回目录字节大小
     * @param string $path
     * @return int
     */
    public static function dirSize(string $path): int
    {
        $size = 0;

        if (is_dir($path)) {
            $files = scandir($path);
            foreach ($files as $file) {
                if ($file != '.' && $file != '..') {
                    $filePath = "$path/$file";
                    if (is_dir($filePath)) {
                        $size += self::dirSize($filePath); // 递归计算目录大小
                    } else {
                        $size += filesize($filePath); // 计算文件大小
                    }
                }
            }
        }

        return $size;
    }

    /**
     * 格式化字节单位
     * @param float $bytes
     * @param int $decimals
     * @return string
     */
    public static function format(float $bytes, int $decimals = 2): string
    {
        $exp = 0;
        $value = 0;
        $symbol = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

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