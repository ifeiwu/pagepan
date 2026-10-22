<?php

function multi_app_path(string $path = ''): string
{
    return app_path(rtrim(request()->app . DIRECTORY_SEPARATOR . $path, DIRECTORY_SEPARATOR));
}

function storage_path(string $path = ''): string
{
    return base_path(rtrim('storage' . DIRECTORY_SEPARATOR . $path, DIRECTORY_SEPARATOR));
}

// post 请求
function post($name = null, $type = '*', $default = '')
{
    if (is_null($name)) {
        return request()->post();
    } else {
        $value = request()->post($name, $default);
        return filter($value, $type);
    }
}

// get 请求
function get($name = null, $type = '*', $default = '')
{
    if (is_null($name)) {
        return request()->get();
    } else {
        $value = request()->get($name, $default);
        return filter($value, $type);
    }
}

// 自定义视图
function view2(): \support\View2
{
    return new \support\View2();
}

function db($conn_name = 'default'): \Illuminate\Database\Connection
{
    return \support\Db::connection($conn_name);
}

function datastar(array $headers = [])
{
    return new \support\Datastar($headers);
}

function queue($name, $data = [], $delay = 0)
{
    \Webman\RedisQueue\Client::send($name, $data, $delay);
}

// 运行 PHP CLI 脚本
function run_script(string $filename, ...$args): array
{
    $script = base_path("scripts/$filename");

    $command = escapeshellarg(PHP_BINARY) . ' '
        . escapeshellarg($script);

    foreach ($args as $arg) {
        $command .= ' ' . escapeshellarg((string) $arg);
    }

    if (PHP_OS_FAMILY === 'Windows') {
        pclose(popen('start "" /B ' . $command . ' > NUL 2>&1', 'r'));
    } else {
        exec($command . ' > /dev/null 2>&1 &');
    }

    return $args;
}

// 购物车
function cart()
{
    return Cart::new(['cartMaxItem' => 0, 'itemMaxQuantity' => 99, 'useCookie' => false]);
}

// 价格格式化
function price_format($number)
{
    $price = number_format($number, 2, '.', ''); // 格式化为最多 2 位小数
    $price = rtrim($price, '0'); // 移除尾部的 0
    $price = rtrim($price, '.'); // 如果小数部分全部是 0，移除小数点

    return $price;
}

// JSON 数组编码：默认不编码成 Unicode
function json_encode2(mixed $value, int $flags = 0, int $depth = 512): string
{
    $flags |= JSON_UNESCAPED_UNICODE;
    $json = \json_encode($value, $flags, $depth);
    if ($json === false) {
        throw new Exception(json_last_error_msg());
    }
    return $json;
}

// JSON 字符串解码：默认数组
function json_decode2(string $json, ?bool $associative = null, int $depth = 512, int $flags = 0): mixed
{
    $data = \json_decode($json, $associative ?? true, $depth, $flags);
    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception(json_last_error_msg());
    }
    return $data;
}

// JSON 响应
function json_error(string $message = '', array $data = [], ...$params)
{
    return json(array_merge(['code' => 1, 'message' => $message, 'data' => $data], ...$params));
}

function json_success(string $message = '', mixed $data = null, ...$params)
{
    return json(array_merge(['code' => 0, 'message' => $message, 'data' => $data], ...$params));
}

/**
 * 类型转换与数据过滤函数
 *
 * @param mixed $value 要处理的值
 * @param string|callable $type 目标类型或正则表达式
 * @param bool $trim 是否去除首尾空格（默认true）
 * @return mixed
 */
