<?php

namespace app\exception;

use Webman\Http\Request;
use Webman\Http\Response;

class DatastarToastException extends LoggingException
{
    // 前端聚焦表单字段
    protected string $field = '';

    public function __construct(string $message = '', string $level = 'warning', array $data = [], string $field = '')
    {
        parent::__construct($message, $level, $data);

        $this->field = $field;
    }

    public function render(Request $request): Response
    {
        parent::render($request);

        $script = "toast.{$this->level}('{$this->getMessage()}');";
        if ($this->field) {
            $script .= "document.querySelector('[name={$this->field}]').focus();";
        }

        datastar()->script($script)->signals(['isSubmit' => false])->close();
    }
}