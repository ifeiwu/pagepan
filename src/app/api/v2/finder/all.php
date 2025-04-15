<?php
require_once VEN_PATH . 'autoload.php';

use Symfony\Component\Finder\Finder as Finder;
use Symfony\Component\Filesystem\Filesystem;

const BASE_PATH = WEB_ROOT . 'data/file/';

// 返回文件/目录列表
return function ($request_data) {
    $type = $request_data['type'];
    $curdir = $request_data['curdir'];
    $query = $request_data['query'];
    $file_types = [
        'image' => '(.*)\.(png|apng|jpg|jpe|jpeg|gif|bmp|webp|avif|ico|svg|tiff|tif)$',
        'media' => '(.*)\.(mp3|mp4|ogg|webm|swf|wav)$',
        'json' => '(.*)\.(json)$',
    ];

    $filesystem = new Filesystem();
    $finder_file = new Finder();
    $finder_dir = new Finder();

    if (!$query) {
        $finder_file->in(BASE_PATH . $curdir)->depth('== 0')->files();
        if ($type) {
            $finder_file->name('/' . $file_types[$type] . '/i');
        }
        $finder_dir->in(BASE_PATH . $curdir)->depth('== 0')->directories();
    } else {
        $finder_file->in(BASE_PATH . $curdir)->files();
        if ($type) {
            $finder_file->name('/' . $query . $file_types[$type] . '/i');
        } else {
            $finder_file->name('*' . $query . '*');
        }
        $finder_dir->in(BASE_PATH . $curdir)->directories()->name('*' . $query . '*');
    }

    $finder_file->sortByChangedTime()->reverseSorting();
    $finder_dir->sortByChangedTime()->reverseSorting();
    $files = _getFiles($finder_file, $filesystem);
    $dirs = _getDirs($finder_dir, $filesystem);

    Response::json(array_merge($dirs, $files));
};

// 返回所有目录
function _getDirs($finder, $filesystem)
{
    if (!$finder->hasResults()) {
        return [];
    }

    $i = 0;
    $dirs = [];
    foreach ($finder as $file) {
        $path = $filesystem->makePathRelative($file->getPath(), BASE_PATH);
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
function _getFiles($finder, $filesystem)
{
    if (!$finder->hasResults()) {
        return [];
    }

    $i = 0;
    $files = [];
    foreach ($finder as $file) {
        $real_path = $file->getRealPath();
        $name = $file->getFilename();
        $path = $filesystem->makePathRelative($file->getPath(), BASE_PATH);
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