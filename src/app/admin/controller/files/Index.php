<?php

namespace app\admin\controller\files;

use support\Request;
use support\Response;

class Index
{
    public function index(Request $request): Response
    {

        // 初始化视图实例
        $view = view2();

        // 将数据源数据分配给视图模板
        $view->assign([
        ]);

        // 渲染数据源管理首页模板并返回响应
        return $view->display('files/index');
    }
}