<?php

namespace app\exception;

use support\exception\BusinessException;
use Webman\Http\Request;
use Webman\Http\Response;
use Webman\RedisQueue\Client;

class JsonErrorException extends LoggingException
{
    protected int $httpCode;

    public function __construct(string $message = '', int $httpCode = 200, $level = 'warning')
    {
        parent::__construct($message, $level);

        $this->httpCode = $httpCode;
        $this->message = $message;
    }

    public function render(Request $request): Response
    {
        return new Response($this->httpCode, ['Content-Type' => 'application/json'], json_encode(['code' => 1, 'message' => $this->message]));
    }
}