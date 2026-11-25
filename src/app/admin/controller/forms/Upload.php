<?php

namespace app\admin\controller\forms;

use support\Request;
use support\Response;

class Upload
{
    public function image(Request $request): Response
    {
        $upfile = $request->file('image');
        if ($upfile && !$upfile->isValid()) {
            return json_error('没有找到文件');
        }

        $item_id = post('item_id', 'int');
        $dataset_id = post('dataset_id', 'int');
        $field_name = post('field_name', 'text');
        $option = post('option', 'array', []);
        $option_name = $option['name'] ?? '';
        $image_name = $option_name ? "{$option_name}.{$upfile->getUploadExtension()}" : $upfile->getUploadName();
        $image_path = $option['path'] ?? '/files';

        $db = db();
        $dataset = $db->table('dataset')->where('id', $dataset_id)->first();
        if (!$dataset) {
            return json_error('无效数据集');
        }

        $table = $db->table($dataset->table)->where('dataset_id', $dataset_id)->where('id', $item_id);

        if ($table->doesntExist()) {
            return json_error('无效数据项');
        }

        $file = $upfile->move(public_path("{$image_path}/{$image_name}"));

        $image_name = $file->getFilename();
        $row = ["$field_name" => $image_name, 'path' => $image_path];
        if (!$table->update($row)) {
            return json_error('更新失败');
        }

        return json_success('ok', [
            'path' => $image_path,
            'name' => $image_name,
            'size' => $file->getSize(),
            'ext' => $file->getExtension(),
        ]);
    }

    public function delete(Request $request): Response
    {
        $id = get('id');
        $path = get('path');
        $image = get('image');
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

        $row = ["$field_name" => ''];
        if (!$table->update($row)) {
            return json_error('更新失败');
        }

        // 项目上传的图片只有文件名可以删除
        if ($image === basename($image)) {
            $file_path = public_path("{$path}/{$image}");
            if (file_exists($file_path) && !@unlink($file_path)) {
                return json_error('删除文件失败');
            }
        }

        return json_success('ok');
    }

    public function textEditorImage(Request $request): Response
    {
        $upfile = $request->file('image');
        if ($upfile && !$upfile->isValid()) {
            return response('404 not found', 404);
        }

        $item_id = post('item_id', 'int');
        $dataset_id = post('dataset_id', 'int');
        $image_name = $upfile->getUploadName();
        $image_path = "files/dataset/$dataset_id/$item_id/content";

        $file = $upfile->move(public_path("{$image_path}/{$image_name}"));

        return json(['location' => "/$image_path/{$file->getFilename()}"]);
    }
}