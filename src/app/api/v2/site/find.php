<?php
return function ($request_data) {
    $db = db();
    $site = $db->find('site', '*', ['name', '=', $request_data['name']]);

    Response::success('查找站点【name】数据', $site);
};