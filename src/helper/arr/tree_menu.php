<?php
// 构建树形菜单
return $tree_menu_fun = function ($trees, &$element, $cur_level = 0, $max_level, $value, $options) use (&$tree_menu_fun) {

    if ($cur_level < $max_level && is_array($trees)) {
        foreach ($trees as $tree) {
            $child_name = $options['child_name'];
            $child_name = $child_name ?: '_child';
            $_child = $tree[$child_name];

            $id = $tree['id'];
            $pid = $tree['pid'];
            $title = $tree['title'];
            $target = $options['target'] ?: $tree['link_target'];
            $active = $value == $id ? $options['active'] : '';

            if (!empty($options['url'])) {
                $url = str_replace('{id}', $id, $options['url']);
            } else {
                $url = $tree['link_url'];
            }

            if ($_child) {
                $element .= '<li class="' . $active . '" data-pid="' . $pid . '" data-id="' . $id . '">';
                $element .= '<a href="' . ($url ? $url : '#') . '" class="' . $options['arrow'] . '" aria-expanded="' . ($active ? 'true' : 'false') . '">' . $title . '</a>';
                $element .= '<ul class="list-none">';

                $tree_menu_fun($_child, $element, $cur_level + 1, $max_level, $value, $options);

                $element .= '</ul>';
                $element .= '</li>';
            } else {
                $element .= '<li data-pid="' . $pid . '" data-id="' . $id . '"><a href="' . $url . '" target="' . $target . '" aria-expanded="false">' . $title . '</a></li>';
            }
        }
    }
};