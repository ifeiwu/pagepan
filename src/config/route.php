<?php
/**
 * This file is part of webman.
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the MIT-LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @author    walkor<walkor@workerman.net>
 * @copyright walkor<walkor@workerman.net>
 * @link      http://www.workerman.net/
 * @license   http://www.opensource.org/licenses/mit-license.php MIT License
 */

use Webman\Route;
use support\Request;

Route::any('/imgph/bg', [app\controller\Imgph::class, 'bg']);
Route::any('/imgph/block', [app\controller\Imgph::class, 'block']);

$exclude = 'admin|api|assets|data';

Route::group('/{path:(?!(?:' . $exclude . ')(?:/|$))(?!.*\.[^/]+$).*}', function () {

    Route::any('/id/{id:\d+}', function (Request $request, $id) {
        return response('id/'.$id);
    });

    Route::any('/category/{cid:\d+}', function (Request $request, $cid) {
        return response('cid/'.$cid);
    });

    Route::any('/category/{cid:\d+}/page/{pagenum:\d+}', function (Request $request, $cid, $pagenum) {
        return response('cid/'.$cid.'/'.$pagenum);
    });

    Route::any('/tag/{id:\w+}', function (Request $request, $tag) {
        return response('tag/'.$tag);
    });

    Route::any('/search', function (Request $request) {
        return response('search');
    });

    Route::any('', function (Request $request) {
        $db = db();
        $path = $request->route->param('path');

        // 指定页面别名
        if ($path) {
            $page = $db->table('page')->where([['state', '=', 1], ['path', '=', $path]])->first();
        }
        // 未指定页面别名自动寻找页面
        else {
            $page = $db->table('page')->where([['state', '=', 1], ['type', '=', 'guide']])->first(); // 引导页
            if (!$page) {
                $page = $db->table('page')->where([['state', '=', 1], ['type', '=', 'home']])->first(); // 首页
            }
            // 专页
            if (!$page) {
                // 查询专页首页，别名可以是空字符串或 index
                $page = $db->table('page')->where([['state', '=', 1], ['type', '=', 'pro'], ['path', 'IN', ['index', '']]])->first();
                $page->path = 'index';
            }
        }

        if (!$page) {
            return not_found();
        }

        $page_path = "page/{$page->path}";
        $page_file = app_path("view/{$page_path}.phtml");
        if (!is_file($page_file)) {
            if ($request->expectsJson()) {
                return json(['code' => 404, 'msg' => '404 not found']);
            }
            return response()->withStatus(404);
        }

        $view = view2();
        $view->setExtensionName('.phtml');

        // 站点信息
        $site_list = $db->table('site')->where('state', 1)->get();
        $site = [];
        foreach ($site_list as $obj) {
            $value = $obj->value;
            if ($value) {
                $site[$obj->name] = $value;
            }
        }

        $view->assign('site', $site);
        $view->assign('seo', []);
        $view->assign('pagevar', [
            'root_url' => '',
            'base_url' => '',
            'domain' => $request->host(),
            'domain3' => '',
            'timestamp' => $site['timestamp'],
            'page_id' => $page->id,
            'page_type' => $page->type,
            'page_path' => $page->path,
            'page_title' => $page->title,
//            'get_alias' => $data['alias'] ?: '',
//            'get_id' => $data['id'] ?: '',
//            'get_cid' => $data['cid'] ?: '', // 分类 id
//            'get_tag' => $data['tag'] ?: '',
//            'get_keyword' => $data['keyword'] ?: '',
//            'get_pagenum' => $data['pagenum'] ?: '',
        ]);

        $layout_path = $page->layout;
        // 使用页面布局
        if ($layout_path) {
            $layout_path = app_path("view/layout/{$layout_path}.phtml");
            $layout_content = file_get_contents($layout_path);
            $page_content = $view->render($page_path);
            // 默认页面内容，表示页面有些内容块没有添加布局属性，如: <div layout-content></div>
            if ($page_content) {
                $view->addSection('content', $page_content);
            }
            // 页面内容添加到布局页面
            $page_content = $view->parse($layout_content);
        }
        else {
            $page_content = $view->render($page_path);
        }

        // 页面内容添加到页面框架布局
        if ($page_content) {
            $view->addSection('content', $page_content);
        }

        return response($view->render('layout/frame'));
    });
});

function page_main()
{

}