<?php
class Response
{
    private const CODES = [
        200 => 'OK',
        301 => 'Moved Permanently',
        302 => 'Found',
        400 => 'Bad Request',
        401 => 'Unauthorized',
        403 => 'Forbidden',
        404 => 'Not Found',
        500 => 'Internal Server Error'
    ];

    // 设置响应状态码
	public static function status($code = 200, $phrase = 'OK')
	{
		$phrase = self::CODES[$code] ?: $phrase;

		header("{$_SERVER["SERVER_PROTOCOL"]} {$code} {$phrase}");
	}

    // 文本格式输出
    public static function text($content)
    {
        header('Content-Type: text/plain');
        exit($content);
    }

    // JSON 格式输出
	public static function json($object)
	{
		header('Content-type: application/json');
        exit(json_encode($object));
	}

    // JSON 请求错误输出
	public static function error($message = '', $data = null, ...$params)
	{
        static::json(array_merge(['code' => 1, 'message' => $message, 'data' => $data], ...$params));
	}

    // JSON 请求成功输出
	public static function success($message = '', $data = null, ...$params)
	{
        static::json(array_merge(['code' => 0, 'message' => $message, 'data' => $data], ...$params));
	}

    // URL 重定向
	public static function redirect($url = '', $code = 302)
	{
		header("Location: $url", true, $code);
		exit;
	}

}
