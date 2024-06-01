<?php
// 项目数据
class Item extends CRUD {

    public function __construct()
    {
        $this->table = 'item';

        parent::__construct();
    }

}
