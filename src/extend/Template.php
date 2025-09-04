<?php
// 简单的 HTML 模板双大括号 {{}} 替换数据
class Template
{
    /**
     * @param $html HTML模板
     * @param $data 替换的数据
     * @param $ifs 元素属性条件
     * @return string
     */
    public static function render($html, $data = [], $ifs = [])
    {
        // 实现条件显示元素
        // 元素属性条件[php-if]数组值：$ifs = ['value=1']
        // HTML示例：<div php-if="value=1"></div>
        if (!empty($ifs)) {
            // 把 {{ 和 }} 先换成不会触发 URI 编码的占位符
            $placeholders = ['{{' => '___LB___', '}}' => '___RB___'];
            $html = strtr($html, $placeholders);
            $html = '<?xml encoding="UTF-8"?>' . $html;
            $dom = new DOMDocument();
            libxml_use_internal_errors(true); // 忽略 HTML5 错误
            $dom->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
            libxml_clear_errors();
            $xpath = new DOMXPath($dom);
            $elements = $xpath->query('//*[@php-if]');
            if ($elements->length > 0) {
                foreach ($elements as $element) {
                    $value = $element->getAttribute('php-if');
                    if (in_array($value, $ifs)) {
                        $element->removeAttribute('php-if');
                    } else {
                        $element->parentNode->removeChild($element);
                    }
                }
            }
            $html = $dom->saveHTML();
            // 把占位符恢复成 {{ }}
            $html = strtr($html, array_flip($placeholders));
        }

        foreach ($data as $key => $value) {
            $html = str_replace('{{' . $key . '}}', $value, $html);
        }

        return $html;
    }
}