<?php

namespace app\admin\controller\datasets\items;

use support\Request;
use support\Response;

class Edit
{
    /**
     * 打开数据项编辑窗口
     */
    public function index(Request $request): void
    {
        // 初始化 Datastar
        $ds = datastar();

        // 获取数据集 ID、数据项 ID 和标题
        $id = get('id');
        $dataset_id = get('dataset_id');
        $title = get('title');

        // 构建编辑表单地址
        $url = "/admin/datasets/items/edit/form?dataset_id=$dataset_id&id=$id";

        // 执行前端脚本，打开数据项编辑窗口
        $ds->script("openItemEdit('$title', '$url')");

        // 关闭 Datastar 响应
        $ds->close();
    }

    /**
     * 加载数据项编辑表单
     */
    public function form(): Response
    {
        // 获取数据集 ID 和数据项 ID
        $id = get('id');
        $dataset_id = get('dataset_id');

        // 获取数据库实例
        $db = db();

        // 根据数据集 ID 获取数据集配置
        $dataset = $db->table('dataset')->where('id', $dataset_id)->first();

        // 根据数据集对应的表名查询数据项
        $item = $db->table($dataset->table)->where('dataset_id', $dataset_id)->where('id', $id)->first();

        // 初始化视图并分配模板变量
        $view = view2();
        $view->assign([
            'dataset' => $dataset,
            'item' => $item
        ]);

        // 根据数据集表名加载对应的编辑表单模板
        return $view->display("forms/$dataset->table");
    }
}
