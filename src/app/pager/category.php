<?php
/**
 * 分类页面
 */
return function ($alias, $cid) {
	
	Pager::new()->display(['alias' => $alias, 'cid' => intval($cid)]);
};