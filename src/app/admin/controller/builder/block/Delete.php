<?php

namespace app\admin\controller\builder\block;

use support\Request;
use support\Response;

class Delete
{
    public function index(Request $request): Response
    {
        $block_id = get('block_id');

        try {
            $db = db();
            $db->transaction(function () use ($db, $block_id) {

                if (!$db->table('page_block')->delete($block_id)) {
                    throw new \RuntimeException('删除内容块失败');
                }

                // 这里要添加历史记录
            });

            return json_success('ok');
        } catch (\Throwable $ex) {
            return json_error($ex->getMessage());
        }
    }
}