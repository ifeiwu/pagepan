<?php
return function ($ip) {
    try {
        $searcher = XdbSearcher::newWithFileOnly(DATA_PATH . 'ip2region.xdb');
        $region = $searcher->search($ip);
        if ($region === null) {
            Log::ip2region("failed search({$ip})");
        }
        return explode('|', $region);
    } catch (Exception $e) {
        Log::ip2region($e->getMessage());
        return [];
    }
};