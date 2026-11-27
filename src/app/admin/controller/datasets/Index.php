<?php

namespace app\admin\controller\datasets;

use support\Request;
use support\Response;

class Index
{
    public function index(Request $request): Response
    {
        // 获取数据源 ID
        $dataset_id = get('id');

        if ($dataset_id) {
            // 根据 ID 获取指定的数据源
            $dataset = db()->table('dataset')->where('id', $dataset_id)->first();
        } else {
            // 未指定数据源 ID 时，获取第一个数据源作为默认数据源
            $dataset = db()->table('dataset')->first();
        }

        // 初始化视图实例
        $view = view2();

        // 将数据源数据分配给视图模板
        $view->assign([
            'dataset' => $dataset
        ]);

        // 渲染数据源管理首页模板并返回响应
        return $view->display('datasets/index');
    }
}