function filter(mixed $value, string|callable $type = '*', bool $trim = true): mixed
{
    // 处理数组递归
//    if (is_array($value)) {
//        return array_map(fn($v) => filter($v, $type, $trim), $value);
//    }

    // 处理 null
    if ($value === null) {
        return match ($type) {
            'int', 'float' => 0,
            'bool' => false,
            'array' => [],
            default => null,
        };
    }

    // 如果是可调用对象，执行回调
    if (is_callable($type)) {
        return $type($value);
    }

    // 预处理：去除首尾空格
    if ($trim && is_string($value)) {
        $value = trim($value);
    }

    return match ($type) {
        'int', 'integer' => filter_var($value, FILTER_VALIDATE_INT) !== false ? (int)$value : 0,

        'float', 'double' => filter_var($value, FILTER_VALIDATE_FLOAT) !== false ? (float)$value : 0.0,

        'bool', 'boolean' => filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? false,

        'string' => (string)$value,

        'array' => is_array($value) ? $value : (array)$value,

        'object' => is_object($value) ? $value : (object)$value,

        // 仅数字
        'number' => preg_replace('/[^0-9]/', '', (string)$value),

        // 字母数字
        'alnum' => preg_replace('/[^0-9a-zA-Z]/', '', (string)$value),

        // 仅字母
        'alpha' => preg_replace('/[^A-Za-z]/', '', (string)$value),

        // 大写字母
        'upper' => preg_replace('/[^A-Z]/', '', (string)$value),

        // 小写字母
        'lower' => preg_replace('/[^a-z]/', '', (string)$value),

        // HTML 转义（防 XSS）
        'escape', 'html' => htmlspecialchars((string)$value, ENT_QUOTES | ENT_HTML5, 'UTF-8'),

        // 纯文本（去除所有 HTML）
        'text', 'plain' => strip_tags((string)$value),

        // 真实性名：中文
        'realname' => preg_replace('/\p{Han}/u', '', (string)$value),

        // 用户名：中文、字母、数字、下划线、横线
        'username' => preg_replace('/[^\p{Han}A-Za-z0-9_-]/u', '', (string)$value),

        // 安全文件名
        'filename' => preg_replace('/[<>:"\/\\\\|?*\x00-\x1f]/', '', (string)$value),

        // 文件路径（允许斜杠）
        'filepath' => preg_replace('/[<>:"|?*\x00-\x1f]/', '', (string)$value),

        // 搜索关键字（防注入）
        'keyword' => preg_replace('/[\'";#%*\/()\[\]{}]/', '', strip_tags((string)$value)),

        // URL
        'url' => filter_var($value, FILTER_SANITIZE_URL),

        // Email
        'email' => filter_var($value, FILTER_SANITIZE_EMAIL),

        // 手机号：中国手机号（宽松版：1开头，第二位3-9，共11位）
        'phone' => (function ($v) {
            $v = preg_replace('/\D/', '', (string)$v); // 去除所有非数字
            return preg_match('/^1[3-9]\d{9}$/', $v) ? $v : '';
        })($value),

        // JSON：验证并解析，失败返回 null
        'json' => (function ($v) {
            if (!is_string($v) || empty($v)) return null;
            $decoded = json_decode($v, true);
            return json_last_error() === JSON_ERROR_NONE ? $decoded : null;
        })($value),

        // IP 地址：验证 IPv4/IPv6，返回标准化格式
        'ip' => (function ($v) {
            $flags = FILTER_FLAG_IPV4 | FILTER_FLAG_IPV6;
            $filtered = filter_var($v, FILTER_VALIDATE_IP, $flags);
            return $filtered !== false ? $filtered : '';
        })($value),

        // IPv4 专用
        'ipv4' => (function ($v) {
            $filtered = filter_var($v, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4);
            return $filtered !== false ? $filtered : '';
        })($value),

        // IPv6 专用
        'ipv6' => (function ($v) {
            $filtered = filter_var($v, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6);
            return $filtered !== false ? $filtered : '';
        })($value),

        // 默认：自定义正则或原样返回
        default => is_string($type) && str_starts_with($type, '/') ? preg_replace($type, '', (string)$value) : $value,
    };
}

// 获取类型的文字
function getTypeText($type)
{
    $text = '其它';
    switch ($type) {
        case 'guide':
            $text = '引导';
            break;
        case 'home':
            $text = '主页';
            break;
        case 'inside':
            $text = '内页';
            break;
        case 'pro':
            $text = '专页';
            break;
        case 'graphic':
            $text = '图文';
            break;
        case 'layout':
            $text = '布局';
            break;
        case 'dataset':
            $text = '数据源';
            break;
        case '404':
            $text = '404';
            break;
    }
    return $text;
}

// 获取类型的颜色
function getTypeColor($type)
{
    $color = '#e7f6ff';
    switch ($type) {
        case 'guide':
            $color = '#f8ffe7';
            break;
        case 'home':
            $color = '#e7efff';
            break;
        case 'pro':
            $color = '#ffe7fd';
            break;
        case 'graphic':
            $color = '#ebf4fa';
            break;
        case 'layout':
            $color = '#fff2e7';
            break;
        case 'dataset':
            $color = '#eeffe7';
            break;
        case '404':
            $color = '#ffe7e7';
            break;
    }
    return $color;
}