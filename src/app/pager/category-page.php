<?php
/**
 * 分类页面带分页
 */
return function ($alias, $cid, $pagenum) {

    Pager::new()->display(['alias' => $alias, 'cid' => intval($cid), 'pagenum' => intval($pagenum)]);
};