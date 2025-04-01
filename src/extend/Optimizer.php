<?php

class Optimizer
{
    public $is_curl_enabled = true;

    public $source;

    public $target;

    public $overwrite;

    public $mime;

    public $ext;

    public $qualitys = ['jpg' => 90, 'png' => 90, 'webp' => 100];

    public $allowed_mime_types = ['image/jpeg', 'image/png', 'image/webp'];

    public $allowed_file_exts = ['jpg', 'jpeg', 'png', 'webp'];

    public $api_uri = 'http://192.168.31.5:8000';
//    public $api_uri = 'http://api.resmush.it';

    public function __construct($api_uri = '')
    {
        if (!function_exists('curl_version')) {
            $this->is_curl_enabled = false;
        }

        if ($api_uri) {
            $this->api_uri = $api_uri;
        }
    }

    /**
     * 构建 CURL 文件上传请求数组
     */
    public function buildRequest()
    {
        if (!$this->is_curl_enabled) {
            return array(
                'multipart' => array(
                    array(
                        'name' => 'files',
                        'contents' => fopen($this->source, 'r'),
                        'filename' => pathinfo($this->source)['basename'],
                        'headers' => array('Content-Type' => $this->mime)
                    )
                )
            );
        } else {
            $info = pathinfo($this->source);
            $name = $info['basename'];
            $output = new \CURLFile($this->source, $this->mime, $name);
            return array(
                'files' => $output,
            );
        }
    }

    /**
     * 检查源文件是否为图像
     */
    public function isValidFile()
    {
        $this->mime = mime_content_type($this->source);
        if (!in_array($this->mime, $this->allowed_mime_types)) {
            return false;
        }
        return true;
    }

    /**
     * 检查文件扩展名是否有效
     * @return bool
     */
    public function isValidExtension()
    {
        $this->ext = pathinfo($this->source, PATHINFO_EXTENSION);
        if (!in_array(strtolower($this->ext), $this->allowed_file_exts)) {
            return false;
        }
        return true;
    }

    /**
     * 开始压缩图片
     * @param $source
     * @param $target
     * @param $quality
     * @param $overwrite
     * @return void
     * @throws Exception
     */
    public function optimize($source, $overwrite = false)
    {
        $this->source = $source;
        $this->target = $source;
        $this->overwrite = $overwrite;

        if ($overwrite == false) {
            $this->target = $this->getUniqueFilename($this->target);
        }

        if (!file_exists($this->source)) {
            throw new \Exception("源文件（{$this->source}）不存在。");
        }

        if (!$this->isValidFile()) {
            throw new \Exception("源文件（{$this->source}）不是有效的图像。");
        }

        if (!$this->isValidExtension()) {
            throw new \Exception("源文件（{$this->source}）不是有效的扩展名。");
        }

        $filesize = filesize($this->source);
        if ($filesize >= 5242880) {
            throw new \Exception("源文件（{$this->source}）超出了允许的最大限制，限制大小为 5MB。");
        }

        $quality = $this->qualitys[$this->ext];

        try {
            $data = $this->buildRequest($this->source);
            $api_url = $this->api_uri . '/compress?quality=' . $quality;

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $api_url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            $json = curl_exec($ch);
            if (curl_errno($ch)) {
                throw new \Exception(curl_error($ch));
            }
            curl_close($ch);

            $compress = json_decode($json, true);
            if (empty($compress)) {
                throw new \Exception("处理请求时出错：{$api_url}");
            }
            // 数组必需要 file 属性
            if (array_key_exists('file', $compress)) {
                // 压缩后的图片小于源文件才保存图片
                if ($compress['size'] < $filesize ) {
                    $this->saveFile("{$this->api_uri}/{$compress['file']}");
                } elseif ($overwrite == false) {
                    copy($this->source, $this->target);
                }
            } else {
                throw new \Exception($compress['message']);
            }
        } catch (\Exception $e) {
            $this->compressImage();
        }
    }

    /**
     * Use Guzzle HTTP client to interact with resmush.it api
     */
    /*public function useGuzzleHTTPClient()
    {
        try {
            $client = new \GuzzleHttp\Client(["base_uri" => $this->api_uri]);
            $data = $this->buildRequest($this->source);
            $response = $client->request('POST', "?quality=" . $this->quality, $data);
            if (200 == $response->getStatusCode()) {
                $response = $response->getBody();
                if (!empty($response)) {
                    $res = json_decode($response);
                    if (property_exists($res, 'file')) {
                        $this->saveFile("{$this->api_uri}.{$res->file}");
                    } else {
                        throw new \Exception("Response does not contain compressed file URL.");
                    }
                } else {
                    throw new \Exception("Error Processing Request.");
                }
            } else {
                throw new \Exception("Status code is not 200.");
            }
        } catch (\Exception $e) {
            $this->quality = 85;
            $this->compressImage();
        }
    }*/

    /**
     * 保存压缩后的图片
     * @param $res
     * @return void
     */
    public function saveFile($file)
    {
        $fp = fopen($this->target, 'wb');
        if (!$this->is_curl_enabled) {
            $client = new \GuzzleHttp\Client();
            $request = $client->get($file, ['sink' => $fp]);
        } else {
            $ch = curl_init($file);
            curl_setopt($ch, CURLOPT_FILE, $fp);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_exec($ch);
            curl_close($ch);
        }
        fclose($fp);
    }

    /**
     * 如果调用接口失败，使用本机函数优化图像。
     */
    public function compressImage()
    {
        switch ($this->mime) {
            case 'image/jpeg':
                $image = imagecreatefromjpeg($this->source);
                break;
            case 'image/png':
                $image = imagecreatefrompng($this->source);
                break;
            case 'image/webp':
                $image = imagecreatefromwebp($this->source);
            default:
                throw new \Exception('Unsupported image type.');
        }
        $quality = $this->qualitys[$this->ext];
        // 模拟压缩并获取压缩后的大小
        ob_start();
        if ($this->mime == 'image/jpeg') {
            imagejpeg($image, null, $quality);
        } elseif ($this->mime == 'image/png') {
            imagepng($image, null, round(9 - ($quality / 10))); // PNG 质量为 0（最好）到 9（最差）
        } elseif ($this->mime == 'image/webp') {
            imagewebp($image, null, $quality);
        }
        $compressed_image = ob_get_clean();
        $compressed_size = strlen($compressed_image);
        $original_size = filesize($this->source);// 获取原始文件大小
        // 比较大小，决定是否需要压缩后图片
        if ($compressed_size < $original_size) {
            file_put_contents($this->target, $compressed_image);
        } elseif ($overwrite == false) {
            copy($this->source, $this->target);
        }
    }

    /**
     * 在原有的文件路径生成唯一的文件名称
     * @param $file
     * @return string
     */
    public function getUniqueFilename($file)
    {
        $dir = pathinfo($file, PATHINFO_DIRNAME);
        $name = pathinfo($file, PATHINFO_BASENAME);
        $ext = pathinfo($file, PATHINFO_EXTENSION);
        $ext = $ext ? '.' . $ext : '';
        $number = '';
        while (file_exists("{$dir}/{$name}")) {
            $new_number = (int) $number + 1;
            if ('' == "{$number}{$ext}") {
                $name = "{$name}-{$new_number}";
            } else {
                $name = str_replace(array("-{$number}{$ext}", "{$number}{$ext}"), "-{$new_number}{$ext}", $name);
            }
            $number = $new_number;
        }
        return "{$dir}/{$name}";
    }
}