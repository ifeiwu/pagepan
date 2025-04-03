<?php
return function ($request_data) {
    $caesium = $request_data['caesium'];
    $images = $request_data['images'];
    foreach ($images as $image) {
        $source = WEB_ROOT . $image;
        (new Optimizer($caesium['uri'], $caesium['key']))->optimize($source);
    }
    Response::success('压缩图片');
};