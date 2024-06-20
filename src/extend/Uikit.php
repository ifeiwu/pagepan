<?php
class Uikit {

    public $basePath;

    public $config;

    private static $_funs = [];

    /**
     * 单例设计模式
     * @var object
     */
    private static $_instance;

    public static function new($path = null)
    {
        if ( ! (self::$_instance instanceof self) )
        {
            self::$_instance = new self($path);
        }

        return self::$_instance;
    }

    private function __construct($path)
    {
        $this->basePath = $path ?? CACHE_PATH . 'uikit/';
        $this->config = Config::file('uikit');
    }

    /**
     * 调用扩展函数
     * @param $name 名称
     * @param $args 参数
     * @return mixed
     */
    public function __call($name, $args)
    {
        if ( ! isset(self::$_funs[$name]) ) {
            self::$_funs[$name] = require EXT_PATH . "uikit/{$name}.php";
        }

        $fun = Closure::bind(self::$_funs[$name], $this);

        return call_user_func($fun, ...$args);
    }

    // 加载组件输出内容
    public function load($path, $config = null, $iswrite = true)
    {
        echo $this->getContent($path, $config, $iswrite);
    }

    // 获取组件内容
    public function getContent($path, $config = null, $iswrite = true)
    {
        $config = is_array($config) ? $config : json_decode($config, true);
        $setting = $config['setting'];
        // 针对复用组件创建不同的配置，共用 code.php 文件。
        $number_path = $setting['component.path'];
        $number_path = $number_path ?: $path;

        $ukid = $setting['ukid'] ?: uniqid('uk');

        $config['path'] = $path;
        $config['ukid'] = $ukid;

        // 动态组件写入文件
        if ( $iswrite == true )
        {
            $content = $this->getWriteCache($number_path, 'code');
            $default = $this->view->parse($content, $config);
            $content = $this->view->section($ukid, $default);
        }
        // 静态组件输出内容
        else
        {
            $content = $this->getRemoteCode($number_path, 'code');
            $default = $this->view->parse($content, $config);
            $content = $this->view->section($ukid, $default);
        }

        return $content;
    }

    // 组件源代码，写入本地缓存目录
    public function getWriteCache($path, $name)
    {
        $filepath = $this->basePath . $path;
        $filename = "{$filepath}/{$name}.php";

        if ( $this->config['cache'] == false || ! is_file($filename) )
        {
            if ( ! is_dir($filepath) ) {
                mkdir($filepath, 0755, true);
            }

            $content = $this->getRemoteCode($path, $name);

            if ( file_put_contents($filename, $content) === false ) {
                throw new Exception("写入文件失败：{$filename}");
            }

            return $content;
        }

        return file_get_contents($filename);
    }

    // 返回远程组件源代码
    public function getRemoteCode($path, $name)
    {
        $url = $this->config['uri'] . 'file-code';
        $res = helper('curl/api', [$url, ['path' => $path, 'name' => $name]]);

        if ( $res['code'] == 0 ) {
            return gzuncompr($res['data']);
        } else {
            return '';
        }
    }

    // 获取 uikit 文件
    public function file($path, $name)
    {
        $this->getWriteCache($path, $name);

        return $this->basePath . "{$path}/{$name}.php";
    }

    // 读取动态组件演示数据
    public function demo()
    {
        $this->getWriteCache($this->view->path, 'demo');

        include $this->basePath . "{$this->view->path}/demo.php";

        $this->demoData = get_defined_vars();

        return $this->demoData;
    }

    // 查询演示数据
    public function demodb($table, $columns = '*', $wheres = [], $order = null, $limit = null, $number = null)
    {
        $token = require CONF_PATH . 'apikey.php';
        $url = Request::rootUrl(true) . 'api/v2/demo/select';
        $data = [
            'table' => $table,
            'columns' => $columns,
            'wheres' => $wheres,
            'order' => $order,
            'limit' => $limit,
            'number' => $number
        ];

        $res = helper('curl/api', [$url, $data, $token]);
        if ( $res['code'] != 0 ) {
            throw new Exception($res['message']);
        }

        return $res['data'];
    }

    // 返回组件图片、视频或音频等链接
    public function image($name = '')
    {
        // 返回组件当前路径
        if ($name == '') {
            $url = "{$this->config['uri']}{$this->view->path}/image";
        } // 当前组件图片
        else if (preg_match('/^[^\/]*\.(jpg|svg|png|webp|gif|mp4|mp3)$/i', $name)) {
            $url = "{$this->config['uri']}{$this->view->path}/image/$name";
        } // 指定组件图片
        elseif (strpos($name, 'number/') === 0 || strpos($name, 'domain/') === 0) {
            // 指定图片名称，否则返回路径
            if (preg_match('/\.(jpg|svg|png|webp|gif|mp4|mp3)$/i', $name)) {
                $url = "{$this->config['uri']}{$name}";
            } else {
                $url = "{$this->config['uri']}{$name}/image";
            }
        } // 动态生成图片：bgc.png&w=500&h=500&fit=crop-center
        elseif (preg_match('/[&]+/', $name)) {
            $url = "{$this->config['cdn.uri']}glide?path=$name";
        } else {
            $url = "{$this->config['cdn.uri']}{$name}";
        }

        return $url;
    }

