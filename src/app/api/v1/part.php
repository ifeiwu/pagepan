<?php

class Part extends CRUD {

    function __construct()
    {
        $this->table = 'part';

        parent::__construct();
    }

    // 添加或删除收藏的组件
    protected function postFavorite($request_data)
    {
        $data = $request_data['part'];

        $uikit_id = $data['uikit_id'];

        $bool = false;

        // if ($this->db->select($this->table)->where(array('uikit_id', '=', $uikit_id))->has())
		if (db_has($this->table, array('uikit_id', '=', $uikit_id)))
        {
            $bool = db_delete($this->table, array('uikit_id', '=', $uikit_id));//$this->db->delete($this->table, array('uikit_id', '=', $uikit_id))->is();
        }
        else
        {
            $bool = db_insert($this->table, $data);
        }

        if ($bool === true)
        {
            return $this->_success();
        }
        else
        {
            return $this->_error();
        }
    }

    // 获取所有收藏组件的uikit_id
    protected function getFavoriteIds()
    {
        $list = db_all($this->table, 'uikit_id', array('uikit_id', '>', 0), null, null, 0);//$this->db->select($this->table, 'uikit_id')->where(array('uikit_id', '>', 0))->all(0);

        return $this->_success($list);
    }

}
