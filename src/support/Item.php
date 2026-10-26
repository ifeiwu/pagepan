<?php

namespace support;

class Item
{
    public array $item = [];

    public array $setting = [];

    public function __construct($item) {
        $this->item = (array)$item;
    }

    public function setSetting($setting = []): void
    {
        $this->setting = $setting ?? [];
    }

    public function get(string $key, mixed $default = null): mixed
    {
        return $this->item[$key] ?? $default;
    }

    public function getTitle(): string
    {
        return nl2br($this->item['title']);
    }

    public function getSubtitle(): string
    {
        return nl2br($this->item['subtitle']);
    }

    /**
     * 获取 summary 字段值，并自动实体转换html或\n转<br>换行
     * @return string
     */
    public function getSummary(): string
    {
        $summary = html_decode($this->item['summary']);
        // 纯文本换行转 <br>
        if ($summary == strip_tags($summary)) {
            $summary = nl2br($summary);
        }
        return $summary;
    }

    /**
     * 返回转换后的内容
     * @param $thumb_query
     * @return string
     */
    public function getContent($thumb_query = null): string
    {
        $item = $this->item;
        $content = $item['content'];
        $content_type = self::getMore('content_type');
        if ($content_type == 'md') {
            $content = (new \Parsedown())->text(html_decode($content));
            $content = preg_replace('/<a(.*?)>(.*?)<\/a>/i', "<a $1 target=\"_blank\">$2</a>", $content);
        } else {
            $content = html_decode($content);
        }
        // 图片延迟加载，点击放大缩小效果。
        if (empty($thumb_query)) {
            $pattern = '/<img(.*?)[^>]src=["\'](.+?\.(jpg|jpeg|png|webp|avif|bmp|gif|svg))["\'][^>](.*?)>/i';
            $replace = "<img class=\"lazyload zooming\" data-src=\"$2\" src=\"assets/image/loading.svg\" $1 $4>";
            $content = preg_replace($pattern, $replace, $content);
        } else {
            // 图片动态调整大小
            $pattern = '/<img(.*?)[^>]src=["\'](.+?\.(jpg|jpeg|png|webp|avif|bmp))["\'][^>](.*?)>/i';
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

    /**
     * 获取 _more 字段值并把 json 转为数组
     * @param string $key 取对应的 key 的值
     * @return array|string
     */
    public function getMore(string $key = ''): array|string
    {
        $more = json_decode($this->item['_more'], true);
        if ($key != '') {
            return $more[$key];
        }
        return $more;
    }

    /**
     * 返回分类链接
     * @return string
     */
    public function getCategoryUrl(): string
    {
        $link_url = $this->setting['category.link.url'];
        if ($link_url !== false) {
            if (is_string($link_url)) {
                return $this->parseUrlGetParams($link_url);
            } else {
                return helper('db/getPageAlias') . '/category/' . $this->item['id'] . '.html';
            }
        } else {
            return 'javascript:;';
        }
    }

    /**
     * 标签数组
     * @return array
     */
    public function getTags(): array
    {
        $tags = $this->item['tags'];
        return $tags ? explode(' ', $tags) : [];
    }

    /**
     * 返回图片链接
     * @param string $prefix 图片前缀：s_,m_
     * @param bool $iscache 是否添加时间缓存控制
     * @param bool $isfull 是否带域名
     * @return mixed
     */
    public function getImage(string $prefix = '', bool $iscache = true, bool $isfull = false): mixed
    {
        $image = $this->item['image'];
        if ($image) {
            $image = $this->getFileURL($image, $prefix, $iscache, $isfull);
        } else {
            // 1像素透明图片，防止有些浏览器没有图片显示交叉图片占位符。
            $image = base64_decode('ZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBRUFBQUFCQ0FRQUFBQzFIQXdDQUFBQUMwbEVRVlI0QVdQNHp3QUFBZ0VCQUFidktNc0FBQUFBU1VWT1JLNUNZSUk9');
        }
        return $image;
    }

    /**
     * 返回图片缩略图链接
     * @param string $query
     * @return string
     */
    public function getThumb(string $query = ''): string
    {
        $image = $this->item['image'];
        if ($image) {
            $pattern = '/^(https?:\/\/|\/\/)/i';
            if (!preg_match($pattern, $image)) {
                $path = $this->item['path'];
                $image = '/img/' . trim(trim($path, '/') . "/{$image}?{$query}", '/');
            }
        } else {
            // 1像素透明图片，防止有些浏览器没有图片显示交叉图片占位符。
            $image = base64_decode('ZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBRUFBQUFCQ0FRQUFBQzFIQXdDQUFBQUMwbEVRVlI0QVdQNHp3QUFBZ0VCQUFidktNc0FBQUFBU1VWT1JLNUNZSUk9');
        }
        return $image;
    }

    /**
     * 返回图标 html 标签 <img ...>
     * @param $image string|null 图标地址
     * @return string
     */
    public function getIcon(string $image = null): string
    {
        $item = $this->item;
        $image = $image ?: $item['icon'] ?: $item['image'];
        $title = $item['title'];
        // 如果没有图片，则返回标题名称。
        if (!$image = trim($image)) return $title;
        // 如果是svg源代码，则直接返回。
        if (preg_match('/\<svg.*?\>.*/i', $image)) {
            return urldecode($image);
        }
        // 站外或站内图标
        $image = $this->getFileURL($image);
        // 如是是svg图片，则返回源代码
        if (preg_match('/.+?\.svg/i', $image)) {
            return '<img src="' . $image . '" style="display:none" alt="" onload="fetch(\'' . $image . '\').then(response => response.text()).then(data => {this.parentNode.innerHTML=data})">';
        } // 其它图片格式，返回图片标签。
        else {
            return '<img src="' . $image . '" alt="' . $title . '" loading="lazy">';
        }
    }

    /**
     * 返回视频链接
     * @param $isfull boolean 是否带域名
     * @return string
     */
    public function getVideo(bool $isfull = false): string
    {
        return $this->getFileURL($this->item['video']);
    }

    /**
     * 返回文件链接
     * @param $isfull boolean 是否带域名
     * @return string
     */
    public function getFile(bool $isfull = false): string
    {
        return $this->getFileURL($this->item['file']);
    }

    /**
     * 返回文件链接路径
     * @param $name string 文件名称
     * @param $prefix string 文件名前缀，一般图片才有。如：s_,m_
     * @param $iscache boolean 是否添加时间缓存控制
     * @param $isfull boolean 是否带域名
     * @return string
     */
    public function getFileURL(string $name, string $prefix = '', bool $iscache = true, bool $isfull = false): string
    {
        $pattern = '/^(https?:\/\/|\/\/)/i';
        if (preg_match($pattern, $name)) {
            $filepath = $name;
        } else {
            $path = $this->item['path'];
            $filepath = trim(trim($path, '/') . "/{$prefix}{$name}", '/');
            if (!preg_match($pattern, $filepath)) {
                if ($iscache) {
                    $updated = strtotime($this->item['updated']);
                    $filepath = $filepath . rtrim("?$updated", '?');
                }
                return "//{$filepath}";
            }
        }
        return $filepath;
    }

    /**
     * 返回链接数组
     * @return array
     */
    public function getLink(): array
    {
        $item = $this->item;
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
                    $setting_link_url = $this->setting['dataview.link.url'];
                    if (empty($setting_link_url)) {
                        $join_alias = $this->setting['join.alias'];
                        $link_url = $join_alias ? $this->parseUrlItemParams($join_alias . '/id/[item.id].html') : 'javascript:;';
                    } else {
                        $link_url = $this->parseUrlItemParams($setting_link_url);
                    }
                } else {
                    $link_title = $link['title'];
                    $link_url = $link['url'];
                    $link_target = $link['target'];
                }
            }
        }

        $link_url = $this->parseUrlGetParams($link_url);

        return [
            'url' => $link_url,
            'target' => $link_target ?: $this->setting['dataview.link.target'],
            'title' => $link_title,
            'link_title' => $link_title,
            'link_url' => $link_url,
            'link_target' => $link_target
        ];
    }

    /**
     * URL 模板 $_GET 参数替换。
     * @param $url string products?cid=[get.cid]&title=[get.title]
     * @return string
     */
    public function parseUrlGetParams(string $url): string
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
     * @param $url string product/id/[item.id].html
     * @return string
     */
    public function parseUrlItemParams(string $url): string
    {
        if (!empty($url)) {
            preg_match_all("/\[item\.(\w*?)]/i", $url, $matches, PREG_SET_ORDER);
            if (!empty($matches)) {
                $item = $this->item;
                foreach ($matches as $value) {
                    $name = $value[1];
                    $url = str_replace("[item.{$name}]", $item[$name], $url);
                }
            }
        }
        return $url;
    }
}