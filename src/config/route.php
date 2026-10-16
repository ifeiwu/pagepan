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


Route::any('/imgph', [app\controller\Imgph::class, 'index']);

Route::group('/{path:(?!admin(?:/|$)|shop(?:/|$)).*}', function () {

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
        $path = $request->route->param('path') ?: 'index';
        $page_path = "page/$path";
        var_export($request->app);
        if (!is_file(app_path("view/{$page_path}.php"))) {
            if ($request->expectsJson()) {
                return json(['code' => 404, 'msg' => '404 not found']);
            }
            return response()->withStatus(404);
        }

        return view2()->response($page_path);
    });
});