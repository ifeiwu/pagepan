<?php
return function ($request_data) {
    // 保存文件块
    if (Request::isPost()) {
        $save_path = rtrim(WEB_ROOT . $_POST['save_path'], '/');
        $resumableFilename = $_POST['resumableFilename'];
        $resumableChunkNumber = $_POST['resumableChunkNumber'];
        $resumableIdentifier = $_POST['resumableIdentifier'];

        $file = $_FILES['file'];
        if ($file['error'] != 0) {
            debug('error ' . $file['error'] . ' in file ' . $resumableFilename);
        }

        $temp_dir = $save_path . '/' . $resumableIdentifier;
        $dest_file = $temp_dir . '/' . $resumableFilename . '.part' . $resumableChunkNumber;
        if (!is_dir($temp_dir)) {
            mkdir($temp_dir, 0755, true);
        }

        if (!move_uploaded_file($file['tmp_name'], $dest_file)) {
            debug('Error saving (move_uploaded_file) chunk ' . $resumableChunkNumber . ' for file ' . $resumableFilename);
        } else {
            _createFileFromChunks($save_path, $temp_dir, $resumableFilename, $_POST['resumableChunkSize'], $_POST['resumableTotalSize']);
        }
    }
    // 检查文件块是否存在
    else {
        $save_path = rtrim(WEB_ROOT . $_GET['save_path'], '/');
        $resumableFilename = $_GET['resumableFilename'];
        $resumableChunkNumber = $_GET['resumableChunkNumber'];
        $resumableIdentifier = $_GET['resumableIdentifier'];

        $temp_dir = $save_path . '/' . $resumableIdentifier;
        $chunk_file = $temp_dir . '/' . $resumableFilename . '.part' . $resumableChunkNumber;

        if (file_exists($chunk_file)) {
            echo 202;
        } else {
            echo 404;
        }
    }
};

// 检查所有的文件块是否存在，并创建最终的目标文件
function _createFileFromChunks($save_path, $temp_dir, $fileName, $chunkSize, $totalSize)
{
    $total_files = 0;
    foreach (scandir($temp_dir) as $file) {
        if (stripos($file, $fileName) !== false) {
            $total_files++;
        }
    }

    if ($total_files * $chunkSize >= ($totalSize - $chunkSize + 1)) {
        if (($fp = fopen($save_path . '/' . $fileName, 'w')) !== false) {
            for ($i = 1; $i <= $total_files; $i++) {
                fwrite($fp, file_get_contents($temp_dir . '/' . $fileName . '.part' . $i));
            }
            fclose($fp);
        } else {
            debug('Cannot create the destination file');
            return false;
        }

        if (rename($temp_dir, $temp_dir . '_UNUSED')) {
            _rrmdir($temp_dir . '_UNUSED');
        } else {
            _rrmdir($temp_dir);
        }
    }
}


// 重命名临时目录（避免其他并发块上传访问）
function _rrmdir($dir)
{
    if (is_dir($dir)) {
        $objects = scandir($dir);
        foreach ($objects as $object) {
            if ($object != '.' && $object != '..') {
                if (filetype($dir . '/' . $object) == 'dir') {
                    _rrmdir($dir . '/' . $object);
                } else {
                    unlink($dir . '/' . $object);
                }
            }
        }
        reset($objects);
        rmdir($dir);
    }
}