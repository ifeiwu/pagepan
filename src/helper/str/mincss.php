<?php
// CSS 压缩
return function ($css) {
    // Remove unnecessary whitespace.
    $css = preg_replace('#\s+#', ' ', $css);
    $css = preg_replace('#\s*{\s*#', '{', $css);
    $css = preg_replace('#;?\s*}\s*#', '}', $css);
    $css = preg_replace('#\s*;\s*#', ';', $css);
    // Minimize hex colors.
    $css = preg_replace('/([^=])#([a-f\\d])\\2([a-f\\d])\\3([a-f\\d])\\4([\\s;\\}])/i', '$1#$2$3$4$5', $css);
    // Convert 0px to 0.
    $css = preg_replace('#([^0-9])0px#', '${1}0', $css);
    // Remove comments.
    $css = preg_replace('/\/\*.*?\*\//', '', $css);

    return trim($css);
};