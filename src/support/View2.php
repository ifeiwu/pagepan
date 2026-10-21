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
     * @param string $name
     * @param array $args
     * @return mixed
     */
    public function __call(string $name, array $args = [])
    {
        if (!isset($this->funcs[$name])) {
            $this->funcs[$name] = require app_path("/helper/view/{$name}.php");
        }

        return $this->funcs[$name](...$args);
    }

    public function __construct(string $path = '')
    {
        $this->basePath = $path ?: multi_app_path('view');
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
     * @param string $value
     * @return void
     */
    public function setExtname(string $value): void
    {
        $this->extname = $value;
    }

    /**
     * 设置模板数据
     * @param string $name
     * @param mixed $value
     * @return void
     */
    public function assign(string $name, mixed $value): void
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
     * @param string $name 模板名称
     * @param array $data 模板数据
     * @return false|string
     */
    public function render(string $name, array $data = []): bool|string
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
        } catch (\Throwable $ex) {
            while (ob_get_level()) ob_end_clean();
            throw $ex;
        }
    }

    /**
     * 获取解析的内容
     * @param string $content
     * @param array $data
     * @return false|string
     */
    public function parse(string $content, array $data = []): bool|string
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
        } catch (\Throwable $ex) {
            while (ob_get_level()) ob_end_clean();
            throw $ex;
        }
    }

    /**
     * 设置模板的布局
     * @param string $name
     * @param array $data
     * @return void
     */
    public function layout(string $name, array $data = []): void
    {
        $this->layoutName = $name;
        $this->layoutData = $data;
    }

    /**
     * 支持布局响应输出
     * @param mixed $name
     * @param array $data
     * @return Response
     * @throws \Throwable
     */
    public function display(mixed $name, array $data = []): Response
    {
        $content = '';

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
     * @return void
     */
    public function start(string $name = ''): void
    {
        $this->sectionName = $name ?: 'content';

        ob_start();
    }

    /**
     * 停止当前内容块
     * @return void
     */
    public function stop(): void
    {
        $this->sections[$this->sectionName] = ob_get_clean();
    }

    /**
     * 返回内容块的内容
     * @param string $name 块名称
     * @param string $default 默认块内容
     * @return string|null
     */
    public function section(string $name, string $default = ''): ?string
    {
        if (!isset($this->sections[$name])) {
            return $default;
        }

        return $this->sections[$name];
    }

    /**
     * 添加内容块
     * @param string $name
     * @param string $content
     * @return void
     */
    public function addSection(string $name, string $content): void
    {
        $this->sections[$name] = $content;
    }

    /**
     * 获取模板内容
     * @param string $name
     * @param array $data
     * @return false|string
     */
    public function fetch(string $name, array $data = []): bool|string
    {
        return $this->render($name, $data);
    }

    /**
     * 页面插入模板内容
     * @param string $name
     * @param array $data
     * @return void
     */
    public function insert(string $name, array $data = []): void
    {
        echo $this->render($name, $data);
    }

    /**
     * @param string $url
     * @return string
     */
    public function url(string $url): string
    {
        return $url . '?v=' . APP_VER;
    }

    /**
     * 将多个函数应用于变量。
     * @param mixed $var
     * @param string $functions
     * @return mixed
     * @throws \Exception
     */
    public function batch(mixed $var, string $functions): mixed
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
     * @param string|null $functions
     * @return string
     * @throws \Exception
     */
    public function escape(string $string, string $functions = null): string
    {
        if ($functions) {
            $string = $this->batch($string, $functions);
        }

        return htmlspecialchars($string ?? '', ENT_QUOTES, 'UTF-8');
    }

    /**
     * escape 函数的别名
     * @param string $string
     * @param string|null $functions
     * @return string
     * @throws \Exception
     */
    public function e(string $string, string $functions = null): string
    {
        return $this->escape($string, $functions);
    }
}