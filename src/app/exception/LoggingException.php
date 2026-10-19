<?php

namespace app\exception;

use support\exception\BusinessException;
use Webman\Http\Request;
use Webman\Http\Response;
use Webman\RedisQueue\Client;

class LoggingException extends BusinessException
{
    protected string $level;

    public function __construct(string $message = '', string $level = 'warning', array $data = [])
    {
        parent::__construct($message, 0);

        $this->data($data);
        $this->level = $level;
    }

    public function render(Request $request): Response
    {
        $message = $this->getMessage();

        $this->data['user'] = session('user.name') ?? '未登录';
        $this->data['exception']['file'] = '# ' . $this->getFile();
        $this->data['exception']['line'] = $this->getLine();
        $this->data['exception']['code'] = $this->getCode();

        return new Response(200, [], $message);
    }
}