<?php

namespace app\admin\controller\datasets;

use support\Request;

class Menus
{
    public function index(Request $request): void
    {
        // 获取当前选中的数据源 ID
        $dataset_id = get('id');

        $ds = datastar();
        $db = db();

        // 获取所有数据源
        $datasets = $db->table('dataset')->get();

        $html = '';
        foreach ($datasets as $dataset) {
            $id = $dataset->id;

            // 统计当前数据源对应的数据记录数量
            $count = $db->table($dataset->table)->where('dataset_id', $id)->count();

            $title = $dataset->title;

            // 判断当前数据源是否处于选中状态
            $active = $id == $dataset_id ? ' active' : '';

            // 生成数据源侧边栏菜单
            $html .= '
                <div class="sidebar-menu-item">
                    <a href="/admin/datasets?id=' . $id . '" class="sidebar-menu-button' . $active . '">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
                        <span>' . $title . '</span>
                    </a>
                    <span class="sidebar-menu-badge">' . $count . '</span>
                </div>
            ';
        }

        // 更新侧边栏数据源菜单
        $ds->inner($html, '#sidebar_menus');

        // 关闭 Datastar 响应
        $ds->close();
    }
}