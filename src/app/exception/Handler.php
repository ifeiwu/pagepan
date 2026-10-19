<?php

namespace app\exception;

use Throwable;
use Webman\Exception\ExceptionHandler;
use Webman\Http\Request;
use Webman\Http\Response;
use Webman\Exception\BusinessException;

class Handler extends ExceptionHandler
{
    public $dontReport = [
        BusinessException::class,
    ];

    /**
     * 记录日志
     * @param Throwable $e
     * @return mixed
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * 渲染返回
     * @param Request $request
     * @param Throwable $e
     * @return Response
     */
    public function render(Request $request, Throwable $exception): Response
    {
        $response = parent::render($request, $exception);

        if (str_contains($request->header('accept', ''), 'text/event-stream')) {
            datastar()->script("dialog('{$exception->getMessage()}')")->close();
        } elseif ($request->expectsJson()) {
            return json(['code' => 1, 'message' => $exception->getMessage()]);
        } else {
            return $response;
        }
    }
}