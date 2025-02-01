<?php
return function () {
    helper('api/cors');

    FS::toFiles();

    Response::success('您有新的订单，请注意查收。', ['sn'=>'dddd']);
};