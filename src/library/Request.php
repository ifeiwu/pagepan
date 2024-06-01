<?php
class Request
{
    /**
     * 扩展函数数组
     * @var array
     */
    private static $_funs = [];

    /**
     * 调用扩展函数
     * @param $name 名称
     * @param $args 参数
     * @return mixed
     */
    public static function __callStatic($name, $args)
    {
        if ( ! isset(self::$_funs[$name]) ) {
            self::$_funs[$name] = require LIB_PATH . "request/{$name}.php";
        }

        $fun = Closure::bind(self::$_funs[$name], new self());

        return call_user_func_array($fun, $args);
    }

    // GET 请求
    public static function get($name = null, $type = '*', $default = null)
    {
        return self::input($_GET, $name, $type, $default);
    }

    // POST 请求
    public static function post($name = null, $type = '*', $default = null)
    {
        return self::input($_POST, $name, $type, $default);
    }

    // REQUEST 请求
    public static function all($name = null, $type = '*', $default = null)
    {
        return self::input($_REQUEST, $name, $type, $default);
    }

    // Body 请求
    public static function body($name = null, $type = '*', $default = null)
    {
        $json = file_get_contents('php://input');
        $data = $json ? json_decode($json, true) : [];

        return self::input($data, $name, $type, $default);
    }

    // 请求处理
    public static function input($data, $name = null, $type = '*', $default = null)
    {
        if ($name !== null) {
            $value = isset($data[$name]) ? $data[$name] : $default;
            $type = !is_callable($type) ? $type : 'object';

            switch ($type) {
                case 'int':
                    $value = intval($value);
                    break;
                case 'float':
                    $value = floatval($value);
                    break;
                case 'bool':
                    $value = boolval($value);
                    break;
                case 'object':
                    $value = $type();
                    break;
                case 'Aa0':
                    $value = preg_replace('/[^0-9a-zA-Z]+/', '', $value);
                    break;
                case 'Aa':
                    $value = preg_replace('/[^A-Za-z]+/', '', $value);
                    break;
                case 'A':
                    $value = preg_replace('/[^A-Z]+/', '', $value);
                    break;
                case 'a':
                    $value = preg_replace('/[^a-z]+/', '', $value);
                    break;
                case 'username': // 用户名：替换非中文、数字、字母、下划线和横线的字符。
                    $value = preg_replace('/[^\x{4e00}-\x{9fa5}A-Za-z0-9_-]/u', '', $value);
                    break;
                case 'filename': // 文件名：替换字符串中的尖括号、冒号、斜杠、反斜杠、竖线、问号和星号，并将其替换为空字符串。
                    $value = preg_replace('/[<>:"\/\\|?*]+/', '', $value);
                    break;
                case 'filepath': // 文件和路径：替换字符串中的尖括号、冒号、竖线、问号和星号，并将其替换为空字符串。
                    $value = preg_replace('/[<>:"|?*]+/', '', $value);
                    break;
                case 'keywords': // 关键字：替换非Unicode字母(不包括特殊字符或标点符号)、数字、下划线、横线和空格的字符。
                    $value = preg_replace('/[^\p{L}\p{N}_\-\s]/u', '', $value);
                    break;
                case '*':
                    break;
                default:
                    $value = $type ? preg_replace($type, '', $value) : $value;
                    break;
            }

            return $value;
        }

        return $data;
    }


    public static function url($isfull = false)
    {
        if (isset($_SERVER['HTTP_X_REWRITE_URL'])) {
            $url = $_SERVER['HTTP_X_REWRITE_URL'];
        } elseif (isset($_SERVER['REQUEST_URI'])) {
            $url = $_SERVER['REQUEST_URI'];
        } elseif (isset($_SERVER['ORIG_PATH_INFO'])) {
            $url = $_SERVER['ORIG_PATH_INFO'] . (!empty($_SERVER['QUERY_STRING']) ? '?' . $_SERVER['QUERY_STRING'] : '');
        } else {
            $url = '';
        }

        return $isfull === true ? self::domain() . $url : $url;
    }


    public static function baseUrl($isfull = false)
    {
        $url = self::url();
        $url = strpos($url, '?') ? strstr($url, '?', true) : $url;

        return $isfull === true ? self::domain() . $url : $url;
    }


    public static function rootUrl($isfull = false)
    {
        $root = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/') . '/';

        return $isfull === true ? self::domain() . $root : $root;
    }


    public static function method()
    {
        $method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';

        if (isset($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'])) {
            $method = $_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'];
        } else if (isset($_REQUEST['_method'])) {
            $method = $_REQUEST['_method'];
        }

        return strtoupper($method);
    }

    public static function scheme()
    {
        return self::isSsl() ? 'https' : 'http';
    }

    public static function host()
    {
        return $_SERVER['HTTP_HOST'];
    }

    public static function domain()
    {
        return self::scheme() . '://' . self::host();
    }

    public static function query()
    {
        return $_SERVER['QUERY_STRING'];
    }

    public static function isAjax()
    {
        return (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtoupper($_SERVER['HTTP_X_REQUESTED_WITH']) == 'XMLHTTPREQUEST') ? true : false;
    }

    public static function isGet()
    {
        return self::method() == 'GET' ? true : false;
    }

    public static function isPost()
    {
        return self::method() == 'POST' ? true : false;
    }

    public static function isSsl()
    {
        if (isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS'] == '1' || strtolower($_SERVER['HTTPS']) == 'on')) {
            return true;
        } elseif (isset($_SERVER['REQUEST_SCHEME']) && $_SERVER['REQUEST_SCHEME'] == 'https') {
            return true;
        } elseif (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == '443') {
            return true;
        } elseif (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') {
            return true;
        }

        return false;
    }
}