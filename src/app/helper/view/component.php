<?php
return function ($repo_path, $file_path, $data) {
    try {
        $file = storage_path('blocks/' . $repo_path . '/@components/' . $file_path . '.php');

        ob_start();

        (function () {
            extract(func_get_arg(1), EXTR_OVERWRITE);
            include func_get_arg(0);
        })($file, $data);

        echo ob_get_clean();
    } catch (Throwable $ex) {
        while (ob_get_level()) ob_end_clean();
        throw $ex;
    }
};