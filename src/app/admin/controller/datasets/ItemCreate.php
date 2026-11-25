<?php

namespace app\admin\controller\datasets;

use app\exception\DatastarAlertException;
use support\Request;

class ItemCreate
{
    public function index(Request $request): void
    {
        $ds = datastar();
        $db = db();

        $dataset_id = $ds->getSignals('dataset_id');
        $dataset = $db->table('dataset')->where('id', $dataset_id)->first();
        if (!$dataset) {
            throw new DatastarAlertException('无效数据集');
        }

        // 获取最大排序
        $max_sort = $db->table($dataset->table)->max('sort');

        $row = [
            'dataset_id' => $dataset_id,
            'sort' => $max_sort ?: 100,
            'state' => 0,
            'title' => '重命名',
            'created' => date('Y-m-d H:i:s')
        ];

        $id = $db->table($dataset->table)->insertGetId($row);
        if ($id) {
            // 打开编辑窗口
            $url = "/admin/datasets/item-edit/form?dataset_id=$dataset_id&id=$id";
            $ds->script("openItemEdit('', '$url')");

            // 刷新表格数据
            $ds->event('reload', [], '#items');

            // 触发页面事件
            $ds->event('add-completed', ['table' => $dataset->table, 'id' => $id]);
        } else {
            $ds->script("sp.toast.error('添加失败', { position: 'top-center' })");
        }

        $ds->close();
    }
}