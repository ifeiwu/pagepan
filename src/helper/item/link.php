<?php
// item 返回链接数组
return function ($item, $url = null, $target = null) {
    $link = $item['link'];
    $link_url = $link;
    $link_title = '';
    $link_target = '';

    // json 格式的链接
    if ( $link && ! is_null(json_decode($link)) )
    {
        $link = json_decode($link, true);
        $link_title = $link['title'];
        $link_url = $link['url'];
        $link_target = $link['target'];
    }
    else
    {
        $link_url = $item['link_url'];
        $link_title = $item['link_title'];
        $link_target = $item['link_target'];
    }

    // 站内详情链接
    if ( ! $link_url )
    {
        if ( empty($url) )
        {
            $join_alias = view()->setting['join.alias'];
            $url = $join_alias ? $join_alias . '/id/[item.id].html' : 'javascript:;';
        }

        // URL模板 $item 参数替换
        preg_match_all("/\[item\.(\w*?)]/i", $url, $matches, PREG_SET_ORDER);

        if ( ! empty($matches) )
        {
            foreach ($matches as $value)
            {
                $name = $value[1];
                $url = str_replace('[item.' . $name . ']', $item[$name], $url);
            }
        }
    }
    // 站外链接
    else
    {
        $url = $link_url;
        $target = $link_target;
    }

    return ['url' => $url, 'target' => $target, 'link_title' => $link_title, 'link_url' => $link_url, 'link_target' => $link_target];
};