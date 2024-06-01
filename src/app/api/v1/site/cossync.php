<?php

namespace site;

use utils\FS;
use utils\Log;


class CosSync extends \Base
{

    private $config;

    private $client;

    private $adapter;

    private $flysystem;
    
    private $root_path;
    
    private $cdn_type;


    function __construct()
    {
        set_time_limit(0);

        parent::__construct();
        
        $this->cdn_type = db_get('site', 'value', array('name', '=', 'cdn_type'), null, 0);
        
        $this->config = db_get('site', 'value', array('name', '=', 'cdn_' . $this->cdn_type . '_config'), null, 0);

        $this->config = json_decode(base64_decode($this->config), true);
        
        if ( $this->cdn_type == 'cos' )
        {
            $this->root_path = $this->config['path'];
            
            $bucket = $this->config['bucket'];
            $appid = explode('-', $bucket)[1];

            $_config = [
                'region' => $this->config['region'],
                'credentials' => [
                    'appId' => $appid,
                    'secretId' => $this->config['secretid'],
                    'secretKey' => $this->config['secretkey'],
                ],
                'timeout' => 60,
                'connect_timeout' => 60,
                'bucket' => $bucket,
                'cdn' => '',
                'scheme'  => 'http',
                'read_from_cdn' => false,
                'cdn_key' => '',
                'encrypt' => false,
            ];
            
            $this->client = new \Qcloud\Cos\Client($_config);

            $this->adapter = new \Freyo\Flysystem\QcloudCOSv5\Adapter($this->client, $_config);
        }
        elseif ( $this->cdn_type == 'sftp' )
        {
            $this->root_path = '';
            
            $this->adapter = new \League\Flysystem\Sftp\SftpAdapter([
                'host' => $this->config['host'],
                'port' => $this->config['port'],
                'username' => $this->config['username'],
                'password' => html_entity_decode($this->config['password']),
                'root' => $this->config['path'],
                'timeout' => 10,
                'directoryPerm' => 0755
            ]);
        }
        
        $this->flysystem = new \League\Flysystem\Filesystem($this->adapter);
    }
    
    
    // 复制文件/目录
    protected function postCopy($request_data)
    {
        $files = $request_data['files'];
        $curdir = $request_data['curdir'];
        
        try
        {
            foreach ($files as $file)
            {
                $oldname = $this->root_path . $file;
                
                // 复制文件
                if ( $this->flysystem->has($oldname) )
                {
                    $pathinfo = pathinfo($file);
                    $newname = str_replace($pathinfo['dirname'], $curdir, $oldname);

                    $this->flysystem->copy($oldname, $newname);
                }
                // 复制目录
                else
                {
                    $files2 = $this->flysystem->listContents($oldname, true);
                    
                    foreach ($files2 as $file2)
                    {
                        $this->flysystem->copy($file2['path'], str_replace($file, $curdir, $file2['path']));
                    }
                }
            }
        }
        catch (\League\Flysystem\FileExistsException $e) {
            
            Log::error($e);
            
            return $this->_error($e->getMessage());
        }
        
        return $this->_success();
    }
    
    
    // 重命名文件/目录
    protected function postRename($request_data)
    {
        $oldname = $request_data['oldname'];
        $newname = $request_data['newname'];
        
        if ( is_file(WEB_ROOT . $newname) )
        {
            $oldname = $this->root_path . $oldname;
            $newname = $this->root_path . $newname;
            
            $this->flysystem->rename($oldname, $newname);
        }
        else
        {
            // 上传新目录
            $dirs = [
                ['path' => WEB_ROOT . $newname, 'recursive' => true]
            ];

            $this->postUploads(['dirs' => $dirs]);
            
            // 删除旧目录
            $this->deleteDir($this->root_path . $oldname);
        }
        
        return $this->_success();
    }

    
    // 单文件上传
    protected function postUpload($request_data)
    {
        $file = $request_data['file'];
        
        try {
            
            if ( $this->_upload($file) )
            {
                return $this->_success('上传文件成功！');
            }
            else
            {
                return $this->_error('上传文件失败！');
            }
            
        } catch (\Exception $e) {
            
            return $this->_error($e->getMessage());
        }
    }

    
    // 多文件上传
    protected function postUploads($request_data)
    {
        $files = $request_data['files'] ?: [];
        
        $uploaded = [];

        try {
            
            // 上传所有文件
            foreach ($files as $file)
            {
                if ( $this->_upload($file) )
                {
                    $uploaded[] = ['filename' => $file, 'status' => true];
                }
                else
                {
                    $uploaded[] = ['filename' => $file, 'status' => false];
                }
            }
            
        } catch (\Exception $e) {
            
            return $this->_error($e->getMessage());
        }

        return $this->_success(['uploaded' => $uploaded]);
    }

    
    // 上传文件
    private function _upload($file)
    {
        try {

            $key = $this->root_path . str_replace('../', '', $file);

            // 文件不在本地，删除远程文件
            if ( ! is_file($file) && $this->flysystem->has($key) )
            {
                $this->flysystem->delete($key);
            }
            // 本地文件不存在远程上传
            elseif ( is_file($file) && !$this->flysystem->has($key) )
            {
                $this->flysystem->writeStream($key, fopen($file, 'r'));
            }
            // 相同名称不同大小更新文件
            elseif ( $this->flysystem->has($key) && ($this->flysystem->getSize($key) != filesize($file)) )
            {
                $this->flysystem->updateStream($key, fopen($file, 'r'));
            }

        } catch (\Qcloud\Cos\Exception\ServiceResponseException $e) {

            throw new \Exception($e->getMessage());

        }

        return true;
    }

    
    // 获取目录所有文件
    protected function postFiles($request_data)
    {
        $files = [];

        // if ( ! $this->_isRootPathAcl())
        // {
        //     return $this->_error('访问路径 ' . $this->root_path . ' 没有访问权限！', $files);
        // }

        // 读取目录所有文件
        $dirs = $request_data['dirs'];

        foreach ($dirs as $dir)
        {
            FS::toFiles($dir['path'], $files, $dir['recursive']);
        }
        
        return $this->_success($files);
    }


