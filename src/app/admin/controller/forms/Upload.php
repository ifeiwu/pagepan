<?php

namespace app\admin\controller\forms;

use support\Request;

class Upload
{
    public function image(Request $request)
    {
        $file = $request->file('image');
        if ($file && !$file->isValid()) {
            return json(['code' => 1, 'msg' => 'file not found']);

        }

        $option = post('option');
        $image_name = $option['name'] ?? 'cover';
        $image_path = $option['path'] ?? '/files';

        $f = $file->move(public_path("{$image_path}/{$image_name}." . $file->getUploadExtension()));


        return json_success('ok', [
            'path' => $image_path,
            'name' => $f->getFilename(),
            'size' => $f->getSize(),
            'ext' => $f->getExtension(),
        ]);
    }
}