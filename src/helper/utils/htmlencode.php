<?php
// 字符转换为 html 实体
return function ($str) {
    return htmlspecialchars($str, ENT_QUOTES);
};