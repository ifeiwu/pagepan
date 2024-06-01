<?php
/**
 * 获取首页标识
 */
return function () {
	
	$alias = db()->find('page', ['alias'], [['state', '=', 1], 'AND', ['type', '=', 'home']], null, 0);

	exit($alias);
};