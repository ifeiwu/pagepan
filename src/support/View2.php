<?php

namespace support;

use Exception;
use Throwable;

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
     * @var string 模板扩展名
     */
    protected string $extensionName = '.php';

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
            $this->funcs[$name] = require app_path("helper/view/{$name}.php");
        }

        return $this->funcs[$name](...$args);
    }

    public function __construct(string $path = '')
    {
        $this->basePath = $path ?: multi_app_path('view');
    }

    public function __get(string $name): mixed
    {
        return $this->data[$name] ?? null;
    }

    public function __set(string $name, mixed $value): void
    {
        $this->data[$name] = $value;
    }

    /**
     * 设置模板扩展名
     * @param string $value
     * @return void
     */
    public function setExtensionName(string $value): void
    {
        $this->extensionName = $value;
    }

    /**
     * 设置模板数据
     * @param string|array $name
     * @param mixed $value
     * @return void
     */
    public function assign(string|array $name, mixed $value = null): void
    {
        if (is_array($name)) {
            $this->data = array_merge($this->data, $name);
        } elseif (str_contains($name, '.')) {
            [$name1, $name2] = explode('.', $name, 2);
            $this->data[$name1] = is_array($this->data[$name1] ?? null)
                ? $this->data[$name1]
                : [];
            $this->data[$name1][$name2] = $value;
        } else {
            $this->data[$name] = $value;
        }
    }


    /**
     * 输出组件
     * @param string $category
     * @param array $setting
     * @param array $data
     * @return void
     */
    public function component(string $category, array $setting, array $data = []): void
    {
        $component = "$category/" . $setting['components.gridview'];
        echo $this->getComponent($setting['repo.path'], $component, $data);
    }

    /**
     * 获取渲染的组件内容
     * @param string $repository 仓库名称
     * @param string $component 组件名称
     * @param array $data 模板数据
     * @return string
     */
    public function getComponent(string $repository, string $component, array $data = []): string
    {
        return $this->renderFile(
            storage_path("repository/{$repository}/components/{$component}.php"),
            $data
        );
    }

    /**
     * 获取指定路径的模板内容
     * @param string $file 完整的文件路径
     * @param array $data 模板数据
     * @return string
     * @throws Throwable
     */
    public function fetch(string $file, array $data = []): string
    {
        return $this->renderFile($file, $data);
    }

    /**
     * 获取模板内容
     * @param string $name 模板名称
     * @param array $data 模板数据
     * @return string
     * @throws Throwable
     */
    public function render(string $name, array $data = []): string
    {
        return $this->renderFile(
            "{$this->basePath}/{$name}{$this->extensionName}",
            $data
        );
    }

    private function renderFile(string $file, array $data = []): string
    {
        if ($data) {
            $this->data = array_merge($this->data, $data);
        }

        return $this->capture(function () use ($file) {
            (function ($file, $data) {
                extract($data, EXTR_SKIP);
                include $file;
            })($file, $this->data);
        });
    }

    /**
     * 获取解析的内容
     * @param string $content
     * @param array $data
     * @return string
     * @throws Throwable
     */
    public function parse(string $content, array $data = []): string
    {
        if ($data) {
            $this->data = array_merge($this->data, $data);
        }

        return $this->capture(function () use ($content) {
            (function ($content, $data) {
                extract($data, EXTR_OVERWRITE);
                eval('?>' . $content);
            })($content, $this->data);
        });
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
     * @throws Throwable
     */
    public function display(mixed $name, array $data = []): Response
    {
        $content = is_string($name)
            ? $this->render($name, $data)
            : (is_callable($name) ? $this->capture(fn() => $name($this)) : '');

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
     * 页面插入模板内容
     * @param string $name
     * @param array $data
     * @return void
     * @throws Throwable
     */
    public function insert(string $name, array $data = []): void
    {
        echo $this->render($name, $data);
    }

    /**
     * 输出缓冲区
     * @param callable $callback
     * @return string
     * @throws Throwable
     */
    private function capture(callable $callback): string
    {
        $level = ob_get_level();
        ob_start();

        try {
            $callback();
            return ob_get_clean();
        } catch (Throwable $ex) {
            while (ob_get_level() > $level) {
                ob_end_clean();
            }

            throw $ex;
        }
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
     * @throws Exception
     */
    public function batch(mixed $var, string $functions): mixed
    {
        foreach (explode('|', $functions) as $function) {
            if (!is_callable($function)) {
                throw new Exception("The batch function could not find the \"{$function}\" function.");
            }

            $var = $function($var);
        }

        return $var;
    }

    /**
     * 转义字符串
     * @param string $string
     * @param string|null $functions
     * @return string
     * @throws Exception
     */
    public function escape(string $string, ?string $functions = null): string
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
     * @throws Exception
     */
    public function e(string $string, ?string $functions = null): string
    {
        return $this->escape($string, $functions);
    }
}