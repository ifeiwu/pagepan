<?php
namespace utils;

use utils\Log;

class Webhook
{
    /**
     * 数据源 增加/更新/删除 事件通知
     * @param $event item.create,item.update,item.delete
     * @param $item_id item 数据表的 id
     * @return void
     */
    public static function dataSource($event, $item_id, $item = null)
    {
        if ( is_null($item) )
        {
            $item = db_get('item', '*', ['id', '=', $item_id]);
        }

        $webhook = db_get('page', 'content', [['id', '=', $item['page_id']], 'AND', ['dataset', '!=', '']], null, 0);

        if ( $webhook && preg_match('/^(https?:\/\/)/i', $webhook) )
        {
            self::send($event, $webhook, $item);
        }
    }


    public static function send($event, $webhook, $data = null)
    {
        $curl = new \Curl\Curl();
        $curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
        $curl->setOpt(CURLOPT_SSL_VERIFYHOST, false);
        $curl->setHeader('Content-Type', 'application/json');
        $curl->setTimeout(30);
        $curl->post($webhook, ['event' => $event, 'data' => $data]);

        $curl->close();

        if ( $curl->error )
        {
            Log::debug('Error: ' . $curl->errorMessage . "\n");
        }
        else
        {
//            Log::debug($curl->rawResponse);
        }
    }
}