<?php
return function ($ip) {
    $client = new GuzzleHttp\Client();
    $response = $client->request('GET', 'https://api.nsmao.net/api/qq/query', [
        'query' => [
            'key' => 'zGnIdKHInDw6VdGUrEJX0Iozol',
            'ip' => $ip
        ],
        'verify' => false
    ]);

    $content = $response->getBody()->getContents();
    $res = json_decode($content, true);
    if ($res['code'] == 200) {
        $data = $res['data'];
    } else {
        $data = [];
    }

    return $data;
};