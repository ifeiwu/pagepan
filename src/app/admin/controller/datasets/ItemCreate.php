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

        $row = [
            'dataset_id' => $dataset_id,
            'state' => 0,
            'title' => '重命名',
            'created' => date('Y-m-d H:i:s')
        ];

        $id = $db->table($dataset->table)->insertGetId($row);
        if ($id) {
            $url = "/admin/datasets/item-edit/form?dataset_id=$dataset_id&id=$id";
            $ds->script("openItemEdit('', '$url')");

            $ds->signals(['dataset_id' => $dataset_id, 'pagenum' => 1]);
            $ds->event('add-completed', ['table' => $dataset->table, 'id' => $id]);
        } else {
            $ds->script("sp.toast.error('添加失败', { position: 'top-center' })");
        }

        $ds->close();
    }
}