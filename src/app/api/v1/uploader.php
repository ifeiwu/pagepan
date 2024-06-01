<?php

use utils\Log;

use Gumlet\ImageResize;
use Gumlet\ImageResizeException;
use Verot\Upload\Upload;

class Uploader extends Base {

    private $upload_root;

    function __construct()
    {
        $this->upload_root = WEB_ROOT;
    }

    // 上传图片
    protected function postImage($request_data)
    {
        $_FILES['file']['name'] = $_POST['file_name'];
        $_FILES['file']['type'] = $_POST['file_type'];
        $_FILES['file']['size'] = $_POST['file_size'];
        $_FILES['file']['error'] = $_POST['file_error'];

        if ( ! empty($_FILES['file']) )
        {
            $sync_files = [];
			
            $handle = new Upload($_FILES['file']);
			
            $handle->image_interlace = true;

            if ( $handle->uploaded )
            {
                $file_new_name_body = $_POST['file_new_name_body'];
                $file_overwrite = $_POST['file_overwrite'];
                $image_resize = $_POST['image_resize'];
                $file_save_path = $_POST['file_save_path'];
                $image_convert = $_POST['image_convert'];
                $jpeg_quality = explode(',', $_POST['jpeg_quality']);

                if ( $image_convert ) {
                    $handle->image_convert = $image_convert;
                }
                
                if ( $file_new_name_body ) {
                    $handle->file_new_name_body = $file_new_name_body;
                }
                
                $handle->png_compression = 9;
                $handle->jpeg_quality = 100;
                $handle->webp_quality = 100;
                $handle->file_overwrite = true;
                
                $handle->Process($this->upload_root . $file_save_path);
            }

            if ( $handle->processed )
            {
                try {
                    if ( $file_save_path == '/' ) {
                        $file_save_path = '';
                    }

                    $file_name = $this->upload_root . $file_save_path . '/' . $handle->file_dst_name;

                    $sync_files[] = $file_name;
                    
                    if ( $image_resize == 1 )
                    {
                        $file_name_body_pre = explode(',', $_POST['file_name_body_pre']);
                        $image_x = explode(',', $_POST['image_x']);
                        $image_y = explode(',', $_POST['image_y']);

                        foreach ($file_name_body_pre as $key => $prefix)
                        {
                            $file_new_name = $this->upload_root . $file_save_path . '/' . $prefix . $handle->file_dst_name;
                            $width = $image_x[$key];
                            $height = $image_y[$key];
                            $quality = $jpeg_quality[$key];
                            $is_copy_file = true;

                            $sync_files[] = $file_new_name;
                            
                            // 生成缩略图，排除 svg
                            if ( $handle->file_dst_name_ext != 'svg' )
                            {
                                $image = new ImageResize($file_name);
         
                                if ( $quality ){
                                    $image->quality_jpg = $quality;
                                }
                 
                                if ( $width )
                                {
                                    if ( $handle->image_src_x > $width )
                                    {
                                        $image->resizeToWidth($width);
                                        
                                        $is_copy_file = false;
                                    }
                                }
                                
                                if ( $height )
                                {
                                    if ( $handle->image_src_y > $height )
                                    {
                                        $image->resizeToHeight($height);
                                        
                                        $is_copy_file = false;
                                    }
                                }
                            }
                            
                            if ( $is_copy_file == false ) {
                                $image->save($file_new_name);
                            } else {
                                copy($file_name, $file_new_name);
                            }
                        }
                    }
                } catch (ImageResizeException $e) {
                    return $this->_error($e->getMessage());
                } catch (Throwable $e) {
                    return $this->_error($e->getMessage());
                }

                $this->_add_sync_files($sync_files);

                return $this->_success('', [
                    'path' => $file_save_path,
                    'image' => $handle->file_dst_name,
                    'size' => $handle->file_src_size,
                    'width' => $handle->image_src_x,
                    'height' => $handle->image_src_y,
                    'type' => $handle->image_dst_type,
                    'ext' => $handle->file_dst_name_ext,
                ]);
            } else {
                return $this->_error($handle->log);
            }
        } else {
            return $this->_error('无效的文件信息！');
        }
    }


