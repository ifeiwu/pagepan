<?php

use utils\FS;
use utils\Log;
use Symfony\Component\Finder\Finder as Finder2;
use Symfony\Component\Filesystem\Filesystem;

class Finder extends Base
{
    private $base_path;

    private $source_path;

    private $cache_path;

    private $file_types = [
        'image' => '(.*)\.(png|apng|jpg|jpe|jpeg|gif|bmp|webp|avif|ico|svg|tiff|tif)$',
        'media' => '(.*)\.(mp3|mp4|ogg|webm|swf|wav)$',
        'json' => '(.*)\.(json)$',
    ];

    function __construct()
    {
        $this->base_path = 'data/file/';
        $this->source_path = WEB_ROOT . $this->base_path;
        $this->cache_path = CACHE_PATH . 'file/';
    }

    // 返回文件/目录列表
    protected function postList($request_data)
    {
        $type = $request_data['type'];
        $curdir = $request_data['curdir'];
        $query = $request_data['query'];

        $filesystem = new Filesystem();
        $finder_file = new Finder2();
        $finder_dir = new Finder2();

        if (!$query) {
            $finder_file->in($this->source_path . $curdir)->depth('== 0')->files();
            if ($type) {
                $finder_file->name('/' . $this->file_types[$type] . '/i');
            }
            $finder_dir->in($this->source_path . $curdir)->depth('== 0')->directories();
        } else {
            $finder_file->in($this->source_path . $curdir)->files();
            if ($type) {
                $finder_file->name('/' . $query . $this->file_types[$type] . '/i');
            } else {
                $finder_file->name('*' . $query . '*');
            }
            $finder_dir->in($this->source_path . $curdir)->directories()->name('*' . $query . '*');
        }

        $finder_file->sortByChangedTime()->reverseSorting();
        $finder_dir->sortByChangedTime()->reverseSorting();
        $files = $this->_getFiles($finder_file, $filesystem);
        $dirs = $this->_getDirs($finder_dir, $filesystem);

        return array_merge($dirs, $files);
    }

    // 返回所有目录
    private function _getDirs($finder, $filesystem)
    {
        if (!$finder->hasResults()) {
            return [];
        }

        $i = 0;
        $dirs = [];
        foreach ($finder as $file) {
            $path = $filesystem->makePathRelative($file->getPath(), $this->source_path);
            $dirs[$i]['path'] = $path != './' ? $path : '';
            $dirs[$i]['name'] = $file->getFilename();
            $dirs[$i]['ext'] = '';
            $dirs[$i]['size'] = 0;
            $dirs[$i]['type'] = $file->getType();
            $dirs[$i]['minetype'] = '';
            $dirs[$i]['mtime'] = $file->getMTime();
            $i++;
        }
        return $dirs;
    }

    // 返回所有文件
    private function _getFiles($finder, $filesystem)
    {
        if (!$finder->hasResults()) {
            return [];
        }

        $i = 0;
        $files = [];
        foreach ($finder as $file) {
            $real_path = $file->getRealPath();
            $name = $file->getFilename();
            $path = $filesystem->makePathRelative($file->getPath(), $this->source_path);
            $mime = mime_content_type($real_path);
            $ext = strtolower($file->getExtension());

            $files[$i]['path'] = $path != './' ? $path : '';
            $files[$i]['name'] = $name;
            $files[$i]['ext'] = $ext;
            $files[$i]['size'] = $file->getSize();
            $files[$i]['type'] = $file->getType();
            $files[$i]['mime'] = $mime;
            $files[$i]['mtime'] = $file->getMTime();

            if (strpos($mime, 'image/') !== false) {
                $imagesize = getimagesize($real_path);
                $files[$i]['width'] = $imagesize[0] ?: 0;
                $files[$i]['height'] = $imagesize[1] ?: 0;
            }
            $i++;
        }
        return $files;
    }


    // 创建文件夹
    protected function postMkdir($request_data)
    {
        $curdir = $request_data['curdir'];
        $newdir = trim($request_data['newdir']);

        if (!$newdir) {
            return $this->_error('无效的参数！');
        }

        $mdir = $this->source_path . ($curdir ? $curdir . '/' : '') . $newdir;
        if (is_dir($mdir)) {
            return $this->_error($newdir . ' 文件夹已存在！');
        }

        if (!mkdir($mdir, 0775, true)) {
            return $this->_error('创建文件夹失败！');
        }

        return $this->_success();
    }

    // 重命名文件/目录
    protected function postRename($request_data)
    {
        $curdir = $request_data['curdir'];
        $curdir = $curdir ? $curdir . '/' : '';
        $oldname = $request_data['oldname'];
        $newname = $request_data['newname'];

        if ($oldname && $newname) {
            $curpath = $this->source_path . $curdir;
            $curpath2 = $this->base_path . $curdir;
            $oldname2 = $curpath . $oldname;
            $newname2 = $curpath . $newname;

            if (file_exists($newname2)) {
                return $this->_error($newname . ' 文件在当前目录已存在！');
            }

            try {
                $filesystem = new Filesystem();
                $filesystem->rename($oldname2, $newname2);
            } catch (\Symfony\Component\Filesystem\Exception\IOException $e) {
                Log::error($e);
                return $this->_error('重命名失败！');
            }

            return $this->_success();
        } else {
            return $this->_error('无效名称！');
        }
    }

    // 文件是否存在
    protected function postCheckfile($request_data)
    {
        $name = $request_data['name'];
        if (file_exists($this->source_path . $name)) {
            return $this->_error($name . ' 文件已存在！');
        } else {
            return $this->_success($name . ' 文件不存在！');
        }
    }

    // 删除文件/目录
    protected function postDelete($request_data)
    {
        $paths = $request_data['paths'];
        $files = [];
        $data = ['failed' => []];
        foreach ($paths as $path) {
            $file = $this->source_path . $path;
            // 删除文件
            if (is_file($file)) {
                if (unlink($file)) {
                    $files[] = $file;
                } else {
                    $data['failed'][] = $path . '：删除失败！';
                }
            } // 删除目录
            else {
                if (!rmdir($file)) {
                    $data['failed'][] = $path . '：目录不是空的！';
                }
            }
        }

        return $this->_success('删除成功！', $data);
    }
}