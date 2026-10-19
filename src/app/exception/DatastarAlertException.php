<?php

namespace app\exception;

use Webman\Http\Request;
use Webman\Http\Response;

class DatastarAlertException extends LoggingException
{
    // 前端聚焦表单字段
    protected string $field = '';

    public function __construct(string $message = '', $level = 'warning', array $data = [], string $field = '')
    {
        parent::__construct($message, $level, $data);

        $this->field = $field;
    }

    public function render(Request $request): Response
    {
        parent::render($request);

        $script = "dialog(`{$this->getMessage()}`);";
        if ($this->field) {
            $script .= "document.querySelector('[name={$this->field}]').focus();";
        }

        datastar()->script($script)->signals(['isSubmit' => false])->close();
    }
}