<?php

namespace app\admin\controller\datasets\items;

use app\exception\DatastarAlertException;
use support\Request;

class Update
{
    public function index(Request $request): void
    {
        $ds = datastar();
        $db = db();

        $row = post();
        $row['state'] = post('state', 'int', 0);
        $row['updated'] = date('Y-m-d H:i:s');

        $dataset = $db->table('dataset')->where('id', $row['dataset_id'])->first();
        if (!$dataset) {
            throw new DatastarAlertException('无效数据源');
        }

        if ($db->table($dataset->table)->exists()) {
            if ($db->table($dataset->table)->where('id', $row['id'])->update($row)) {
                $detail = json_encode(['id' => $row['id']]);
                $ds->script("
                    parent.document.querySelector('#table').dispatchEvent(new CustomEvent('item-replace',{detail:{$detail}}));
                    sp.toast.success('已保存', { position: 'top-center' })
                ");
            } else {
                $ds->script("sp.toast.error('保存失败', { position: 'top-center' })");
            }
        } else {
            $ds->script("sp.toast.warning('没有找到记录', { position: 'top-center' })");
        }

        $ds->close();
    }

    public function field(Request $request): void
    {
        $ds = datastar();
        $db = db();

        $id = get('id');
        $dataset_id = get('dataset_id');
        $name = get('name');
        $value = get('value');

        $dataset = $db->table('dataset')->where('id', $dataset_id)->first();
        if (!$dataset) {
            throw new DatastarAlertException('无效数据源');
        }

        $row = [
            $name => $value,
            'updated' => date('Y-m-d H:i:s')
        ];

        if ($db->table($dataset->table)->where('id', $id)->update($row)) {
            $ds->event('reload', [], '#table');
        } else {
            $ds->script("sp.toast.error('保存失败', { position: 'top-center' })");
        }

        $ds->close();
    }
}