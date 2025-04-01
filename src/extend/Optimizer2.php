<?php
/**
 * 调整图像大小和压缩图像。支持 JPEG、PNG 和 GIF。
 */
class Optimizer
{
    protected $quality = 90; // Default quality for compression (75 out of 100)

    public function __construct($quality = 90)
    {
        $this->quality = $quality;
    }

    /**
     * 通过压缩和调整大小来优化图像
     *
     * @param string $source Path to the source image
     * @param string $destination Path to save the optimized image
     * @param int|null $newWidth Optional new width for resizing (height will be calculated to keep aspect ratio)
     * @return bool True on success, False on failure
     */
    public function optimize($source, $destination, $newWidth = null)
    {
        // Get image info
        $info = getimagesize($source);
        $mime = $info['mime'];

        // 获取原始文件大小
        $originalSize = filesize($source);

        // Create image resource from source
        switch ($mime) {
            case 'image/jpeg':
                $image = imagecreatefromjpeg($source);
                break;
            case 'image/png':
                $image = imagecreatefrompng($source);
                break;
            case 'image/gif':
                $image = imagecreatefromgif($source);
                break;
            default:
                throw new \Exception('Unsupported image type.');
        }

        // Resize if new width is provided
        if ($newWidth !== null) {
            $image = $this->resize($image, $newWidth, $info[0], $info[1]);
        }

        // Save the image
        $result = $this->saveImage($image, $originalSize, $destination, $mime);

        // Free up memory
        imagedestroy($image);

        return $result;
    }

    /**
     * 在保持纵横比的同时将图像大小调整为新宽度
     *
     * @param resource $image
     * @param int $newWidth
     * @param int $oldWidth
     * @param int $oldHeight
     * @return resource
     */
    protected function resize($image, $newWidth, $oldWidth, $oldHeight)
    {
        $newHeight = ($newWidth / $oldWidth) * $oldHeight;
        $newImage = imagecreatetruecolor($newWidth, $newHeight);
        imagecopyresampled($newImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $oldWidth, $oldHeight);
        return $newImage;
    }

    /**
     * 将图像存储到压缩后的文件
     *
     * @param resource $image
     * @param string $destination
     * @param string $mime
     * @return bool
     */
    protected function saveImage($image, $originalSize, $destination, $mime)
    {
        // 模拟压缩并获取压缩后的大小
        ob_start();
        if ($mime == 'image/jpeg') {
            imagejpeg($image, null, $this->quality);
        } elseif ($mime == 'image/png') {
            // PNG 质量为 0（最好）到 9（最差）
            imagepng($image, null, 0);
        } elseif ($mime == 'image/gif') {
            magegif($image, null);
        }
        $compressedImage = ob_get_clean();
        $compressedSize = strlen($compressedImage);
        // 比较大小，决定是否需要压缩
        if ($compressedSize < $originalSize) {
            // 压缩后更小，保存压缩后的图片
            file_put_contents($destination, $compressedImage);
            return true;
        } else {
            // 图片不需要压缩，压缩后大小未减小。
            return false;
        }
    }
}
