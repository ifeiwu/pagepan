<?php

namespace app\admin\controller\datasets;

use app\exception\DatastarAlertException;
use support\Request;

class ItemReplace
{
    public function index(Request $request): void
    {
        $ds = datastar();
        $db = db();

        $dataset_id = $ds->getSignals('dataset_id');
        $id = get('id', 'int');

        $dataset = $db->table('dataset')->where('id', $dataset_id)->first();
        if (!$dataset) {
            throw new DatastarAlertException('无效数据集');
        }

        $item = $db->table($dataset->table)->where('id', $id)->first();

        $html = view2()->render('datasets/items', [
            'items' => [$item]
        ]);

        $ds->replace($html, "#item-$id");

        $ds->close();
    }
}