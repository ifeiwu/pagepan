<?php

namespace app\admin\controller\datasets;

use app\exception\DatastarAlertException;
use support\Request;

class Delete
{
    public function index(Request $request): void
    {
        $ds = datastar();
        $db = db();

        $id = get('id');

        // 查询数据源信息，不存在则提示无效数据源
        $dataset = $db->table('dataset')->where('id', $id)->first();
        if (!$dataset) {
            throw new DatastarAlertException('无效数据源');
        }

        // 检查数据源是否还有关联记录，存在记录时禁止删除
        if ($db->table($dataset->table)->where('dataset_id', $id)->count() > 0) {
            throw new DatastarAlertException("删除数据源前，请先清空「{$dataset->title}」中的所有记录。");
        }

        // 删除数据源，成功后跳转至数据源列表
        if ($db->table('dataset')->delete($id)) {
            $ds->location('/admin/datasets');
        } else {
            // 删除失败时提示错误信息
            $ds->script("sp.toast.error('删除数据源失败', { position: 'top-center' })");
        }

        // 结束 Datastar 响应
        $ds->close();
    }
}