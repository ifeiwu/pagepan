<?php

namespace app\admin\controller\datasets;

use support\Request;

class Edit
{
    public function index(Request $request): void
    {
        // 初始化 Datastar 响应
        $ds = datastar();

        // 获取数据集 ID
        $id = get('id', 'int');

        // 根据 ID 获取数据集，不存在时使用空数组
        $dataset = $id
            ? db()->table('dataset')->where('id', $id)->first()
            : [];

        // 渲染编辑弹窗
        $html = view2()->render('datasets/edit', [
            'dataset' => $dataset ?: []
        ]);

        // 更新页面内容并显示弹窗
        $ds->element($html);
        $ds->script('sp.dialog(document.querySelector("#EditDialog")).show()');

        $ds->close();
    }
}