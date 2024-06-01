<?php
// 日志记录
class Log {

    /**
     * 生成其它前缀文件日志
     * 例如：Log:sql('select * from table'); // data/logs/sql_202403.log
     * @param $name
     * @param $args
     * @return void
     */
    private static function __callStatic($name, $args)
    {
        self::write($args, $name);
    }

    public static function debug()
    {
        self::write(func_get_args(), 'debug');
    }

    public static function write($data, $prefix = '')
    {
        $trace = debug_backtrace();
        $caller = $trace[2];

        $message = date('[Y-m-d H:i:s] ') . $caller['file']. ' (' . $caller['line'] . ')' . PHP_EOL;
        $message.= implode(PHP_EOL, self::getMessages($data)) . PHP_EOL;
        $filename = ROOT_PATH . "data/logs/{$prefix}_" . date('Ym') . '.log';

        file_put_contents($filename, $message, FILE_APPEND);
    }

    public static function getMessages($data)
    {
        $messages = [];

        foreach ($data as $value)
        {
            if ( is_array($value) )
            {
                $messages[] = json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            }
            elseif ( $value instanceof \Throwable )
            {
                $exception = [
                    'level' => $value->getCode(),
                    'message' => $value->getMessage(),
                    'file' => $value->getFile(),
                    'line' => $value->getLine(),
                    'trace' => explode("\n", trim($value->getTraceAsString(), "\r\n")),
                ];

                $messages[] = json_encode($exception, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_FORCE_OBJECT);
            }
            elseif ( is_callable($value) )
            {
                $messages[] = var_export($value, true);
            }
            elseif ( is_object($value) )
            {
                if ( $value instanceof \Closure) {
                    $reflection = new ReflectionFunction($value);
                    $messages[] = 'This closure is defined in file: ' . $reflection->getFileName() . ' On line: ' . $reflection->getStartLine();
                } else {
                    $reflection = new ReflectionClass($value);

                    $messages[] = 'This object class ' . get_class($value) . ' is in the file: ' . $reflection->getFileName();
                    $messages[] = json_encode(get_object_vars($value), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_FORCE_OBJECT);
                    $messages[] = json_encode(get_class_methods($value), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_FORCE_OBJECT);
                }
            }
            else
            {
                $messages[] = $value;
            }
        }

        return $messages;
    }
}