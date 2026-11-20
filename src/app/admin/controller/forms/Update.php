<?php

namespace app\admin\controller\forms;

use support\Request;

class Update
{
    public function index(Request $request)
    {
        $ds = datastar();
        $db = db();

        $row = post();

        $dataset = $db->table('dataset')->where('id', $row['dataset_id'])->first();

        if ($db->table($dataset->table)->exists()) {
            $db->table($dataset->table)->where('id', $row['id'])->update($row);
        }


        $ds->close();
    }
}