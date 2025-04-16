<?php
define('SITE', helper('site/kv'));

return function () {
    $orderby = Request::post('orderby', 'escape');
    $orderby = $orderby ?: 'sortby DESC, ctime DESC';
    $pagenum = Request::post('pagenum', 'int') ?: 1;
    $perpage = Request::post('perpage', 'int') ?: 0;

    $db = db();
    $where = [['state', '=', 1], 'AND', ['type', '=', 1]];
    $column = ['id', 'title', 'image', 'path', 'price'];
    $total = $db->count('goods', $where);
    $items = $db->select('goods', $column, $where, $orderby, [($pagenum - 1) * $perpage, $perpage]);

    $_items = [];
    foreach ($items as $i => $item) {
        ItemModel::setItem($item);
        $_items[$i]['title'] = ItemModel::getTitle();
        $_items[$i]['image'] = ItemModel::getImage('m_');
        $_items[$i]['price'] = ItemModel::getPrice();
        $_items[$i]['url'] = "shop-goods-detail/id/{$item['id']}.html";
    }

    Response::success('', ['items' => $_items, 'total' => $total, 'perpage' => $perpage, 'pages' => ceil($total / $perpage)]);
};