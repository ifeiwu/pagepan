<?php
return function ($request_data) {
    $images = $request_data['images'];
    foreach ($images as $image) {
        $source = WEB_ROOT . $image;
        (new Optimizer())->optimize($source, $source);
    }
    Response::success('压缩原图');
};