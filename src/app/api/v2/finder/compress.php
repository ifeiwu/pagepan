<?php
return function ($request_data) {
    $optimizer = new Optimizer($request_data['optimizeapi_uri'], $request_data['optimizeapi_key']);

    $images = $request_data['images'];
    foreach ($images as $image) {
        $optimizer->optimize(WEB_ROOT . $image);
    }

    Response::success('压缩图片');
};