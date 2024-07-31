<?php
use utils\FS;
use utils\Log;

class Fonts extends Base {

    private $webfont;

    private $font_path;

    function __construct()
    {
        $this->font_path = WEB_ROOT . 'data/font';
    }

    // 生成网页字体
    protected function postBuild($request_data)
    {
        $this->webfont = $request_data['webfont'];
        $fontid = $request_data['fontid'];
        $this->font_path .= "/$fontid";

        FS::rmkdir($this->font_path);

        $content = $request_data['content'];
        $filelist = $this->buildWebFonts($fontid, $content);
        if (count($filelist) > 0) {
            if ($this->downloadFiles($filelist, 'remove')) {
                if (file_put_contents($this->font_path . '/content.txt', $content)) {
                    return $this->_success();
                } else {
                    return $this->_error('保存字符失败！');
                }
            } else {
                return $this->_error('下载网页字体失败！');
            }
        } else {
            return $this->_error('生成网页字体失败！');
        }
    }

    // 下载已经生成好的网页字本
    protected function postDownload($request_data)
    {
        $this->webfont = $request_data['webfont'];
        $fontid = $request_data['fontid'];
        $number = $request_data['number'];
        $lang = $request_data['lang'];
        $this->font_path .= "/$fontid";

        FS::rmkdir($this->font_path);

        $filelist = $this->getCSSFiles($fontid, $number, $lang);
        if (count($filelist) > 0) {
            if ($this->downloadFiles($filelist)) {
                file_put_contents($this->font_path . '/content.txt', '{"number":"' . $number . ($lang ? '_' . $lang : $lang) . '"}');
                return $this->_success();
            } else {
                return $this->_error('下载网页字体失败！');
            }
        } else {
            return $this->_error('没有找到网页字体！');
        }
    }

    // 删除网页字体
    protected function getRemove($fontid)
    {
        $dirname = $this->font_path . "/$fontid";
        if (is_dir($dirname)) {
            if (!FS::rrmdir($dirname)) {
                return $this->_error('删除网页字体失败！');
            }
        }
        return $this->_success();
    }

    // 获取保存的文字内容
    protected function getContent($fontid)
    {
        $filename = $this->font_path . "/$fontid/content.txt";
        if (is_file($filename)) {
            $content = file_get_contents($filename);
            return $this->_success('', $content);
        } else {
            return $this->_error('没有找到文字内容！');
        }
    }

    // 生成网页字体文件woff2，并返回字重列表
    private function buildWebFonts($fontid, $content)
    {
        $curl = new \Curl\Curl();
        $curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
        $curl->setOpt(CURLOPT_SSL_VERIFYHOST, false);
        $curl->setHeader('Content-Type', 'application/json');
        $curl->setTimeout(300);
        $curl->post($this->webfont['base_url'] . 'build/', [
            'fontid' => $fontid,
            'content' => $content,
        ]);

        $curl->close();

        if ($curl->error) {
            debug('Error: ' . $curl->errorMessage . "\n");
            return [];
        } else {
            return json_decode($curl->rawResponse, true);
        }
    }

    // 生成字体css文件
    /*private function buildCssFonts($filelist)
    {
        $csscode = '';

        foreach ($filelist as $file)
        {
            $filename = basename($file, '.woff2');
            $weight = strtolower(explode('-', $filename)[1]);

            $font_weight = '400';

            switch ($weight)
            {
                case 'heavy': $font_weight = '900'; break;
                case 'black': $font_weight = '900'; break;
                case 'extrabold': $font_weight = '800'; break;
                case 'bold': $font_weight = '700'; break;
                case 'semibold': $font_weight = '600'; break;
                case 'demibold': $font_weight = '600'; break;
                case 'medium': $font_weight = '500'; break;
                case 'light': $font_weight = '300'; break;
                case 'extralight': $font_weight = '200'; break;
                case 'thin': $font_weight = '100'; break;
            }

            $time = time();

            $csscode .= "@font-face{font-family:'$this->dirname';src:url('$filename.woff2?$time') format('woff2');font-weight:$font_weight;font-style:normal;font-display:swap;}";
        }

        if ( file_put_contents("$this->font_path/$this->dirname.css", $csscode) )
        {
            return true;
        }
        else
        {
            return false;
        }
    }*/

    // 获取已经生成的css和woff2文件
    private function getCSSFiles($fontid, $number, $lang = null)
    {
        $curl = new \Curl\Curl();
        $curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
        $curl->setOpt(CURLOPT_SSL_VERIFYHOST, false);
        $curl->setTimeout(300);
        $curl->get($this->webfont['base_url'] . 'css-files/', [
            'fontid' => $fontid,
            'number' => $number,
            'lang' => $lang,
        ]);

        $curl->close();

        if ($curl->error) {
            debug('Error: ' . $curl->errorMessage . "\n");
            return [];
        } else {
            return json_decode($curl->rawResponse, true);
        }
    }

    // 下载网页字体到网站目录 data/fonts
    private function downloadFiles($filelist, $action = null)
    {
        $curl = new \Curl\Curl();
        $curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
        $curl->setOpt(CURLOPT_SSL_VERIFYHOST, false);
        $curl->setTimeout(300);

        foreach ($filelist as $file) {
            $filename = basename($file);
            $curl->download($this->webfont['base_url'] . "download/?filename=$file&action=$action", "$this->font_path/$filename");
        }

        $curl->close();

        if ($curl->error) {
            debug('Error: ' . $curl->errorMessage . "\n");
            return false;
        } else {
            return true;
        }
    }
}