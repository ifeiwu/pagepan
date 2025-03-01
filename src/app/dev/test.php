<?php
return function ($module, $action) {
//    $vikit = Vikit::new();
//dump($vikit);
//    $vikit->display("$module/$action");
    $view = view();
    $view->display('dev/test');
};