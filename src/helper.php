<?php
// 调用助手函数
function helper($name, $args = [])
{
    $key = 'helper.' . $name;

    if ( ! Config::has($key) ) {
        Config::set($key, require ROOT_PATH . "helper/{$name}.php");
    }

    return call_user_func_array(Config::get($key), $args);
}

// 配置操作
function config($name, $value = '')
{
    if ( is_array($name) ) {
        foreach ($name as $key => $value) {
            Config::set($key, $value);
        }
    } elseif ( $value === '' ) {
        return Config::get($name);
    } else {
        Config::set($name, $value);
    }
}

// 会话操作
function session($name, $value = '')
{
    $session = Session::new();

    if ( is_null($name) ) {
        $session->clear($value);
    } elseif ( $value === '' ) {
        return strpos($name, '?') === 0 ? $session->has(substr($name, 1)) : $session->get($name);
    } elseif ( is_null($value) ) {
        $session->delete($name);
    } else {
        $session->set($name, $value);
    }
}

// 缓存数据
function cache($name, $value = '', $seconds = 0)
{
    $cache = Cache::new('file', Config::file('cache'));

    if ( is_null($name) ) {
        $cache->clear();
    } elseif ( $value === '' ) {
        return strpos($name, '?') === 0 ? $cache->has(substr($name, 1)) : $cache->get($name);
    } elseif ( is_null($value) ) {
        $cache->delete($name);
    } else {
        $cache->set($name, $value, $seconds);
    }
}

// 视图操作
function view($path = null)
{
    $view = View::new($path);

    if ( ! $view->uikit )
    {
        $uikit = Uikit::new();
        $uikit->view = $view;
        $view->uikit = $uikit;
    }

    return $view;
}

// 连接数据库
function db()
{
    return DB::new(Config::file('db'));
}

// 购物车
function cart()
{
    return Cart::new([
        'cartMaxItem'      => 0,
        'itemMaxQuantity'  => 99,
        'useCookie'        => false,
    ]);
}

// GET 请求
function get($name = null, $type = '*', $default = null)
{
    return Request::get($name, $type, $default);
}

// POST 请求
function post($name = null, $type = '*', $default = null)
{
    return Request::post($name, $type, $default);
}

/**
 * 返回生成缩略图片超链接
 * @param $path 图片路径
 * @param $image 图片名称
 * @param $params 裁剪参数，格式： ['w' => $width, 'h' => $height, 'fit' => 'crop-center']
 * @return string
 */
function thumb($path, $image, $params = [])
{
    $image = ltrim("$path/$image", '/');

    if ( preg_match('/^(https?:\/\/|\/\/)/i', $image) )
    {
        return $image;
    }

    $query = http_build_query($params);

    return "img/$image?$query";
}

// 兼容 v7.26 之前版本
function uikit_load($path, $config)
{
    $uikit = Uikit::new();
    $uikit->load($path, $config);
}

// 加载第三方库
function loader_vendor()
{
    require_once VEN_PATH . 'autoload.php';
}

// html实体转换为字符
function html_decode($str)
{
    return htmlspecialchars_decode($str, ENT_QUOTES);
}

// 字符转换为html实体
function html_encode($str)
{
    return htmlspecialchars($str, ENT_QUOTES);
}

// 价格格式化
function price_format($num)
{
    return number_format($num, 2, '.', ',');
}

// 压缩内容
function gzcompr($str)
{
    return $str ? base64_encode(gzcompress(serialize($str))) : '';
}

// 解压内容
function gzuncompr($str)
{
    return $str ? unserialize(gzuncompress(base64_decode($str))) : '';
}

// 调试记录
function debug()
{
    Log::debug(...func_get_args());
}

// 格式化输出
function dump()
{
    $args = func_get_args();
    foreach ($args as $arg) {
        if ( is_array($arg) ) {
            echo '<pre>' . print_r($arg, 1) . '</pre>';
        } else {
            var_dump($arg);
        }
        echo '<br>';
    }
}