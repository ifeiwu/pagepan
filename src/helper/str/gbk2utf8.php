<?php
// GBK 转 UTF8
return function ($str) {
	$e = mb_detect_encoding($str, array('UTF-8', 'GBK','GB2312'));
	
	if ( $e == 'UTF-8' ) {
		return $str;
	} elseif ( $e == 'GBK' ) {
		return iconv('GBK', 'UTF-8', $str);
	}
	
	return iconv('GB2312', 'UTF-8', $str);
};