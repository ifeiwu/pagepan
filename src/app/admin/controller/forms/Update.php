<?php

namespace app\admin\controller\forms;

use support\Request;

class Update
{
    public function index(Request $request): void
    {
        $ds = datastar();
        $db = db();

        $row = post();
        $row['state'] = post('state', 'int', 0);

        $dataset = $db->table('dataset')->where('id', $row['dataset_id'])->first();

        if ($db->table($dataset->table)->exists()) {
            if ($db->table($dataset->table)->where('id', $row['id'])->update($row)) {
                $ds->event('save-completed', ['table' => $dataset->table, 'id' => $row['id']]);
                $ds->script("sp.toast.success('已保存', { position: 'top-center' })");
            } else {
                $ds->script("sp.toast.error('保存失败', { position: 'top-center' })");
            }
        } else {
            $ds->script("sp.toast.warning('没有找到记录', { position: 'top-center' })");
        }

        $ds->close();
    }
}