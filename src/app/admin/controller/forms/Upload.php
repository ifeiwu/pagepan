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

        $option = post('option', 'array', []);
        $option_name = $option['name'] ?? '';
        $image_name = $option_name ? "{$option_name}.{$upfile->getUploadExtension()}" : $upfile->getUploadName();
        $image_path = $option['path'] ?? '/files';

        $file = $upfile->move(public_path("{$image_path}/{$image_name}"));

        return json_success('ok', [
            'url' => "$image_path/$image_name",
            'path' => $image_path,
            'name' => $image_name,
        ]);
    }

    public function delete(Request $request): Response
    {
        $path = get('path');
        $image = get('image');

        // 上传的图片只有文件名可以删除
        if ($image && $image === basename($image)) {
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