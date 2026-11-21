<?php

namespace app\admin\controller\forms;

use support\Request;

class DeleteImage
{
    public function index(Request $request)
    {
        $id = get('id');
        $path = get('path');
        $value = get('value');
        $field_name = get('field_name');
        $dataset_id = get('dataset_id');

        $db = db();
        $dataset = $db->table('dataset')->where('id', $dataset_id)->first();
        if (!$dataset) {
            return json_error('无效数据集');
        }

        $table = $db->table($dataset->table)->where('dataset_id', $dataset_id)->where('id', $id);

        if ($table->doesntExist()) {
            return json_error('无效数据项');
        }

        $row = ["$field_name" => '', 'path' => ''];
        if (!$table->update($row)) {
            return json_error('更新失败');
        }

        if ($path) {
            if (!@unlink(public_path("{$path}/{$value}"))) {
                return json_error('删除文件失败');
            }
        }

        return json_success('ok');
    }
}