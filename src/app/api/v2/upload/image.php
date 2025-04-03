<?php
use Gumlet\ImageResize;
use Gumlet\ImageResizeException;
use Verot\Upload\Upload;

use Sirius\Upload\Handler as UploadHandler;

return function ($request_data) {
    $_FILES['file']['name'] = $_POST['file_name'];
    $_FILES['file']['type'] = $_POST['file_type'];
    $_FILES['file']['size'] = $_POST['file_size'];
    $_FILES['file']['error'] = $_POST['file_error'];

    if (!empty($_FILES['file'])) {
        require_once VEN_PATH . 'autoload.php';
        $file_save_path = $_POST['file_save_path'];
        $upload_path = WEB_ROOT . $file_save_path;
        $uploadHandler = new UploadHandler($upload_path);
//        $uploadHandler->addRule('extension', ['allowed' => 'jpg', 'jpeg', 'png', 'webp', 'gif'], '{label} should be a valid image (jpg, jpeg, png)', 'Profile picture');
        $uploadHandler->addRule('size', ['size' => '20M'], '{label} 应小于 {size}', '图片');
//        $uploadHandler->addRule('imageratio', ['ratio' => 1], '{label} should be a square image', 'Profile picture');
        $uploadHandler->setOverwrite(true);
        $uploadHandler->setAutoconfirm(true);
        $result = $uploadHandler->process($_FILES['file']);
        if ($result->isValid()) {
            try {
                $file_name = $result->name;
                $file_path = $upload_path . '/' . $file_name;
                $info = getimagesize($file_path);
                $width = $info[0];
                $height = $info[1];
                $ext = pathinfo($file_path, PATHINFO_EXTENSION);
                // 压缩上传图片
                $caesium = $request_data['caesium'];
                $optimizer = new Optimizer($caesium['uri'], $caesium['key']);
                $optimizer->optimize($file_path);
                // 调整多种图片尺寸
                $prefixs = explode(',', $_POST['file_name_body_pre']);
                $widths = explode(',', $_POST['image_x']);
                $heights = explode(',', $_POST['image_y']);
                foreach ($prefixs as $key => $prefix) {
                    if ($ext == 'svg') { continue; }
                    $new_name = $upload_path . '/' . $prefix . $file_name;
                    $_width = $widths[$key];
                    $_height = $heights[$key];
                    $image = new ImageResize($file_path);
                    $image->quality_jpg = 100;
                    $image->quality_webp = 100;
                    $image->quality_png = 0;
                    $is_copy_file = true;
                    // 调整图片宽度
                    if ($_width) {
                        if ($width > $_width) {
                            $image->resizeToWidth($_width);
                            $is_copy_file = false;
                        }
                    }
                    // 调整图片高度
                    if ($_height) {
                        if ($height > $_height) {
                            $image->resizeToHeight($_height);
                            $is_copy_file = false;
                        }
                    }
                    // 可以调整图片大小
                    if ($is_copy_file == false) {
                        $image->save($new_name);
                    } else {
                        copy($file_name, $new_name);
                    }
                    // 压缩图片大小
                    $optimizer->optimize($new_name);
                }

                Response::success('上传成功', [
                    'path' => $file_save_path,
                    'image' => $result->name,
                    'size' => filesize($file_path),
                    'width' => $width,
                    'height' => $height,
                    'mime' => $info['mime'],
                    'ext' => $ext,
                ]);
            } catch (\Exception $e) {
                $result->clear();
                throw $e;
            }
        } else {
            $messages = $result->getMessages();
        }



        $handle = new Upload($_FILES['file']);
        $handle->image_interlace = true;
        if ($handle->uploaded) {
            $file_new_name_body = $_POST['file_new_name_body'];
            $file_overwrite = $_POST['file_overwrite'];
            $image_resize = $_POST['image_resize'];
            $file_save_path = $_POST['file_save_path'];
            $image_convert = $_POST['image_convert'];
            $jpeg_quality = explode(',', $_POST['jpeg_quality']);

            if ($image_convert) {
                $handle->image_convert = $image_convert;
            }
            if ($file_new_name_body) {
                $handle->file_new_name_body = $file_new_name_body;
            }

            $handle->png_compression = 9;
            $handle->jpeg_quality = 95;
            $handle->webp_quality = 95;
            $handle->file_overwrite = true;
            $handle->Process(WEB_ROOT . $file_save_path);
        }

        if ($handle->processed) {
            try {
                if ($file_save_path == '/') {
                    $file_save_path = '';
                }
                $file_name = WEB_ROOT . $file_save_path . '/' . $handle->file_dst_name;
                if ($image_resize == 1) {
                    $file_name_body_pre = explode(',', $_POST['file_name_body_pre']);
                    $image_x = explode(',', $_POST['image_x']);
                    $image_y = explode(',', $_POST['image_y']);

                    foreach ($file_name_body_pre as $key => $prefix) {
                        $file_new_name = WEB_ROOT . $file_save_path . '/' . $prefix . $handle->file_dst_name;
                        $width = $image_x[$key];
                        $height = $image_y[$key];
                        $quality = $jpeg_quality[$key];
                        $is_copy_file = true;
                        // 生成缩略图，排除 svg
                        if ($handle->file_dst_name_ext != 'svg') {
                            $image = new ImageResize($file_name);

                            if ($quality) {
                                $image->quality_jpg = $quality;
                            }

                            if ($width) {
                                if ($handle->image_src_x > $width) {
                                    $image->resizeToWidth($width);
                                    $is_copy_file = false;
                                }
                            }

                            if ($height) {
                                if ($handle->image_src_y > $height) {
                                    $image->resizeToHeight($height);
                                    $is_copy_file = false;
                                }
                            }
                        }

                        if ($is_copy_file == false) {
                            $image->save($file_new_name);
                        } else {
                            copy($file_name, $file_new_name);
                        }
                    }
                }
            } catch (ImageResizeException $e) {
                Response::error($e->getMessage());
            } catch (Throwable $e) {
                Response::error($e->getMessage());
            }

            Response::success('上传成功', [
                'path' => $file_save_path,
                'image' => $handle->file_dst_name,
                'size' => $handle->file_src_size,
                'width' => $handle->image_src_x,
                'height' => $handle->image_src_y,
                'type' => $handle->image_dst_type,
                'ext' => $handle->file_dst_name_ext,
            ]);
        } else {
            Response::error($handle->log);
        }
    } else {
        Response::error('无效的文件信息！');
    }
};