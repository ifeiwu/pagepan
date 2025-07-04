<?php
return function () {
    $db = db();
    $site = [];
    $data = $db->select('site');
    foreach ($data as $d) {
        $site[$d['name']] = $d['value'];
    }

    Response::success($site);
};