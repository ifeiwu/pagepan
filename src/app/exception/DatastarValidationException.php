<?php

namespace app\exception;

use support\exception\BusinessException;
use Webman\Http\Request;
use Webman\Http\Response;

class DatastarValidationException extends BusinessException
{
    // 前端聚焦表单字段
    protected string $field = '';

    protected string $level = '';

    public function __construct(string $message = '', $level = 'warning', string $field = '')
    {
        parent::__construct($message, 0);

        $this->level = $level;
        $this->field = $field;
    }

    public function render(Request $request): Response
    {
        $script = "toast.{$this->level}('{$this->getMessage()}');";
        if ($this->field) {
            $script .= "document.querySelector('[name={$this->field}]').focus();";
        }

        datastar()->script($script)->signals(['isSubmit' => false])->close();
    }
}