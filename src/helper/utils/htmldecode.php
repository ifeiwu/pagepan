<?php
// html 实体转换为字符
return function ($str) {
    return htmlspecialchars_decode($str, ENT_QUOTES);
};