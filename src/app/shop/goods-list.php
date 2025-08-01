<?php
define('SITE', helper('site/kv'));

return function () {
    $layout = Request::get('layout', 'escape');
    $categoryid = Request::get('cid', 'int');
    $orderby = Request::post('orderby', 'escape');
    $orderby = $orderby ?: 'sortby DESC, id DESC';
    $pagenum = Request::post('pagenum', 'int') ?: 1;
    $perpage = Request::post('perpage', 'int') ?: 0;

    $db = db();
    $where = [['state', '=', 1], 'AND', ['type', '=', 1]];
    if ($categoryid) {
        $where[] = 'AND';
        $where[] = ['pid', '=', $categoryid];
    }
    $column = ['id', 'title', 'summary', 'image', 'path', 'price', 'price_type'];
    $total = $db->count('goods', $where);
    $items = $db->select('goods', $column, $where, $orderby, [($pagenum - 1) * $perpage, $perpage]);

    $_items = [];
    foreach ($items as $i => $item) {
        ItemModel::setItem($item);
        $price_type_info = ItemModel::getPriceTypeInfo();

        $ifs = ['price_type==1'];
        if ($item['price_type'] != 1) {
            $ifs = ['price_type!=1'];
        }

        $_items[$i]['title'] = ItemModel::getTitle();
        $_items[$i]['summary'] = ItemModel::getSummary();
        $_items[$i]['image'] = ItemModel::getImage('m_');
        $_items[$i]['price'] = ItemModel::getPrice();
        $_items[$i]['price_type_bg'] = $price_type_info['bg'];
        $_items[$i]['price_type_text'] = $price_type_info['text'];
        $_items[$i]['ifs'] = $ifs;
        $_items[$i]['url'] = "shop-goods-detail/id/{$item['id']}.html";
    }

    Response::success('', ['items' => $_items, 'total' => $total, 'perpage' => $perpage, 'pages' => ceil($total / $perpage)]);
};