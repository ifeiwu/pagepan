<?php
// HTML 过滤
return function ($data) {
    require_once EXT_PATH . 'HTMLPurifier.php';

	$config = HTMLPurifier_Config::createDefault();
	$purifier = new HTMLPurifier($config);
	
	$filter_html = function ($data) use (&$filter_html, $purifier) {

		if ( is_array($data) ) {
		    return array_map($filter_html, $data);
		}

		return $purifier->purify($data);
	};
	
	return $filter_html($data);
};