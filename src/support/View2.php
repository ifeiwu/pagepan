<?php

namespace support;

use Exception;
use Throwable;

/**
 * 基于 PHP 原生模板的视图渲染类。
 *
 * 参考：https://github.com/thephpleague/plates
 */
class View2
{
    /**
     * 模板基本路径。
     *
     * @var string
     */
    protected string $basePath;

    /**
     * 模板数据。
     *
     * @var array
     */
    protected array $data = [];

    /**
     * 模板文件扩展名。
     *
     * @var string
     */
    protected string $extensionName = '.php';

    /**
     * 模板布局名称。
     *
     * @var string
     */
    protected string $layoutName = '';

    /**
     * 模板布局数据。
     *
     * @var array
     */
    protected array $layoutData = [];

    /**
     * 当前内容块名称。
     *
     * @var string
     */
    protected string $sectionName = '';

    /**
     * 已保存的内容块。
     *
     * @var array
     */
    protected array $sections = [];

    /**
     * 已加载的模板扩展函数。
     *
     * @var array
     */
    private array $funcs = [];

    /**
     * 调用模板扩展函数。
     *
     * 根据函数名称加载 helper/view 目录下对应的 PHP 文件，
     * 并将传入参数转发给扩展函数。
     *
     * @param string $name 扩展函数名称
     * @param array $args 函数参数
     * @return mixed 扩展函数的执行结果
     */
    public function __call(string $name, array $args = [])
    {
        if (!isset($this->funcs[$name])) {
            $this->funcs[$name] = require app_path("helper/view/{$name}.php");
        }

        return $this->funcs[$name](...$args);
    }

    /**
     * 初始化视图对象。
     *
     * @param string $path 模板基本路径，为空时使用默认视图目录
     */
    public function __construct(string $path = '')
    {
        $this->basePath = $path ?: multi_app_path('view');
    }

    /**
     * 获取模板数据。
     *
     * @param string $name 数据名称
     * @return mixed 数据值，不存在时返回 null
     */
    public function __get(string $name): mixed
    {
        return $this->data[$name] ?? null;
    }

    /**
     * 设置模板数据。
     *
     * @param string $name 数据名称
     * @param mixed $value 数据值
     * @return void
     */
    public function __set(string $name, mixed $value): void
    {
        $this->data[$name] = $value;
    }

    /**
     * 设置模板文件扩展名。
     *
     * @param string $value 文件扩展名
     * @return void
     */
    public function setExtensionName(string $value): void
    {
        $this->extensionName = $value;
    }

    /**
     * 分配模板数据。
     *
     * 支持批量分配、普通键值分配以及使用点号指定一级子键。
     *
     * @param string|array $name 数据名称或数据数组
     * @param mixed $value 数据值
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
     * 输出内容块组件。
     *
     * 根据组件分类和配置确定组件路径，并合并组件模板数据后输出。
     *
     * @param string $category 组件分类
     * @param array $config 组件配置数据
     * @param array ...$data 额外的组件模板数据
     * @return void
     */
    public function component(string $category, array $config, array ...$data): void
    {
        $setting = $config['setting'] ?? [];
        $name = $setting['component.' . $category] ?? '';
        $component = str_replace('.', '/', $category) . "/$name";

        if ($name) {
            echo $this->getComponent($setting['repo.path'], $component, array_merge(['config' => $config], ...$data));
        } else {
            echo "Invalid content block component: $component";
        }
    }

    /**
     * 获取组件渲染内容。
     *
     * @param string $repository 仓库名称
     * @param string $component 组件名称
     * @param array $data 组件模板数据
     * @return string 渲染后的 HTML 内容
     */
    public function getComponent(string $repository, string $component, array $data = []): string
    {
        return $this->renderFile(
            storage_path("repository/{$repository}/components/{$component}/code.php"),
            $data
        );
    }

    /**
     * 渲染指定文件并返回模板内容。
     *
     * @param string $file 模板文件完整路径
     * @param array $data 模板数据
     * @return string 渲染后的内容
     * @throws Throwable 模板执行过程中发生异常时抛出
     */
    public function fetch(string $file, array $data = []): string
    {
        return $this->renderFile($file, $data);
    }

    /**
     * 根据模板名称渲染模板。
     *
     * @param string $name 模板名称，不包含文件扩展名
     * @param array $data 模板数据
     * @return string 渲染后的内容
     * @throws Throwable 模板执行过程中发生异常时抛出
     */
    public function render(string $name, array $data = []): string
    {
        return $this->renderFile(
            "{$this->basePath}/{$name}{$this->extensionName}",
            $data
        );
    }

