<?php

namespace app\admin\controller\forms;

use support\Request;

class Upload
{
    public function image(Request $request)
    {
        $file = $request->file('image');
        if ($file && !$file->isValid()) {
            return json_error('没有找到文件');
        }

        $id = post('id');
        $dataset_id = post('dataset_id');
        $field_name = post('field_name');
        $option = post('option');
        $image_name = $option['name'] ?? 'cover';
        $image_path = $option['path'] ?? '/files';


        $db = db();
        $dataset = $db->table('dataset')->where('id', $dataset_id)->first();
        if (!$dataset) {
            return json_error('无效数据集');
        }

        $table = $db->table($dataset->table)->where('dataset_id', $dataset_id)->where('id', $id);

        if ($table->doesntExist()) {
            return json_error('无效数据项');
        }

        $f = $file->move(public_path("{$image_path}/{$image_name}." . $file->getUploadExtension()));

        $image_name = $f->getFilename();
        $row = ["$field_name" => $image_name, 'path' => $image_path];
        if (!$table->update($row)) {
            return json_error('更新失败');
        }

        return json_success('ok', [
            'path' => $image_path,
            'name' => $image_name,
            'size' => $f->getSize(),
            'ext' => $f->getExtension(),
        ]);
    }
}