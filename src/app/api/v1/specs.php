<?php
// 商品规格
class Specs extends CRUD {

    public function __construct()
    {
        $this->table = 'specs';

        parent::__construct();
    }

}