    /**
     * 执行模板文件并捕获输出内容。
     *
     * 将传入的数据合并到当前模板数据中，并在独立作用域内执行模板。
     *
     * @param string $file 模板文件完整路径
     * @param array $data 模板数据
     * @return string 模板输出内容
     * @throws Throwable 模板执行过程中发生异常时抛出
     */
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
     * 解析 PHP 模板字符串。
     *
     * 将模板数据提取为局部变量，并执行模板代码。
     *
     * @param string $content 模板字符串
     * @param array $data 模板数据
     * @return string 解析后的内容
     * @throws Throwable 模板执行过程中发生异常时抛出
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
     * 设置模板布局。
     *
     * @param string $name 布局模板名称
     * @param array $data 布局模板数据
     * @return void
     */
    public function layout(string $name, array $data = []): void
    {
        $this->layoutName = $name;
        $this->layoutData = $data;
    }

    /**
     * 渲染模板或回调内容，并返回 HTTP 响应。
     *
     * 如果已设置布局，则将当前渲染内容作为 content 内容块传入布局模板。
     *
     * @param mixed $name 模板名称或内容回调函数
     * @param array $data 模板数据
     * @return Response HTTP 响应对象
     * @throws Throwable 模板执行过程中发生异常时抛出
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
     * 开始捕获内容块。
     *
     * @param string $name 内容块名称，默认为 content
     * @return void
     */
    public function start(string $name = ''): void
    {
        $this->sectionName = $name ?: 'content';

        ob_start();
    }

    /**
     * 停止捕获当前内容块并保存内容。
     *
     * @return void
     */
    public function stop(): void
    {
        $this->sections[$this->sectionName] = ob_get_clean();
    }

    /**
     * 获取已保存的内容块。
     *
     * @param string $name 内容块名称
     * @param string $default 内容块不存在时返回的默认内容
     * @return string|null 内容块内容或默认内容
     */
    public function section(string $name, string $default = ''): ?string
    {
        if (!isset($this->sections[$name])) {
            return $default;
        }

        return $this->sections[$name];
    }

    /**
     * 添加内容块。
     *
     * @param string $name 内容块名称
     * @param string $content 内容块内容
     * @return void
     */
    public function addSection(string $name, string $content): void
    {
        $this->sections[$name] = $content;
    }

    /**
     * 在当前模板中插入并输出另一个模板。
     *
     * @param string $name 模板名称
     * @param array $data 模板数据
     * @return void
     * @throws Throwable 模板执行过程中发生异常时抛出
     */
    public function insert(string $name, array $data = []): void
    {
        echo $this->render($name, $data);
    }

    /**
     * 捕获回调函数的输出内容。
     *
     * 使用输出缓冲区收集内容；发生异常时清理本次创建的缓冲区并重新抛出异常。
     *
     * @param callable $callback 输出回调函数
     * @return string 捕获的输出内容
     * @throws Throwable 回调执行过程中发生异常时抛出
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
     * 判断链接是否为当前页面。
     *
     * 首页链接（空字符串或 #）匹配首页路径；
     * 普通链接忽略路径首尾的斜杠。
     *
     * @param string|null $url 链接地址
     * @param string|null $path 当前页面路径，默认读取请求上下文
     * @return bool 是否为当前页面
     */
    public function isActive(string|null $url, string $path = null): bool
    {
        $url = $url ?? '';
        $page_path = $path ?? context('page.path');

        if (in_array($url, ['', '#'], true)) {
            return in_array($page_path, ['', '/'], true);
        }

        return trim($page_path, '/') === trim($url, '/');
    }

    /**
     * 获取当前页面对应的 active 样式类。
     *
     * @param string|null $url 链接地址
     * @return string 匹配时返回 active，否则返回空字符串
     */
    public function active(string|null $url): string
    {
        return $this->isActive($url) ? 'active' : '';
    }

    /**
     * 将多个函数依次应用于变量。
     *
     * 使用竖线分隔函数名称，每个函数接收上一个函数的执行结果。
     *
     * @param mixed $var 初始变量
     * @param string $functions 以 | 分隔的函数名称
     * @return mixed 最后一个函数的执行结果
     * @throws Exception 函数不存在或不可调用时抛出
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
     * 转义字符串。
     *
     * 可选先通过指定的函数链处理字符串，再使用 htmlspecialchars 转义 HTML 特殊字符。
     *
     * @param string $string 待转义字符串
     * @param string|null $functions 可选的函数链，多个函数使用 | 分隔
     * @return string 转义后的字符串
     * @throws Exception 函数链中的函数不存在或不可调用时抛出
     */
    public function escape(string $string, ?string $functions = null): string
    {
        if ($functions) {
            $string = $this->batch($string, $functions);
        }

        return htmlspecialchars($string ?? '', ENT_QUOTES, 'UTF-8');
    }

    /**
     * escape() 方法的简写别名。
     *
     * @param string $string 待转义字符串
     * @param string|null $functions 可选的函数链，多个函数使用 | 分隔
     * @return string 转义后的字符串
     * @throws Exception 函数链中的函数不存在或不可调用时抛出
     */
    public function e(string $string, ?string $functions = null): string
    {
        return $this->escape($string, $functions);
    }
}