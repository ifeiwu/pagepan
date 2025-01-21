<?php

class ItemModel
{
    private static $item;

    private static $setting;

    public static function setItem($item)
    {
        self::$item = $item;
    }

    public static function setSetting($setting = [])
    {
        self::$setting = $setting ?? [];
    }

    public static function getTitle()
    {
        return nl2br(self::$item['title']);
    }

    public static function getSubtitle()
    {
        return nl2br(self::$item['subtitle']);
    }

    public static function getPrice()
    {
        return number_format(self::$item['price'], 2, '.', ',');
    }

    public static function getSpecs($type = 1)
    {
        $specs = self::$item['specs'];
        if ($specs) {
            $result = [];
            foreach ($specs as $key => $value) {
                if ($type == 1) {
                    $result[] = $value;
                } else {
                    $result[] = $key . ": " . $value;
                }
            }
            return implode(";", $result);
        } else {
            return '';
        }
    }

    public static function getSummary()
    {
        $summary = html_decode(self::$item['summary']);
        // 纯文本换行转 <br>
        if ($summary == strip_tags($summary)) {
            $summary = nl2br($summary);
        }
        return $summary;
    }

    // item 返回转换的内容
    public static function getContent()
    {
        $item = self::$item;
        $content = $item['content'];
        $content_type = json_decode($item['_more'], true)['content_type'];
        if ($content_type == 'md') {
            $content = (new Parsedown())->text(html_decode($content));
            $content = preg_replace('/<a(.*?)>(.*?)<\/a>/i', "<a $1 target=\"_blank\">$2</a>", $content);
        } else {
            $content = html_decode($content);
        }
        return preg_replace('/<img.+?src=[\'"](.+?\.(jpg|jpge|gif|svg|apng|png|webp))[\'"](.*?)>/i', "<img class=\"lazyload zooming\" data-src=\"$1\" src=\"assets/image/loading.svg\" $3>", $content);
    }

    // item 返回分类链接
    public static function getCategoryUrl()
    {
        $link_url = self::setting['category.link.url'];
        if ($link_url !== false) {
            if (is_string($link_url)) {
                return self::parseUrlGetParams($link_url);
            } else {
                return helper('db/getPageAlias') . '/category/' . self::$item['id'] . '.html';
            }
        } else {
            return 'javascript:;';
        }
    }

    // 标签数组
    public static function getTags()
    {
        $tags = self::$item['tags'];
        $tags = $tags ? explode(' ', $tags) : [];
    }

    // item 返回图片链接
    public static function getImage($isfull = false)
    {
        $item = self::$item;
        $image = $item['image'];
        if ($image) {
            $image = self::getFilePath($image);
        } else {
            // 1像素透明图片，防止有些浏览器没有图片显示交叉图片占位符。
            $image = base64_decode('ZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBRUFBQUFCQ0FRQUFBQzFIQXdDQUFBQUMwbEVRVlI0QVdQNHp3QUFBZ0VCQUFidktNc0FBQUFBU1VWT1JLNUNZSUk9');
        }
        return $image;
    }

    // item 返回图标图片，支持返回svg源代码
    public static function getIcon($image = null, $isfull = false)
    {
        $item = self::$item;
        $image = $image ?: $item['icon'] ?: $item['image'];
        $title = $item['title'];
        // 如果没有图片，则返回标题名称。
        if (!$image = trim($image)) return $title;
        // 如果是svg源代码，则直接返回。
        if (preg_match('/\<svg.*?\>.*/i', $image)) {
            return urldecode($image);
        }
        // 站外或站内图标
        $image = self::getFilePath($image);
        // 如是是svg图片，则返回源代码
        if (preg_match('/.+?\.svg/i', $image)) {
            return '<img src="' . $image . '" style="display:none" alt="" onload="fetch(\'' . $image . '\').then(response => response.text()).then(data => {this.parentNode.innerHTML=data})">';
        } // 其它图片格式，返回图片标签。
        else {
            return '<img src="' . $image . '" alt="' . $title . '" loading="lazy">';
        }
    }

    public static function getVideo($isfull = false)
    {
        return self::getFilePath(self::$item['video']);
    }

    public static function getFile($isfull = false)
    {
        return self::getFilePath(self::$item['file']);
    }

    // 获取 item 文件链接路径
    public static function getFilePath($name, $isfull = false)
    {
        $pattern = '/^(https?:\/\/|\/\/)/i';
        if (preg_match($pattern, $name)) {
            $file = $name;
        } else {
            $path = self::$item['path'];
            $utime = self::$item['utime'];
            $file = trim($path, '/') . "/$name";
            if (!preg_match($pattern, $file)) {
                $file = asset(trim($file . rtrim("?$utime", '?'), '/'), $isfull);
            }
        }
        return $file;
    }

    // item 返回链接数组
    public static function getLink()
    {
        $item = self::$item;
        $link_url = '';
        $link_title = '';
        $link_target = '';
        // 数组链接
        if (isset($item['link_url'])) {
            $link_url = $item['link_url'];
            $link_title = $item['link_title'];
            $link_target = $item['link_target'];
        } else {
            // 未设置链接，自动添加关联的详情页面链接
            $link = $item['link'];
            // 外部链接
            if (preg_match('/^(https?:\/\/|\/\/)/i', $link)) {
                $link_url = $link;
            } // JSON链接
            else {
                $link = json_decode($link, true);
                if (empty($link['url'])) {
                    $setting_link_url = self::$setting['dataview.link.url'];
                    if (empty($setting_link_url)) {
                        $join_alias = self::$setting['join.alias'];
                        $link_url = $join_alias ? self::parseUrlItemParams($join_alias . '/id/[item.id].html') : 'javascript:;';
                    } else {
                        $link_url = self::parseUrlItemParams($setting_link_url);
                    }
                } else {
                    $link_title = $link['title'];
                    $link_url = $link['url'];
                    $link_target = $link['target'];
                }
            }
        }

        $link_url = self::parseUrlGetParams($link_url);

        return [
            'url' => $link_url,
            'target' => $link_target ?: self::$setting['dataview.link.target'],
            'link_title' => $link_title,
            'link_url' => $link_url,
            'link_target' => $link_target
        ];
    }

    /**
     * URL模板 $_GET 参数替换。
     * 格式：products?cid=[get.cid]&title=[get.title]
     * @param $url
     * @return string
     */
    public static function parseUrlGetParams($url)
    {
        if (!empty($url)) {
            preg_match_all("/\[get\.(\w*?)]/i", $url, $matches, PREG_SET_ORDER);
            if (!empty($matches)) {
                foreach ($matches as $matche) {
                    $name = $matche[1];
                    $url = str_replace('[get.' . $name . ']', $_GET[$name], $url);
                }
            }
        }
        return $url;
    }

    /**
     * URL 字符串模板 $item 参数替换。
     * 格式：product/id/[item.id].html
     * @param $url
     * @param $item
     * @return string
     */
    public static function parseUrlItemParams($url)
    {
        if (!empty($url)) {
            preg_match_all("/\[item\.(\w*?)]/i", $url, $matches, PREG_SET_ORDER);
            if (!empty($matches)) {
                $item = self::$item;
                foreach ($matches as $value) {
                    $name = $value[1];
                    $url = str_replace("[item.{$name}]", $item[$name], $url);
                }
            }
        }
        return $url;
    }
}