<?php

namespace app\exception;

use support\exception\BusinessException;
use Webman\Http\Request;
use Webman\Http\Response;

class RateLimitException extends BusinessException
{
    public function render(Request $request): Response
    {
        if (str_contains($request->header('accept', ''), 'text/event-stream')) {
            datastar()->script("dialog('{$this->getMessage()}')")->close();
        } elseif ($request->expectsJson()) {
            return json(['code' => 1, 'message' => $this->getMessage()]);
        } else {
            return view('429', ['message' => 'Too Many Requests'])->withStatus(429);
        }
    }
}