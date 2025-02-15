<?php
/**
 * 直接访问页面，不需要通过读取数据库页面
 */
return function ($module, $action) {
	$site = db()->select('site', ['name', 'value'], ['state', '=', 1]);
    $site = helper('arr/tokv', [$site]);
    define('SITE', $site);
    $view = view();
    $view->assign('site', $site);
    $view->assign('pagevar', [
        'domain' => Request::domain(),
        'domain3' => $site['domain3'] ?: '',
        'rooturl' => ROOT_URL,
        'baseurl' => BASE_URL,
        'page_id' => 1,
        'page_alias' => '',
        'page_title' => ''
    ]);

	$layout = Request::get('l');

	if ( $layout ) {
        $view->layout($layout);
	}

    $view->display("$module/$action");
};