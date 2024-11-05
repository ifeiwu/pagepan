<?php
// 商品数据
class Goods extends CRUD {

    public function __construct()
    {
        $this->table = 'goods';

        parent::__construct();
    }

}
