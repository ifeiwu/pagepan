<?php
// 简单的 HTML 模板双大括号 {{}} 替换数据
class Template
{
    /**
     * @param $html HTML模板
     * @param $data 替换的数据
     * @param $delete 删除的元素
     * @return string
     */
    public static function render($html, $data = [], $deletes = [])
    {
        foreach ($data as $key => $value) {
            $html = str_replace('{{' . $key . '}}', $value, $html);
        }

        // 要删除的元素属性[data-delete]数组值：$deletes = ['test']
        // HTML示例：<div data-delete="test"></div>
        if (!empty($deletes)) {
            $html = '<?xml encoding="UTF-8"?>' . $html;
            $dom = new DOMDocument();
            libxml_use_internal_errors(true); // 忽略 HTML5 错误
            $dom->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
            libxml_clear_errors();
            $xpath = new DOMXPath($dom);
            $elements = $xpath->query('//*[@data-delete]');
            if ($elements->length > 0) {
                foreach ($elements as $element) {
                    $value = $element->getAttribute('data-delete');
                    if (in_array($value, $deletes)) {
                        $element->parentNode->removeChild($element);
                    } else {
                        $element->removeAttribute('data-delete');
                    }
                }
            }
            $html = $dom->saveHTML($dom->documentElement);
        }

        return $html;
    }
}