<?php
// MarkDown 转 HTML
return function ($text) {

	$parsedown = new Parsedown();
	
	return $parsedown->text($text);
};