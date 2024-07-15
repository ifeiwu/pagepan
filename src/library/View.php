<?php
/**
 * https://github.com/thephpleague/plates
 */
class View
{
    /**
     * 关联 Uikit 对象
     * @var Uikit
     */
    public $uikit;

    /**
     * 模板基本路径
     * @var string
     */
    protected $basePath;

    /**
     * 模板数据
     * @var array
     */
    protected $data = [];

    /**
     * 模板扩展名称
     * @var string
     */
    protected $extname = '.phtml';

    /**
     * 模板布局名称
     * @var string
     */
    protected $layoutName;

    /**
     * 模板布局数据
     * @var array
     */
    protected $layoutData = [];

    /**
     * 内容块名称
     * @var string
     */
    protected $sectionName;

    /**
     * 内容块数组
     * @var array
     */
    protected $sections = [];

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
        if ( ! (self::$_instance instanceof self) )
        {
            self::$_instance = new self($path);
        }

        return self::$_instance;
    }

    /**
     * 调用扩展函数
     * @param $name 名称
     * @param $args 参数
     * @return mixed
     */
    public function __call($name, $args)
    {
        if ( ! isset(self::$funcs[$name]) ) {
            self::$funcs[$name] = require LIB_PATH . "view/{$name}.php";
        }

        $func = Closure::bind(self::$funcs[$name], $this);

        return call_user_func_array($func, $args);
    }

    private function __construct($path)
    {
        $this->basePath = $path ?? APP_PATH;
    }

    public function __get($name)
    {
        return $this->data[$name];
    }

    public function __set($name, $value)
    {
        $this->data[$name] = $value;
    }

    /**
     * 设置模板扩展名称
     * @param $value
     * @return void
     */
    public function setExtname($value)
    {
        $this->extname = $value;
    }

    /**
     * 设置模板数据
     * @param $name
     * @param $value
     * @return void
     */
    public function assign($name, $value = null)
    {
        if ( is_array($name) ) {
            $this->data = array_merge($this->data, $name);
        } else {
            if ( strpos($name, '.') ) {
                list($name1, $name2) = explode('.', $name);
                $this->data[$name1][$name2] = $value;
            } else {
                $this->data[$name] = $value;
            }
        }
    }

    /**
     * 获取模板内容
     * @param $name 模板名称
     * @param $data 模板数据
     * @return false|string
     */
    public function render($name, $data = null)
    {
        if ( is_array($data) ) {
            $this->data = array_merge($this->data, $data);
        }

        try {
            ob_start();

            (function() {
                extract($this->data, EXTR_OVERWRITE);
                include func_get_arg(0);
            })("{$this->basePath}{$name}{$this->extname}");

            return ob_get_clean();
        }
        catch (Throwable $ex) {
            ob_end_clean();
            throw $ex;
        }
    }

    /**
     * 获取解析的内容
     * @param $content
     * @param $data
     * @return false|string
     */
    public function parse($content, $data = null)
    {
        if ( is_array($data) ) {
            $this->data = array_merge($this->data, $data);
        }

        try {
            ob_start();

            (function() {
                extract($this->data, EXTR_OVERWRITE);
                eval('?>' . func_get_arg(0));
            })($content);

            return ob_get_clean();
        }
        catch (Throwable $ex) {
            ob_end_clean();
            throw $ex;
        }
    }

    /**
     * 设置模板的布局
     * @param $name
     * @param $data
     * @return void
     */
    public function layout($name, $data = [])
    {
        $this->layoutName = $name;
        $this->layoutData = $data;
    }

    /**
     * 输出页面
     * @param $name
     * @param $data
     * @return void
     */
    public function display($name, $data = null)
    {
        $content = $this->render($name, $data);

        if ( $content ) {
            $this->addSection('content', $content);
        }

        if ( $this->layoutName ) {
            $content = $this->render($this->layoutName, $this->layoutData);
        }

        echo $content;
    }

    /**
     * 开始当前内容块
     * @param  string  $name
     * @return null
     */
    public function start($name = null)
    {
        $this->sectionName = $name ?? 'content';

        ob_start();
    }

    /**
     * 停止当前内容块
     * @return null
     */
    public function stop()
    {
        $this->sections[$this->sectionName] = ob_get_clean();
    }

    /**
     * 返回内容块的内容
     * @param  string $name    块名称
     * @param  string $default 默认块内容
     * @return string|null
     */
    public function section($name, $default = null)
    {
        if ( ! isset($this->sections[$name]) ) {
            return $default;
        }

        return $this->sections[$name];
    }

    /**
     * 添加内容块
     * @param $name
     * @param $content
     * @return void
     */
    public function addSection($name, $content)
    {
        $this->sections[$name] = $content;
    }

    /**
     * 获取模板内容
     * @param $name
     * @param $data
     * @return false|string
     */
    public function fetch($name, $data = [])
    {
        return $this->render($name, $data);
    }

    /**
     * 页面插入模板内容
     * @param  string $name
     * @param  array  $data
     * @return null
     */
    public function insert($name, $data = [])
    {
        echo $this->render($name, $data);
    }

    /**
     * 将多个函数应用于变量。
     * @param  mixed  $var
     * @param  string $functions
     * @return mixed
     */
    public function batch($var, $functions)
    {
        foreach (explode('|', $functions) as $function) {
            if (is_callable($function)) {
                $var = call_user_func($function, $var);
            } else {
                throw new Exception(
                    'The batch function could not find the "' . $function . '" function.'
                );
            }
        }

        return $var;
    }

    /**
     * 转义字符串
     * @param  string      $string
     * @param  null|string $functions
     * @return string
     */
    public function escape($string, $functions = null)
    {
        if ( $functions ) {
            $string = $this->batch($string, $functions);
        }

        return htmlspecialchars($string ?? '', ENT_QUOTES, 'UTF-8');
    }

    /**
     * escape 函数的别名
     * @param  string      $string
     * @param  null|string $functions
     * @return string
     */
    public function e($string, $functions = null)
    {
        return $this->escape($string, $functions);
    }
}