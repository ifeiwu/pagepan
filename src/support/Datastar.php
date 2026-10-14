<?php

namespace support;

use starfederation\datastar\Consts;
use starfederation\datastar\ServerSentEventGenerator;
use starfederation\datastar\enums\ElementPatchMode;
use starfederation\datastar\events\EventInterface;
use starfederation\datastar\events\ExecuteScript;
use starfederation\datastar\events\Location;
use starfederation\datastar\events\PatchElements;
use starfederation\datastar\events\PatchSignals;
use starfederation\datastar\events\RemoveElements;

class Datastar
{
    public $headers;

    public $request;

    public $connection;

    public function __construct(array $headers = [])
    {
        // 发送响应标头
        $this->headers = [
            'Cache-Control' => 'no-cache',
            'Content-Type' => 'text/event-stream',
            // Disable buffering for Nginx.
            // https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_buffering
            'X-Accel-Buffering' => 'no',
            ...$headers
        ];
        // Connection-specific headers are only allowed in HTTP/1.1.
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection
        $protocol = $_SERVER['SERVER_PROTOCOL'] ?? null;
        if ($protocol === 'HTTP/1.1') {
            $this->headers['Connection'] = 'keep-alive';
        }

        $this->request = request();
        $this->connection = $this->request->connection;
        // 建立 SSE 通道
        $this->connection->send(new Response(200, $this->headers/*, "\r\n"*/));
    }

    /**
     * 删除现有元素。
     */
    public function remove(string $selector, array $options = []): self
    {
        $event = new RemoveElements($selector, $options);
        $this->connection->send($event->getOutput(), true);

        return $this;
    }

    /**
     * 将元素添加到现有元素的前面。
     */
    public function prepend(string $elements, string $selector = null, array $options = []): self
    {
        return $this->elements($elements, $selector, 'prepend', $options);
    }

    /**
     * 将元素追加到现有元素内。
     */
    public function append(string $elements, string $selector = null, array $options = []): self
    {
        return $this->elements($elements, $selector, 'append', $options);
    }

    // 在现有元素之前插入该元素。
    public function before(string $elements, string $selector = null, array $options = []): self
    {
        return $this->elements($elements, $selector, 'before', $options);
    }

    // 将元素插入到现有元素之后。
    public function after(string $elements, string $selector = null, array $options = []): self
    {
        return $this->elements($elements, $selector, 'after', $options);
    }

    /**
     * 替换现有元素的内部 HTML。
     */
    public function inner(string $elements, string $selector = null, array $options = []): self
    {
        return $this->elements($elements, $selector, 'inner', $options);
    }

    // 将元素变形为现有元素。
    public function outer(string $elements, string $selector = null, array $options = []): self
    {
        return $this->elements($elements, $selector, 'outer', $options);
    }

    // 用新元素替换现有元素
    public function replace(string $elements, string $selector = null, array $options = []): self
    {
        return $this->elements($elements, $selector, 'replace', $options);
    }

    // 要修补的 HTML 元素
    public function element(string $elements, array $options = []): self
    {
        return $this->elements($elements, null, null, $options);
    }

    /**
     * 将 HTML 元素修补到 DOM 中。
     *
     * @param $options array{
     *     selector?: string|null,
     *     mode?: ElementPatchMode|string|null,
     *     useViewTransition?: bool|null,
     *     eventId?: string|null,
     *     retryDuration?: int|null,
     * }
     */
    public function elements(string $elements, string $selector = null, string $mode = null, array $options = []): self
    {
        $selector && $options['selector'] = $selector;
        $mode && $options['mode'] = $mode;

        $event = new PatchElements($elements, $options);
        $this->connection->send($event->getOutput(), true);

        return $this;
    }

    /**
     * 在浏览器中执行 JavaScript。
     */
    public function script(string $script, array $options = ['autoRemove' => true]): self
    {
        $event = new ExecuteScript($script, $options);
        $this->connection->send($event->getOutput(), true);

        return $this;
    }

    /**
     * 调度自定义事件
     * document.addEventListener('message', (e) => {});
     * @param $name // 事件名称
     * @param $detail // 输出内容
     * @return $this
     * @throws \Exception
     */
    public function event(string $name = 'message', array $detail = [], string $selector = null): self
    {
        $detail = json_encode2($detail);
        if ($selector) {
            return $this->script("document.querySelector('$selector').dispatchEvent(new CustomEvent('{$name}',{detail:{$detail}}))");
        } else {
            return $this->script("document.dispatchEvent(new CustomEvent('{$name}',{detail:{$detail}}))");
        }
    }

    /**
     * 修补信号。
     */
    public function signals(array|string $signals, array $options = ['onlyIfMissing' => false]): self
    {
        $event = new PatchSignals($signals, $options);
        $this->connection->send($event->getOutput());

        return $this;
    }

    /**
     * 返回传入请求中发送的信号。
     */
    public function getSignals($key = null): mixed
    {
        $input = $this->request->get(Consts::DATASTAR_KEY) ?? file_get_contents('php://input');
        $signals = $input ? json_decode($input, true) : [];
        if ($key) {
            return $signals[$key] ?? null;
        } else {
            return $signals;
        }
    }

    /**
     * URI 重定向。
     */
    public function location(string $uri, array $options = ['onlyIfMissing' => true]): self
    {
        $event = new Location($uri, $options);
        $this->connection->send($event->getOutput(), true);

        return $this;
    }

    public function close(): void
    {
        $this->connection->close();
    }
}