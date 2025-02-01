<?php
return function () {
    helper('api/cors');

    $count = FS::fileCount(DATA_PATH . 'order/new');
    if ($count != 0) {
        Response::success('', ['count' => $count]);
    } else {
        Response::success('', ['count' => 0]);
    }
};