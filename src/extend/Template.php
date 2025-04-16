<?php
// 简单的 HTML 模板双大括号 {{}} 替换数据
class Template
{
    public static function render($content, $data = [])
    {
        foreach ($data as $key => $value) {
            $content = str_replace('{{' . $key . '}}', $value, $content);
        }

        return $content;
    }
}