    // 外联样式输出
    public function getSettingClass($prefix, $default_class = '')
    {
        $user_class = $this->view->setting[$prefix . '.class'];
        if ( $user_class && ! is_string($user_class) ) {
            $user_class = helper('arr/toclass', [$user_class]);
            // 2023/3/3 前的网站用户需要给 dataview 合并默认样式代码
            if ( strpos($default_class, 'dataview') !== false &&
                strpos($user_class, 'dataview') === false ) {
                $user_class = 'dataview row ' . $user_class;
            }
        }
        return $user_class ?: $default_class;
    }

    // 内联样式输出
    public function getSettingStyle($prefix, $default_style = '')
    {
        $user_style = $this->view->setting[$prefix . '.style'];
        if ( $user_style && ! is_string($user_style) ) {
            $user_style = helper('arr/tostyle', [$user_style]);
        }
        return $user_style ?: $default_style;
    }

    // 标签属性输出
    public function getSettingAttrs($prefix, $values = [])
    {
        $attrs = '';
        $setting = $this->view->setting;

        if ($prefix == 'component') {
            $attrs .= 'uk="' . $this->view->path . '" ';
            $attrs .= $this->view->ukid . ' ';
        } elseif (isset($setting[$prefix . '.alias'])) {
            $attrs .= 'number="' . $setting[$prefix . '.alias'] . '" ';
        }

        if (!isset($values['data'])) {
            $values['data'] = '';
        }
        if (!isset($values['class'])) {
            $values['class'] = '';
        }
        if (!isset($values['style'])) {
            $values['style'] = '';
        }

        foreach ($values as $attr => $value) {
            if ($attr === 'class') {
                // '-'可替换的样式, '+'必需的样式
                if (is_array($value)) {
                    $_class = $this->getSettingClass($prefix, $value['-']);
                    $attrs .= 'class="' . $_class . ' ' . $value['+'] . '" ';
                } else {
                    // 可替换的样式
                    $_class = $this->getSettingClass($prefix, $value);
                    if ($_class) {
                        $attrs .= 'class="' . $_class . '" ';
                    }
                }
            } elseif ($attr === 'style') {
                // '-'可替换的样式, '+'必需的样式
                if (is_array($value)) {
                    $_style = $this->getSettingStyle($prefix, $value['-']);
                    $attrs .= 'style="' . $_style . ' ' . $value['+'] . '" ';
                } else {
                    // 可替换的样式
                    $_style = $this->getSettingStyle($prefix, $value);
                    if ($_style) {
                        $attrs .= 'style="' . $_style . '" ';
                    }
                }
            } elseif ($attr === 'data') {
                $setting_data = $setting[$prefix . '.data'] ?: $value;
                if (is_array($setting_data)) {
                    foreach ($setting_data as $k => $v) {
                        $v = is_array($v) ? htmlentities(json_encode($v), ENT_QUOTES) : $v;
                        $attrs .= 'data-' . $k . '="' . $v . '" ';
                    }
                }
            } elseif (is_bool($value) && $value == true) {
                $attrs .= $attr . ' ';
            } elseif (is_string($attr)) {
                $attr_value = $setting[$prefix . '.' . $attr] ?: $value;
                if ($attr_value) {
                    $attrs .= $attr . '="' . $attr_value . '" ';
                }
            } elseif (is_int($attr)) {
                $attrs .= $value . ' ';
            }
        }

        if (!isset($setting['isbuilder'])) {
            return $attrs;
        } else {
            if ($prefix == 'component' || $prefix == 'container') {
                return $attrs;
            } else {
                return $attrs . 'data-setting-prefix="' . $prefix . '"';
            }
        }
    }

    // 组件前置代码
    public function getSettingBeforeCode()
    {
        $beforecode = $this->view->setting['component.beforecode'];
        if ( $beforecode ) {
            $beforecode = base64_decode($beforecode);
        }
        return $beforecode;
    }

    // 组件后置代码
    public function getSettingAfterCode()
    {
        $aftercode = $this->view->setting['component.aftercode'];
        if ( $aftercode ) {
            $aftercode = base64_decode($aftercode);
        }
        return $aftercode;
    }
}