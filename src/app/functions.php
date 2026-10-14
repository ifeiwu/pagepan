<?php

use support\Db;

function storage_path(string $path = ''): string
{
    static $storagePath = '';
    if (!$storagePath) {
        $storagePath = \config('app.storage_path') ?: run_path('storage');
    }
    return path_combine($storagePath, $path);
}

// 自定义视图
function view2(): \support\View2
{
    return new \support\View2();
}

function db($conn_name = 'default'): \Illuminate\Database\Connection
{
    return DB::connection($conn_name);
}

function datastar(array $headers = [])
{
    return new \support\Datastar($headers);
}

function queue($name, $data = [], $delay = 0)
{
    \Webman\RedisQueue\Client::send($name, $data, $delay);
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

// 获取类型的文字
function getTypeText($type) {
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
function getTypeColor($type) {
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