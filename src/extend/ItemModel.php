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

    // 获取商品SKU
    public static function getGoodsSkus($goods_id)
    {
        $goods_skus = db()->select('goods_sku', '*', ['goods_id', '=', $goods_id]);
        if ($goods_skus) {
            foreach ($goods_skus as $i => $sku) {
                $goods_skus[$i]['specs'] = json_decode($sku['specs'], true);
            }
        }
        return $goods_skus;
    }

    // 获取商品规格
    public static function getGoodsSpecs($goods_id)
    {
        return db()->select('goods_spec', '*', ['goods_id', '=', $goods_id]);
    }

    // 返回商品规格格式化的字符串，如：(白色;M) 或 (颜色:白色;尺寸:M)
    public static function getGoodsSpecsFormatStr($type = 1, $specs = null)
    {
        $specs = $specs ?? self::$item['specs'];
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

    // 返回转换的内容
    public static function getContent($thumb_query = null)
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
        // 图片延迟加载，点击放大缩小效果。
        if (empty($thumb_query)) {
            $pattern = '/<img(.*?)[^>]src=["\'](.+?\.(jpg|jpge|gif|svg|apng|png|webp))["\'][^>](.*?)>/i';
            $replace = "<img class=\"lazyload zooming\" data-src=\"$2\" src=\"assets/image/loading.svg\" $1 $4>";
            $content = preg_replace($pattern, $replace, $content);
        } else {
            // 图片动态调整大小
            $pattern = '/<img(.*?)[^>]src=["\'](.+?\.(jpg|jpge|png|webp))["\'][^>](.*?)>/i';
            $replace = function ($matches) use ($thumb_query) {
                $src = $matches[2];
                // 检查是否是相对路径
                if (!preg_match('/^(https?:\/\/|\/\/)/i', $src)) {
                    $new_src = 'img/' . $src . '?' . $thumb_query;
                } else {
                    $new_src = $src;
                }
                return "<img class=\"lazyload zooming\" data-src=\"$new_src\" src=\"assets/image/loading.svg\" $matches[1] $matches[4]>";
            };

            // 使用 preg_replace_callback 进行替换
            $content = preg_replace_callback($pattern, $replace, $content);
        }

        return $content;
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
        return $tags ? explode(' ', $tags) : [];
    }

    /**
     * 返回图片链接
     * @param $prefix 图片前缀：s_,m_
     * @param $iscache 是否添加时间缓存控制
     * @param $isfull 是否带域名
     * @return false|mixed|string
     */
    public static function getImage($size = '', $iscache = true, $isfull = false)
    {
        $item = self::$item;
        $image = $item['image'];
        if ($image) {
            $image = self::getFileURL($image, $size, $iscache, $isfull);
        } else {
            // 1像素透明图片，防止有些浏览器没有图片显示交叉图片占位符。
            $image = base64_decode('ZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBRUFBQUFCQ0FRQUFBQzFIQXdDQUFBQUMwbEVRVlI0QVdQNHp3QUFBZ0VCQUFidktNc0FBQUFBU1VWT1JLNUNZSUk9');
        }
        return $image;
    }

    // 返回图片缩略图链接
    public static function getThumb($query = '')
    {
        $item = self::$item;
        $image = $item['image'];
        if ($image) {
            $pattern = '/^(https?:\/\/|\/\/)/i';
            if (!preg_match($pattern, $image)) {
                $path = self::$item['path'];
                $image = 'img/' . trim(trim($path, '/') . "/{$image}?{$query}", '/');
            }
        } else {
            // 1像素透明图片，防止有些浏览器没有图片显示交叉图片占位符。
            $image = base64_decode('ZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBRUFBQUFCQ0FRQUFBQzFIQXdDQUFBQUMwbEVRVlI0QVdQNHp3QUFBZ0VCQUFidktNc0FBQUFBU1VWT1JLNUNZSUk9');
        }
        return $image;
    }

    // 返回图标图片，支持返回svg源代码
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
        $image = self::getFileURL($image);
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
        return self::getFileURL(self::$item['video']);
    }

    public static function getFile($isfull = false)
    {
        return self::getFileURL(self::$item['file']);
    }

    /**
     * 返回文件链接路径
     * @param $name 文件名称
     * @param $prefix 文件名前缀，一般图片才有。如：s_,m_
     * @param $iscache 是否添加时间缓存控制
     * @param $isfull 是否带域名
     * @return mixed|string
     */
    public static function getFileURL($name, $prefix = '', $iscache = true, $isfull = false)
    {
        $pattern = '/^(https?:\/\/|\/\/)/i';
        if (preg_match($pattern, $name)) {
            $filepath = $name;
        } else {
            $path = self::$item['path'];
            $utime = self::$item['utime'];
            $filepath = trim(trim($path, '/') . "/{$prefix}{$name}", '/');
            if (!preg_match($pattern, $filepath)) {
                if ($iscache == true) {
                    $filepath = $filepath . rtrim("?$utime", '?');
                }
                $domain = assets_domain();
                return "{$domain}{$filepath}";
            }
        }
        return $filepath;
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
            'title' => $link_title,
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