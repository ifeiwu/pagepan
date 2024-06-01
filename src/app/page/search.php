<?php
/**
 * 关键字搜索
 */
return function ($alias) {
	
    $keyword = helper('filter/query', [$_REQUEST['query']]);

    Pager::new()->display(['alias' => $alias, 'keyword' => $keyword]);
};