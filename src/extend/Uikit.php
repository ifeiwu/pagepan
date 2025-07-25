<?php

class Uikit
{

    /**
     * 关联 View 对象
     * @var View
     */
    public $view;

    /**
     * 缓存基本路径
     * @var string
     */
    public $basePath;

    /**
     * 配置数组
     * @var array
     */
    public $config;

    /**
     * 扩展函数数组
     * @var array
     */
    private static $funcs = [];

    /**
     * 单例设计模式
     * @var object
     */
    private static $_instance;

    public static function new($path = null)
    {
        if (!(self::$_instance instanceof self)) {
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
        if (!isset(self::$funcs[$name])) {
            self::$funcs[$name] = require EXT_PATH . "uikit/{$name}.php";
        }

        $func = Closure::bind(self::$funcs[$name], $this);

        return call_user_func_array($func, $args);
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
        if ($iswrite == true) {
            $content = $this->getWriteCache($number_path, 'code');
            $default = $this->view->parse($content, $config);
            $content = $this->view->section($ukid, $default);
        } // 静态组件输出内容
        else {
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

        if ($this->config['cache'] == false || !is_file($filename)) {
            if (!is_dir($filepath)) {
                mkdir($filepath, 0755, true);
            }

            $content = $this->getRemoteCode($path, $name);
            if ($content) {
                if (file_put_contents($filename, $content) === false) {
                    throw new Exception("写入文件失败：{$filename}");
                }
            }

            return $content;
        }

        return file_get_contents($filename);
    }

    // 返回远程组件源代码
    public function getRemoteCode($path, $name)
    {
        $url = $this->config['url'] . 'file-code';
        $res = helper('curl/api', [$url, ['path' => $path, 'name' => $name]]);

        if ($res['code'] == 0) {
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
        $token = require APP_PATH . 'api/token.php';
        $url = Request::rootUrl(true) . 'api/v2/demo/select';
        $data = ['table' => $table, 'columns' => $columns, 'wheres' => $wheres, 'order' => $order, 'limit' => $limit, 'number' => $number];
        $res = helper('curl/api', [$url, $data, $token]);

        if ($res['code'] != 0) {
            throw new Exception($res['message']);
        }

        // 图片路径添加 uikit 链接地址
        $uikit_host = Config::file('uikit', 'host');
        $items = $res['data'];
        foreach ($items as $i => $item) {
            $items[$i]['path'] = "{$uikit_host}{$item['path']}";
        }

        return $items;
    }

    // 返回组件资源链接
    public function assets($name = '', $placehold = null)
    {
        $uikit_url = $this->config['url'];
        // 开启图片占位符
        if ($_GET['isplacehold'] && !empty($placehold)) {
            return "{$uikit_url}{$placehold}";
        }
        // 返回站外资源链接
        if (preg_match('/^(https?:\/\/|\/\/)/i', $name)) {
            return $name;
        }
        // 返回当前组件资源目录路径
        if ($name == '') {
            return "{$uikit_url}assets/{$this->view->path}";
        }
        // 动态生成占位图片：img?p=600
        if (strpos($name, 'img?') !== false) {
            return "{$uikit_url}{$name}";
        }
        // $name 只有文件名，加载当前组件资源文件
        if (preg_match('/^[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/', $name) === 1) {
            return "{$uikit_url}assets/{$this->view->path}/{$name}";
        }
        // $name 包含目录和文件名
        if (preg_match('/^.+\/[^\/]+\.[^\/]+$/', $name)) {
            // 加载组件资源文件
            return "{$uikit_url}assets/{$name}";
//            $uikit_file_url = "{$uikit_url}assets/{$name}";
//            $local_file_path = "data/cache/uikit/assets/$name";
//            $this->saveAssets(WEB_ROOT . $local_file_path, $uikit_file_url);
//            return ROOT_URL . $local_file_path;
        }
        // $name 只有目录路径，返回指定组件资源目录路径
        return "{$uikit_url}assets/" . trim($name);
    }

    // 保存远程资源文件到本地目录
//    public function saveAssets($local_file_path, $remote_file_url) {
//        $path_info = pathinfo($local_file_path);
//        $path = $path_info['dirname'];
//        $name = $path_info['basename'];
//
//        if ( ! is_dir($path) ) {
//            mkdir($path, 0755, true);
//        }
//
//        if ( ! is_file($local_file_path) ) {
//            $content = file_get_contents($remote_file_url);
//            return file_put_contents($local_file_path, $content);
//        }
//
//        return true;
//    }

    // 外联样式输出
    public function getSettingClass($prefix, $default_class = '')
    {
        $user_class = $this->view->setting[$prefix . '.class'];
        if ($user_class && !is_string($user_class)) {
            $user_class = helper('arr/toclass', [$user_class]);
            // 2023/3/3 前的网站用户需要给 dataview 合并默认样式代码
            if (strpos($default_class, 'dataview') !== false &&
                strpos($user_class, 'dataview') === false) {
                $user_class = 'dataview row ' . $user_class;
            }
        }
        return $user_class ?: $default_class;
    }

    // 获取 setting 响应式 class 的值
    public function getSettingBreakpointClass($prefix)
    {
        $setting = $this->view->setting;
        $prefix_xs = $setting[$prefix];
        $prefix_sm = $setting[$prefix . '-sm'];
        $prefix_md = $setting[$prefix . '-md'];
        $prefix_lg = $setting[$prefix . '-lg'];
        $prefix_xl = $setting[$prefix . '-xl'];
        $values = [
            $prefix_xs,
            $prefix_sm ? $prefix_sm . '-sm' : '',
            $prefix_md ? $prefix_md . '-md' : '',
            $prefix_lg ? $prefix_lg . '-lg' : '',
            $prefix_xl ? $prefix_xl . '-xl' : ''
        ];
        return implode(' ', array_filter($values));
    }

    // 内联样式输出
    public function getSettingStyle($prefix, $default_style = '')
    {
        $user_style = $this->view->setting[$prefix . '.style'];
        if ($user_style && !is_string($user_style)) {
            $user_style = helper('arr/tostyle', [$user_style]);
        }
        return $user_style ?: $default_style;
    }

    // 标签属性输出
    public function getSettingAttrs($prefix, $attrs = [])
    {
        $_attrs = '';
        $setting = $this->view->setting;

        if ($prefix == 'component') {
            $_attrs .= 'uk="' . $this->view->path . '" ';
            $_attrs .= $this->view->ukid . ' ';
            if (isset($setting['component.id'])) {
                $_attrs .= 'id="' . $setting['component.id'] . '" ';
            }
        } elseif (isset($setting[$prefix . '.alias'])) {
            $_attrs .= 'number="' . $setting[$prefix . '.alias'] . '" ';
        }

        if (!isset($attrs['data'])) {
            $attrs['data'] = '';
        }
        if (!isset($attrs['class'])) {
            $attrs['class'] = '';
        }
        if (!isset($attrs['style'])) {
            $attrs['style'] = '';
        }

        foreach ($attrs as $attr => $value) {
            if ($attr === 'class') {
                // '-'可替换的样式, '+'必需的样式
                if (is_array($value)) {
                    $_class = $this->getSettingClass($prefix, $value['-']);
                    $_attrs .= 'class="' . $_class . ' ' . $value['+'] . '" ';
                } else {
                    // 可替换的样式
                    $_class = $this->getSettingClass($prefix, $value);
                    if ($_class) {
                        $_attrs .= 'class="' . $_class . '" ';
                    }
                }
            } elseif ($attr === 'style') {
                // '-'可替换的样式, '+'必需的样式
                if (is_array($value)) {
                    $_style = $this->getSettingStyle($prefix, $value['-']);
                    $_attrs .= 'style="' . $_style . ' ' . $value['+'] . '" ';
                } else {
                    // 可替换的样式
                    $_style = $this->getSettingStyle($prefix, $value);
                    if ($_style) {
                        $_attrs .= 'style="' . $_style . '" ';
                    }
                }
            } elseif ($attr === 'data') {
                $setting_data = $setting[$prefix . '.data'] ?: $value;
                if (is_array($setting_data)) {
                    foreach ($setting_data as $k => $v) {
                        $v = is_array($v) ? htmlentities(json_encode($v), ENT_QUOTES) : $v;
                        $_attrs .= 'data-' . $k . '="' . $v . '" ';
                    }
                }
            } elseif (is_bool($value) && $value == true) {
                $_attrs .= $attr . ' ';
            } elseif (is_string($attr)) {
                $attr_value = $setting[$prefix . '.' . $attr] ?: $value;
                if ($attr_value) {
                    $_attrs .= $attr . '="' . $attr_value . '" ';
                }
            } elseif (is_int($attr)) {
                $_attrs .= $value . ' ';
            }
        }

        if (!$_GET['isbuilder']) {
            return $_attrs;
        } else {
            if ($prefix == 'component' || $prefix == 'container') {
                return $_attrs;
            } else {
                return $_attrs . 'data-setting-prefix="' . $prefix . '"';
            }
        }
    }

    // 组件前置代码
    public function getSettingBeforeCode()
    {
        $beforecode = $this->view->setting['component.beforecode'];
        if ($beforecode) {
            $beforecode = base64_decode($beforecode);
        }
        return $beforecode;
    }

    // 组件后置代码
    public function getSettingAfterCode()
    {
        $aftercode = $this->view->setting['component.aftercode'];
        if ($aftercode) {
            $aftercode = base64_decode($aftercode);
        }
        return $aftercode;
    }

    // item 返回图片链接
    public function item_image($path, $name, $utime = '', $isfull = false)
    {
        if ($name) {
            $pattern = '/^(https?:\/\/|\/\/)/i';
            if (preg_match($pattern, $name)) {
                $image = $name;
            } else {
                $image = trim($path, '/') . "/$name";
                if (!preg_match($pattern, $image)) {
                    $image = $this->view->asset(trim($image . rtrim("?$utime", '?'), '/'), $isfull);
                }
            }
        } else {
            // 1像素透明图片，防止有些浏览器没有图片显示交叉图片占位符。
            $image = base64_decode('ZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBRUFBQUFCQ0FRQUFBQzFIQXdDQUFBQUMwbEVRVlI0QVdQNHp3QUFBZ0VCQUFidktNc0FBQUFBU1VWT1JLNUNZSUk9');
        }
        return $image;
    }

    // 输出完整文件链接
    public function item_file($path, $name, $utime = '', $isfull = false)
    {
        if ($name) {
            $pattern = '/^(https?:\/\/|\/\/)/i';
            if (preg_match($pattern, $name)) {
                $file = $name;
            } else {
                $file = trim($path, '/') . "/$name";
                if (!preg_match($pattern, $file)) {
                    $file = $this->view->asset(trim($file . rtrim("?$utime", '?'), '/'), $isfull);
                }
            }
        } else {
            $file = '';
        }

        return $file;
    }

    // item 返回图标图片，支持返回svg源代码
    public function item_icon($path, $name, $title = '', $utime = '', $isfull = false)
    {
        // 如果没有图片，则返回标题名称。
        if (!$name = trim($name)) return $title;
        // 如果是svg源代码，则直接返回。
        if (preg_match('/\<svg.*?\>.*/i', $name)) {
            return urldecode($name);
        }
        // 站外或站内图标
        $pattern = '/^(https?:\/\/|\/\/)/i';
        if (preg_match($pattern, $name)) {
            $image = $name;
        } else {
            $image = trim($path, '/') . "/$name";
            if (!preg_match($pattern, $image)) {
                $image = $this->view->asset(trim($image . rtrim("?$utime", '?'), '/'), $isfull);
            }
        }
        // 如是是svg图片，则返回源代码
        if (preg_match('/.+?\.svg/i', $image)) {
            return '<img src="' . $image . '" style="display:none" alt="" onload="fetch(\'' . $image . '\').then(response => response.text()).then(data => {this.parentNode.innerHTML=data})">';
        } // 其它图片格式，返回图片标签。
        else {
            return '<img src="' . $image . '" alt="' . $title . '" loading="lazy">';
        }
    }

    // item 返回链接数组
    public function item_link($item, $default_url = null, $default_target = null)
    {
        $link_url = '';
        $link_title = '';
        $link_target = '';
        // 数组链接
        if (isset($item['link_url'])) {
            $link_url = $item['link_url'];
            $link_title = $item['link_title'];
            $link_target = $item['link_target'];
        } else {
            // 未设置链接，自动添加关联的详情页面链接
            $link = $item['link'];
            // 外部链接
            if (preg_match('/^(https?:\/\/|\/\/)/i', $link)) {
                $link_url = $link;
            } // JSON链接
            else {
                $link = json_decode($link, true);
                if (empty($link['url'])) {
                    if (empty($default_url)) {
                        $join_alias = $this->view->setting['join.alias'];
                        $link_url = $join_alias ? $this->parseUrlItemParams($join_alias . '/id/[item.id].html', $item) : 'javascript:;';
                    } else {
                        $link_url = $this->parseUrlItemParams($default_url, $item);
                    }
                } else {
                    $link_title = $link['title'];
                    $link_url = $link['url'];
                    $link_target = $link['target'];
                }
            }
        }

        $link_url = $this->parseUrlGetParams($link_url);

        return [
            'url' => $link_url,
            'target' => $link_target ?: $default_target,
            'link_title' => $link_title,
            'link_url' => $link_url,
            'link_target' => $link_target
        ];
    }

    // item 返回分类链接
    public function item_category_url($category)
    {
        $link_url = $this->view->setting['category.link.url'];
        if ($link_url !== false) {
            if (is_string($link_url)) {
                return $this->parseUrlGetParams($link_url);
            } else {
                return helper('db/getPageAlias') . '/category/' . $category['id'] . '.html';
            }
        } else {
            return 'javascript:;';
        }
    }

    // item 返回转换的内容
    public function item_content($content, $content_type = 'md')
    {
        if ($content_type == 'md') {
            $content = (new Parsedown())->text(html_decode($content));
            $content = preg_replace('/<a(.*?)>(.*?)<\/a>/i', "<a $1 target=\"_blank\">$2</a>", $content);
        } else {
            $content = html_decode($content);
        }
        return preg_replace('/<img.+?src=[\'"](.+?\.(jpg|jpeg|png|webp|avif|bmp|gif|svg))[\'"](.*?)>/i', "<img class=\"lazyload zooming\" data-src=\"$1\" src=\"assets/image/loading.svg\" $3>", $content);
    }

    /**
     * URL模板 $_GET 参数替换。
     * 格式：products?cid=[get.cid]&title=[get.title]
     * @param $url
     * @return string
     */
    public function parseUrlGetParams($url)
    {
        if (!empty($url)) {
            preg_match_all("/\[get\.(\w*?)]/i", $url, $matches, PREG_SET_ORDER);
            if (!empty($matches)) {
                foreach ($matches as $matche) {
                    $name = $matche[1];
                    $url = str_replace('[get.' . $name . ']', $_GET[$name], $url);
                }
            }
        }
        return $url;
    }

    /**
     * URL 字符串模板 $item 参数替换。
     * 格式：product/id/[item.id].html
     * @param $url
     * @param $item
     * @return string
     */
    public function parseUrlItemParams($url, $item)
    {
        if (!empty($url)) {
            preg_match_all("/\[item\.(\w*?)]/i", $url, $matches, PREG_SET_ORDER);
            if (!empty($matches)) {
                foreach ($matches as $value) {
                    $name = $value[1];
                    $url = str_replace("[item.{$name}]", $item[$name], $url);
                }
            }
        }
        return $url;
    }
}