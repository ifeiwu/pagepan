<?php
return function ($repo_path, $component_path, $data) {

    $file = storage_path("blocks/{$repo_path}/@components/{$component_path}.php");

    if (!is_file($file)) {
        throw new RuntimeException("Component file not found: {$file}");
    }

    ob_start();

    try {
        (static function ($file, $data) {
            extract($data, EXTR_OVERWRITE);
            include $file;
        })($file, $data);

        return ob_get_clean();
    } catch (Throwable $ex) {
        ob_end_clean();
        throw $ex;
    }
};