    // 上传文件
    protected function postFile($request_data)
    {
        $save_path = $this->upload_root . $_POST['save_path'];

        $resumableFilename = $_POST['resumableFilename'];
        $resumableChunkNumber = $_POST['resumableChunkNumber'];
        $resumableIdentifier = $_POST['resumableIdentifier'];

        $_FILES['file']['name'] = $_POST['file_name'];
        $_FILES['file']['type'] = $_POST['file_type'];
        $_FILES['file']['size'] = $_POST['file_size'];
        $_FILES['file']['error'] = $_POST['file_error'];

        $file = $_FILES['file'];

        if ( $file['error'] != 0 ) {
            Log::error('error ' . $file['error'] . ' in file ' . $resumableFilename);
        }

        $temp_dir = $save_path . '/' . $resumableIdentifier;
        $dest_file = $temp_dir . '/' . $resumableFilename . '.part' . $resumableChunkNumber;

        if ( ! is_dir($temp_dir) ) {
            mkdir($temp_dir, 0755, true);
        }

        if ( ! move_uploaded_file($file['tmp_name'], $dest_file) ) {
            Log::error('Error saving (move_uploaded_file) chunk ' . $resumableChunkNumber . ' for file ' . $resumableFilename);
        } else {
            $this->_createFileFromChunks($save_path, $temp_dir, $resumableFilename, $_POST['resumableChunkSize'], $_POST['resumableTotalSize']);
        }
    }


    // 检查文件块是否存在
    protected function getFile()
    {
        $save_path = $this->upload_root . $_GET['save_path'];

        $resumableFilename = $_GET['resumableFilename'];
        $resumableChunkNumber = $_GET['resumableChunkNumber'];
        $resumableIdentifier = $_GET['resumableIdentifier'];

        $temp_dir = $save_path . '/' . $resumableIdentifier;
        $chunk_file = $temp_dir . '/' . $resumableFilename . '.part' . $resumableChunkNumber;

        if ( file_exists($chunk_file) ) {
            return 202;
        } else {
            return 404;
        }
    }


    // 检查所有的文件块是否存在,并创建最终的目标文件
    private function _createFileFromChunks($save_path, $temp_dir, $fileName, $chunkSize, $totalSize)
    {
        $total_files = 0;
        
        foreach (scandir($temp_dir) as $file)
        {
            if (stripos($file, $fileName) !== false)
            {
                $total_files++;
            }
        }

        if ( $total_files * $chunkSize >= ($totalSize - $chunkSize + 1) )
        {

            if ( ($fp = fopen($save_path . '/' . $fileName, 'w')) !== false )
            {
                for ($i = 1; $i <= $total_files; $i++)
                {
                    fwrite($fp, file_get_contents($temp_dir . '/' . $fileName . '.part' . $i));
                }
                
                fclose($fp);
            }
            else
            {
                Log::error('Cannot create the destination file');
                
                return false;
            }

            if ( rename($temp_dir, $temp_dir . '_UNUSED') )
            {
                $this->_rrmdir($temp_dir . '_UNUSED');
            }
            else
            {
                $this->_rrmdir($temp_dir);
            }
        }
    }


    // 重命名临时目录(避免其他并发块上传访问)
    private function _rrmdir($dir)
    {
        if ( is_dir($dir) )
        {
            $objects = scandir($dir);
            
            foreach ($objects as $object)
            {
                if ($object != '.' && $object != '..')
                {
                    if (filetype($dir . '/' . $object) == 'dir')
                    {
                        $this->_rrmdir($dir . '/' . $object);
                    }
                    else
                    {
                        unlink($dir . '/' . $object);
                    }
                }
            }
            
            reset($objects);
            
            rmdir($dir);
        }
    }

}
