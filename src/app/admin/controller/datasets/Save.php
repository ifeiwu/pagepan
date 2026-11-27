<?php

namespace app\admin\controller\datasets;

use app\exception\DatastarAlertException;
use support\Request;

class Save
{
    public function index(Request $request): void
    {
        $ds = datastar();
        $db = db();

        $id = post('id', 'int');
        $title = post('title', 'text');
        $table = post('table', 'text');

        // 验证必填字段
        if (!$title) {
            throw new DatastarAlertException('请输入数据源名称');
        }

        if (!$table) {
            throw new DatastarAlertException('请选择数据源类型');
        }

        // 检查数据源名称是否重复
        if ($db->table('dataset')->where('title', $title)->count() > 0) {
            throw new DatastarAlertException("已存在相同数据源名称：$title");
        }

        // 验证目标数据表是否存在
        $db->table($table)->exists();

        $now = date('Y-m-d H:i:s');

        $row = [
            'title' => $title,
            'table' => $table,
            'updated' => $now,
        ];

        if ($id) {
            // 更新现有数据源
            $db->table('dataset')->where('id', $id)->update($row);
        } else {
            // 创建新数据源
            $row['created'] = $now;
            $db->table('dataset')->insert($row);
        }

        // 保存成功后刷新页面并关闭 Datastar 请求
        $ds->script('location.reload()');
        $ds->close();
    }
}