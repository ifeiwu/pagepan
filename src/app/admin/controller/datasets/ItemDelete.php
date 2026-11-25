<?php

namespace app\admin\controller\datasets;

use app\exception\DatastarAlertException;
use support\FileSystem;
use support\Request;

class ItemDelete
{
    public function index(Request $request): void
    {
        $ds = datastar();
        $db = db();

        $signals = $ds->getSignals();
        $id = get('id');
        $dataset_id = get('dataset_id');

        $dataset = $db->table('dataset')->where('id', $dataset_id)->first();
        if (!$dataset) {
            throw new DatastarAlertException('无效数据集');
        }

        if ($db->table($dataset->table)->delete($id)) {
            // 删除上传目录
            $upload_path = public_path("/files/dataset/$dataset_id/$id");
            if (is_dir($upload_path)) {
                FileSystem::rrmdir($upload_path);
            }

            // 从表格里删除
            $ds->remove("#item-$id");

            // 当前只有一个记录，触发点击“上一页”
            if (get('child') <= 1) {
                $ds->signals(['pagenum' => $signals['pagenum'] - 1]);
            }

            $ds->event('delete-completed', ['table' => $dataset->table, 'id' => $id]);
        } else {
            $ds->script("sp.toast.error('删除失败', { position: 'top-center' })");
        }

        $ds->close();
    }

    public function checks(Request $request): void
    {
        $ds = datastar();
        $db = db();

        $signals = $ds->getSignals();
        $dataset_id = $signals['dataset_id'];
        $ids = array_filter($signals['ids']);

        $dataset = $db->table('dataset')->where('id', $dataset_id)->first();
        if (!$dataset) {
            throw new DatastarAlertException('无效数据集');
        }

        if ($ids) {
            $db->table($dataset->table)->whereIn('id', $ids)->delete();

            $perpage = $signals['perpage'];
            $pagenum = $signals['pagenum'];
            $paginator = $db->table($dataset->table)->paginate($perpage, '*', 'page', $pagenum);
            if (!$paginator->items()) {
                // 刷新表格数据
                $ds->signals(['pagenum' => $pagenum - 1]);
            }
        }


    }
}