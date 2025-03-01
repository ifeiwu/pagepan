<?php
return function ($module, $action) {
    $view = view();
    define('SITE', helper('site/kv'));
    $view->layout('layout/frame');
    $view->display('dev/typography');
};