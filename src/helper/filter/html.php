<?php
// 过滤器对特殊字符进行 HTML 转义
return function ($data) {
	$filter_html = function ($data) use (&$filter_html, $purifier) {
		if ( is_array($data) ) {
		    return array_map($filter_html, $data);
		}
		return filter_var($data, FILTER_SANITIZE_SPECIAL_CHARS);
	};
	
	return $filter_html($data);
};