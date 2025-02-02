<?php
// 检查是否有新的订单
return function () {
    helper('api/cors');

    if (FS::isDirEmpty(DATA_PATH . 'order/new')) {
        Response::success('', ['isnew' => false]);
    } else {
        Response::success('', ['isnew' => true]);
    }
};