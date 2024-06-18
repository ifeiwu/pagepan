<?php
/**
 * 标签搜索
 */
return function ($alias, $tag) {
	
    $tag = helper('filter/query', [urldecode($tag)]);

    Pager::new()->display(['alias' => $alias, 'tag' => $tag]);
};