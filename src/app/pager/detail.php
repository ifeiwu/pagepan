<?php
/**
 * 详情页面
 */
return function ($alias, $id) {

    Pager::new()->display(['alias' => $alias, 'id' => intval($id)]);
};