    // 所有文件上传完成后，重置 json 文件
    protected function postResetSyncFiles($request_data)
    {
        $json_file = WEB_ROOT . 'data/json/sync-files.json';

        if ( FS::jsonp($json_file, []) )
        {
            return $this->_success();
        }
        else
        {
            return $this->_error();
        }
    }
    
    
    // 访问路径是否有访问权限
    protected function postPathAcl()
    {
        try {
            
            if ( ! $this->_isRootPathAcl() )
            {
                return $this->_error($this->root_path . ' 目录没有访问权限！');
            }
            
        } catch (\Exception $e) {
            
            return $this->_error($e->getMessage());
        }
        
    
        return $this->_success();
    }


    // 指定目录是否有访问权限
    private function _isRootPathAcl()
    {
        try {
            
            $this->client->getObjectAcl(array(
                'Bucket' => $this->adapter->getBucket(),
                'Key' => $this->root_path,
            ));

        } catch (\Qcloud\Cos\Exception\ServiceResponseException $e) {

            throw new \Exception($e->getMessage());
        }

        return true;
    }
    
    // 测试是否配置正确
    protected function postTest()
    {
        try {
            
            if ( ! $this->flysystem->listContents($this->root_path) )
            {
                return $this->_error($this->root_path . ' 无法访问目录！');
            }
            
        } catch (\Exception $e) {
            
            return $this->_error($e->getMessage());
        }
        
    
        return $this->_success();
    }
    
    
    // 删除目录下所有文件
    private function deleteDir($dir)
    {
        $files = $this->flysystem->listContents($dir, true);
        
        foreach ($files as $file)
        {
            $path = $file['path'];
         
            $this->flysystem->delete($path);
        }
        
        return true;
    }
}