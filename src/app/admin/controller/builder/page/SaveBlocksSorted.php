<?php

namespace app\admin\controller\builder\page;

use support\Request;
use support\Response;

class SaveBlocksSorted
{
    /**
     * 保存页面内容块的排序
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        $page_id = post('page_id', 'id');
        $sort_ids = post('sort_ids', 'array');

        $db = db();
        foreach ($sort_ids as $sort => $id) {
            if ($db->table('page_block')
                ->where('page_id', $page_id)
                ->where('id', $id)
                ->update(['sort' => $sort]) === 0) {
                return json_error('更新排序失败');
            }
        }

        return json_success('ok');
    }
}