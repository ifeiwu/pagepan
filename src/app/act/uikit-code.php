<?php
/**
 * PBuilder 获取组件代码
 */
return function () {
	$source = false; // 组件源码
	$type = $_GET['type']; // 组件类型

	if ( stripos($type, '-') !== false ) {
		$type = explode('-', $type)[0];
	}

	$method = '__uikit_' . $type;
	if ( ! function_exists($method) ) {
		$method = '__uikit_default';
	}

	$config = file_get_contents('php://input');
	$config = $config ? json_decode($config, true) : [];
    $_GET['isbuilder'] = true; // 组件在编辑器里
    $_GET['isplacehold'] = true; // 组件使用占位符图片

	// 第一次加载动态组件
	if ( $type == null ) {
        $_GET['isdemo'] = true; // 显示演示数据
	}

    $view = view();
    $site = db()->select('site', ['name', 'value'], ['state', '=', 1]);
    $site = helper('arr/tokv', [$site]);
    $view->assign('site', $site);

	ob_start();
	ob_implicit_flush(0);

	call_user_func($method, $view, $config);

	$content = ob_get_clean();

    Response::json(['content' => $content, 'path' => "{$config['path']}"]);
};


function __uikit_default($view, $config)
{
    echo $view->uikit->getContent($config['path'], $config, false);
}

function __uikit_list($view, $config) {
	// 获取页面ID
	$page_id = $config['page_id'];
	$page = db()->find('page', 'id, alias, title', array('id', '=', $page_id));
	// 模拟页面参数
    $view->assign('pagevar', [
        'page_id' => $page['id'],
        'page_alias' => $page['alias'],
        'page_title' => $page['title']
    ]);

    echo $view->uikit->getContent($config['path'], $config);
}

function __uikit_article($view, $config) {
	$dataset_id = 0;
	$dataset_table = 'item';
	$page_id = $config['page_id'];
	// 获关联页面信息
	$join_page = db()->find('page', 'id, alias, title, setting', array('id', '=', $config['setting']['join.id']));
	// 获取关联数据源
	if ( $join_page['setting'] ) {
		$settings = json_decode($join_page['setting'], true);
		foreach ($settings as $setting) {
			if ( $setting['join.id'] == $page_id ) {
				$dataset_id = $setting['dataset.id'];
				$dataset_table = $setting['dataset.table'];
				break;
			}
		}
	}
	
	// 获取数据源最新的一条数据
	$where = array();
	$where[] = array('state', '=', 1);
	$where[] = 'AND';
	$where[] = array('type', '=', 1);
	$where[] = 'AND';
	$where[] = array('page_id', '=', $dataset_id);
	
	$item_id = db()->find($dataset_table, 'id', $where, ['sortby' => 'DESC', 'ctime' => 'DESC'], 0);
	// 模拟页面参数
    $view->assign('pagevar', [
        'get_id' => $item_id,
        'page_id' => $join_page['id'],
        'page_alias' => $join_page['alias'],
        'page_title' => $join_page['title']
    ]);

    echo $view->uikit->getContent($config['path'], $config);
}