<?php
// 批量删除文件。格式：[{"name":"touch-icon.png"}]
return function ($files) {
    $remove_files = [];

    if (!empty($files) && !is_array($files)) {
        $files = json_decode($files, true);
    }

    if (empty($files)) {
        return $remove_files;
    }

    foreach ($files as $key => $value) {
        $name = $value['name'];
        if (!$name) {
            continue;
        }

        $path = WEB_ROOT . $value['path'];
        $filename = $path . '/' . $name;
        if (file_exists($filename) && unlink($filename)) {
            $remove_files[] = $filename;
        }

        $prefix = $value['prefix'] ?: 's_,m_,l_,';
        if ($prefix) {
            $prefixs = explode(',', $prefix);
            foreach ($prefixs as $prefix) {
                $filename = "{$path}/{$prefix}{$name}";
                if (file_exists($filename) && unlink($filename)) {
                    $remove_files[] = $filename;
                }
            }
        }
    }

    return $remove_files;
};