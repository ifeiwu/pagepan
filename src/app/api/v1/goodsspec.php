<?php
// 商品规格
class GoodsSpec extends CRUD {

    public function __construct()
    {
        $this->table = 'goods_spec';

        parent::__construct();
    }

}
