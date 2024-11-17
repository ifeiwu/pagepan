<?php
return function () {
    $db = db();
    $db->debug = false;

    $site = [];
    $data = $db->select('site');

    foreach ($data as $d) {
        $site[$d['name']] = $d['value'];
    }

    Response::success($site);
};