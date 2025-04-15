<?php
/**
 * Image Optimize Api或本地压缩图片。支持JPEG、PNG、WebP、AVIF、GIF和SVG等。
 */
class Optimizer
{
    public $source;

    public $target;

    public $overwrite;

    public $file_mime;

    public $file_ext;

    public $qualitys = ['jpg' => 90, 'png' => 100, 'webp' => 100, 'avif' => 100];

    public $allowed_mime_types = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'image/svg+xml'];

    public $allowed_file_exts = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'svg'];

    public $api_uri;

    public $api_key;

    public function __construct($api_uri = '', $api_key = '')
    {
        if ($api_uri) {
            $this->api_uri = rtrim($api_uri, '/');
            $this->api_key = $api_key;
        }
    }

    /**
     * 设置图片压缩质量
     * @param $jpg_quality
     * @param $png_quality
     * @param $webp_quality
     * @return void
     */
    public function setQualitys($jpg_quality, $png_quality, $webp_quality, $avif_quality)
    {
        $this->qualitys['jpg'] = $jpg_quality;
        $this->qualitys['png'] = $png_quality;
        $this->qualitys['webp'] = $webp_quality;
        $this->qualitys['avif'] = $avif_quality;
    }

    /**
     * 构建 CURL 文件上传请求数组
     */
    public function buildRequest()
    {
        $file_name = pathinfo($this->source, PATHINFO_BASENAME);
        $curl_file = new \CURLFile($this->source, $this->file_mime, $file_name);
        return [
            'files' => $curl_file
        ];
    }

    /**
     * 检查源文件是否为图像
     */
    public function isValidFile()
    {
        $this->file_mime = mime_content_type($this->source);
        if (!in_array($this->file_mime, $this->allowed_mime_types)) {
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
        $this->file_ext = pathinfo($this->source, PATHINFO_EXTENSION);
        if (!in_array(strtolower($this->file_ext), $this->allowed_file_exts)) {
            return false;
        }
        return true;
    }

    /**
     * 开始压缩图片
     * @param $source
     * @param $overwrite
     * @return void
     * @throws Exception
     */
    public function optimize($source, $overwrite = true)
    {
        $this->source = $source;
        $this->target = $source;
        $this->overwrite = $overwrite;

        // 不是覆盖源文件，生成唯一的文件名称
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

        $file_size = filesize($this->source);
        if ($file_size >= 20971520) {
            throw new \Exception("源文件（{$this->source}）超出了允许的最大限制，限制大小为 20MB。");
        }

        $quality = $this->qualitys[$this->file_ext];
        if ($this->api_uri) {
            $api_url = $this->api_uri . ':8181/?quality=' . $quality;
        } else {
            $this->compressImage();
        }

        try {
            $post_data = $this->buildRequest($this->source);

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $api_url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Authorization: Bearer ' . $this->api_key
            ]);

            $content = curl_exec($ch);
            $info = curl_getinfo($ch);
            if ($info['http_code'] != 200) {
                throw new \Exception("HTTP Error: {$info['http_code']}");
            } elseif (curl_errno($ch) != 0) {
                throw new \Exception(curl_error($ch));
            }
            curl_close($ch);
            // 返回数据格式是否正确
            $compress = json_decode($content, true);
            if (empty($compress)) {
                throw new \Exception("处理请求时出错：{$api_url}");
            }
            // 数组必需要有 file 属性
            if (array_key_exists('file', $compress)) {
                // 只有当压缩后的图片小于原图片时，才会保存压缩图片。
                if ($compress['size'] < $file_size) {
                    $this->saveImage("{$this->api_uri}:8182/image.php?filename={$compress['file']}");
                }
                // 如果压缩后的图片大小未减小，且不覆盖原图，则会生成一个与原图一致的新图片。
                elseif ($overwrite == false) {
                    copy($this->source, $this->target);
                }
            } else {
                throw new \Exception($compress['message']);
            }
        } catch (\Exception $e) {
//            $this->compressImage();
        }
    }

    /**
     * 保存压缩后的图片
     * @param $res
     * @return void
     */
    public function saveImage($file)
    {
        $fp = fopen($this->target, 'wb');

        $ch = curl_init($file);
        curl_setopt($ch, CURLOPT_FILE, $fp);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_exec($ch);
        curl_close($ch);

        fclose($fp);
    }

    /**
     * 如果调用接口失败，使用本机函数优化图像。
     */
    public function compressImage()
    {
        $quality = $this->qualitys[$this->file_ext];
        $source_size = filesize($this->source);
        switch ($this->file_mime) {
            case 'image/jpeg':
                $source_image = imagecreatefromjpeg($this->source);
                break;
            case 'image/png':
                $source_image = imagecreatefrompng($this->source);
                break;
            case 'image/webp':
                $source_image = imagecreatefromwebp($this->source);
                break;
            case 'image/avif':
                $source_image = imagecreatefromavif($this->source);
                break;
            case 'image/gif':
                $source_image = imagecreatefromgif($this->source);
                break;
            case 'image/svg+xml':
                $source_image = file_get_contents($this->source);
                $source_image = preg_replace('/<!--.*?-->/s', '', $source_image); // 去除注释
                $source_image = preg_replace('/\s+/', ' ', $source_image); // 去除多余的空格和换行符
                break;
            default:
                $source_image = file_get_contents($this->source);
        }
        // 模拟压缩并获取压缩后的大小
        ob_start();
        if ($this->file_mime == 'image/jpeg') {
            imagejpeg($source_image, null, $quality);
        } elseif ($this->file_mime == 'image/png') {
            imagealphablending($source_image, false); // 关闭混合模式
            imagesavealpha($source_image, true); // 保留透明度
            imagepng($source_image, null, round(10 - ($quality / 10))); // PNG 质量为 0（最好）到 9（最差）
        } elseif ($this->file_mime == 'image/webp') {
            imagewebp($source_image, null, $quality);
        } elseif ($this->file_mime == 'image/avif') {
            imageavif($source_image, null, $quality);
        } elseif ($this->file_mime == 'image/gif') {
            imagegif($source_image, null);
        } else {
            echo $source_image;
        }
        $compressed_image = ob_get_clean();
        $compressed_size = strlen($compressed_image);
        // 比较大小，决定是否需要压缩后图片
        if ($compressed_size < $source_size) {
            file_put_contents($this->target, $compressed_image);
        } elseif ($overwrite == false) {
            copy($this->source, $this->target);
        }
        // 不是SVG图片
        if ($source_image instanceof GdImage) {
            imagedestroy($source_image);
        }
    }

    /**
     * 生成唯一的文件名称
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
            $new_number = (int)$number + 1;
            if ('' == "{$number}{$ext}") {
                $name = "{$name}-{$new_number}";
            } else {
                $name = str_replace(["-{$number}{$ext}", "{$number}{$ext}"], "-{$new_number}{$ext}", $name);
            }
            $number = $new_number;
        }
        return "{$dir}/{$name}";
    }
}