<?php

namespace support;

/**
 * https://github.com/thephpleague/plates
 */
class View2
{
    /**
     * @var string 模板基本路径
     */
    protected string $basePath;

    /**
     * @var array 模板数据
     */
    protected array $data = [];

    /**
     * @var string 模板扩展名称
     */
    protected string $extname = '.php';

    /**
     * @var string 模板布局名称
     */
    protected string $layoutName = '';

    /**
     * @var array 模板布局数据
     */
    protected array $layoutData = [];

    /**
     * @var string 内容块名称
     */
    protected string $sectionName = '';

    /**
     * @var array 内容块数组
     */
    protected array $sections = [];

    /**
     * @var array 扩展函数数组
     */
    private array $funcs = [];

    /**
     * 调用扩展函数
     * @param $name 名称
     * @param $args 参数
     * @return mixed
     */
    public function __call(string $name, array $args = [])
    {
        if (!isset($this->funcs[$name])) {
            $this->funcs[$name] = require app_path("/helper/view/{$name}.php");
        }

        return $this->funcs[$name](...$args);
    }

    public function __construct(string|null $path = null)
    {
        $this->basePath = $path ?? multi_app_path('view');
    }

    public function __get(string $name)
    {
        return $this->data[$name];
    }

    public function __set(string $name, mixed $value)
    {
        $this->data[$name] = $value;
    }

    /**
     * 设置模板扩展名称
     * @param $value
     * @return void
     */
    public function setExtname(string $value)
    {
        $this->extname = $value;
    }

    /**
     * 设置模板数据
     * @param $name
     * @param $value
     * @return void
     */
    public function assign(string $name, mixed $value = null)
    {
        if (is_array($name)) {
            $this->data = array_merge($this->data, $name);
        } else {
            if (strpos($name, '.')) {
                list($name1, $name2) = explode('.', $name, 2);
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
    public function render(string $name, array $data = [])
    {
        if (!empty($data)) {
            $this->data = array_merge($this->data, $data);
        }

        try {
            ob_start();

            (function () {
                extract($this->data, EXTR_OVERWRITE);
                include func_get_arg(0);
            })("{$this->basePath}/{$name}{$this->extname}");

            return ob_get_clean();
        } catch (Throwable $ex) {
            while (ob_get_level()) ob_end_clean();
            throw $ex;
        }
    }

    /**
     * 获取解析的内容
     * @param $content
     * @param $data
     * @return false|string
     */
    public function parse(string $content, array $data = [])
    {
        if (!empty($data)) {
            $this->data = array_merge($this->data, $data);
        }

        try {
            ob_start();

            (function () {
                extract($this->data, EXTR_OVERWRITE);
                eval('?>' . func_get_arg(0));
            })($content);

            return ob_get_clean();
        } catch (Throwable $ex) {
            while (ob_get_level()) ob_end_clean();
            throw $ex;
        }
    }

    /**
     * 设置模板的布局
     * @param $name
     * @param $data
     * @return void
     */
    public function layout(string $name, array $data = [])
    {
        $this->layoutName = $name;
        $this->layoutData = $data;
    }

    /**
     * 响应输出
     * @param mixed $name
     * @param array $data
     * @return Response
     */
    public function response(mixed $name, array $data = []): Response
    {
        if (is_string($name)) {
            $content = $this->render($name, $data);
        } elseif (is_callable($name)) {
            ob_start();
            $name($this);
            $content = ob_get_clean();
        }

        if ($this->layoutName) {
            $this->addSection('content', $content);
            $content = $this->render("layout/{$this->layoutName}", $this->layoutData);
            $this->layoutName = '';
            $this->layoutData = [];
        }

        return new Response(200, [], $content);
    }

    /**
     * 开始当前内容块
     * @param string $name
     * @return null
     */
    public function start(string $name = null)
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
     * @param string $name 块名称
     * @param string $default 默认块内容
     * @return string|null
     */
    public function section(string $name, string $default = '')
    {
        if (!isset($this->sections[$name])) {
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
    public function addSection(string $name, string $content)
    {
        $this->sections[$name] = $content;
    }

    /**
     * 获取模板内容
     * @param $name
     * @param $data
     * @return false|string
     */
    public function fetch(string $name, array $data = [])
    {
        return $this->render($name, $data);
    }

    /**
     * 页面插入模板内容
     * @param string $name
     * @param array $data
     * @return null
     */
    public function insert(string $name, array $data = [])
    {
        echo $this->render($name, $data);
    }

    public function url(string $url = null)
    {
        return $url . '?v=' . APP_VER;
    }

    /**
     * 将多个函数应用于变量。
     * @param mixed $var
     * @param string $functions
     * @return mixed
     */
    public function batch(mixed $var, string $functions)
    {
        foreach (explode('|', $functions) as $function) {
            if (is_callable($function)) {
                $var = call_user_func($function, $var);
            } else {
                throw new \Exception('The batch function could not find the "' . $function . '" function.');
            }
        }

        return $var;
    }

    /**
     * 转义字符串
     * @param string $string
     * @param null|string $functions
     * @return string
     */
    public function escape(string $string, string $functions = null)
    {
        if ($functions) {
            $string = $this->batch($string, $functions);
        }

        return htmlspecialchars($string ?? '', ENT_QUOTES, 'UTF-8');
    }

    /**
     * escape 函数的别名
     * @param string $string
     * @param null|string $functions
     * @return string
     */
    public function e(string $string, string $functions = null)
    {
        return $this->escape($string, $functions);
    }
}