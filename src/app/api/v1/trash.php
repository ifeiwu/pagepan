<?php

use utils\FS;
use utils\Log;

class Trash extends CRUD {

    function __construct()
    {
        $this->table = 'trash';

        parent::__construct();
    }

    protected function postDelete($request_data)
    {
        $error = array();

        $ids = $request_data['id'];

        $remove_files = [];

        foreach ($ids as $id)
        {
            $trash = db_get($this->table, '*', array('id', '=', $id));
            $item = json_decode($trash['data'], true);

			if (db_delete($this->table, array('id', '=', $id)))
            {
                // 没有关联记录可以删除目录
                if ($item['jid'] === 0)
                {
                    $path = $item['path'];

                    if ($path && count(explode('/', $path)) >= 2)
                    {
                        $_remove_files = [];
                        
                        FS::toFiles(WEB_ROOT . $path, $_remove_files, true);

                        if (FS::rrmdir(WEB_ROOT . $path))
                        {
                            $remove_files = array_merge($remove_files, $_remove_files);
                        }
                    }
                }
            }
            else
            {
                $error[] = $trash['title'];
            }
        }

        if ( count($error) === 0 )
        {
            $this->_log('delete', array('title' => count($ids)));

            $this->_add_sync_files($remove_files);

            return $this->_success('删除成功！');
        }
        else
        {
            return $this->_error('删除失败！');
        }
    }

    // 恢复数据
    protected function postReplay($request_data)
    {
        $error = array();
        $ids = $request_data['id'];

        // $this->db->beginTransaction();

        foreach ($ids as $id)
        {
            $trash = db_get($this->table, '*', array('id', '=', $id));//$this->db->select($this->table)->where(array('id', '=', $id))->get();
            $table = $trash['table'];

            $isadd = db_insert($table, json_decode($trash['data'], true));

            if ($isadd === false)
            {
                $error[] = $trash['title'];
            }
            else
            {
                db_delete($this->table, array('id', '=', $id));//$this->db->delete($this->table, array('id', '=', $id));
            }
        }

        if (count($error) === 0)
        {
            // $this->db->commit();

            $this->_log('reply', array('title' => count($ids)));

            return $this->_success();
        }
        else
        {
            // $this->db->rollBack();

            return $this->_error();
        }
    }

}
