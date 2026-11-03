<?php

namespace support;

use InvalidArgumentException;

class PhpConfigWriter
{
    /**
     * 把 JSON（或数组）转成 PHP 配置文件并写入磁盘
     *
     * @param array|string $data JSON 字符串或数组
     * @param string $file 目标文件路径，如 __DIR__ . '/config.php'
     * @return bool 写入是否成功
     * @throws InvalidArgumentException
     */
    public function write(array|string $data, string $file): bool
    {
        if (is_string($data)) {
            $data = json_decode($data, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new InvalidArgumentException('JSON 解析失败：' . json_last_error_msg());
            }
        }
        if (!is_array($data)) {
            throw new InvalidArgumentException('参数必须是 JSON 字符串或数组');
        }

        $content = "<?php\nreturn " . $this->exportShort($data) . ";\n";

        return file_put_contents($file, $content) !== false;
    }

    /** 递归导出 short array 语法 */
    private function exportShort($var, $indent = ''): ?string
    {
        if (!is_array($var)) {
            return var_export($var, true);
        }

        if (empty($var)) {
            return '[]';
        }

        // 索引数组
        if (array_keys($var) === range(0, count($var) - 1)) {
            $items = [];
            foreach ($var as $v) {
                $items[] = $indent . '    ' . $this->exportShort($v, $indent . '    ');
            }
            return "[\n" . implode(",\n", $items) . ",\n" . $indent . ']';
        }

        // 关联数组
        $lines = [];
        foreach ($var as $k => $v) {
            $lines[] = $indent . '    ' . var_export($k, true) . ' => ' . $this->exportShort($v, $indent . '    ');
        }
        return "[\n" . implode(",\n", $lines) . ",\n" . $indent . ']';
    }
}