<?php

namespace app\admin\controller\pages;

use support\Request;

class Query
{
    public function index(Request $request): void
    {
        $ds = datastar();
        $db = db();

        $signals = $ds->getSignals();

        $query = $db->table('page');
        $query->orderByRaw("INSTR(',guide,home,dataset,inside,graphic,pro,layout,404,', ',' || type || ',')");
        $query->orderBy('id', 'desc');

        // 关键字搜索
        $kword = $signals['kword'] ?? '';
        if ($kword) {
            $query->where(function ($query) use ($kword) {
                $query->orWhere('title', 'like', '%' . $kword . '%');
            });
        }

        // 分组过虑
        $group_id = $signals['group_id'] ?? '';
        if ($group_id) {
            $query->where('group_id', $group_id);
        }

        $items = $query->get();

        $html = view2()->render('pages/items', [
            'items' => $items,
        ]);

        $ds->signals(['total' => count($items)]);
        $ds->element($html);
        $ds->close();
    }
}