<?php

namespace app\admin\controller\forms;

use support\Request;

class DeleteImage
{
    public function index(Request $request)
    {
        $id = get('id');
        $path = get('path');
        $field_name = get('field_name');
        $dataset_id = get('dataset_id');

        $db = db();
        $dataset = $db->table('dataset')->where('id', $dataset_id)->first();
        if (!$dataset) {
            return json_error('无效数据集');
        }

        if (!$db->table($dataset->table)
            ->where('dataset_id', $dataset_id)
            ->where('id', $id)
            ->update([
                "$field_name" => '',
                'path' => ''
            ])) {
            return json_error('更新失败');
        }

        if ($path) {
            
        }

        return json_success('ok');
    }
}