<?php
define('SITE', helper('site/kv'));

return function () {
    $orderby = Request::post('orderby', 'escape');
    $orderby = $orderby ?: 'sortby DESC, ctime DESC';
    $pagenum = Request::post('pagenum', 'int') ?: 1;
    $perpage = Request::post('perpage', 'int') ?: 0;

    $db = db();
    $where = [['state', '=', 1], 'AND', ['type', '=', 1]];
    $column = ['id', 'title', 'image', 'path', 'price', 'price_type'];
    $total = $db->count('goods', $where);
    $items = $db->select('goods', $column, $where, $orderby, [($pagenum - 1) * $perpage, $perpage]);

    $_items = [];
    foreach ($items as $i => $item) {
        ItemModel::setItem($item);
        $price_type_info = ItemModel::getPriceTypeInfo();
        $price_type = '<div class="flex items-center justify-center w-11 h-11 r-5 bg-primary primary-20"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg></div>';
        if ($item['price_type'] != 1) {
            $price_type = '<span class="f-4 r-full py-1 px-4" style="--bg:'.$price_type_info['bg'].';--c:#fff">'.$price_type_info['text'].'</span>';
        }
        $_items[$i]['title'] = ItemModel::getTitle();
        $_items[$i]['image'] = ItemModel::getImage('m_');
        $_items[$i]['price'] = ItemModel::getPrice();
        $_items[$i]['price_type'] = $price_type;
        $_items[$i]['url'] = "shop-goods-detail/id/{$item['id']}.html";
    }

    Response::success('', ['items' => $_items, 'total' => $total, 'perpage' => $perpage, 'pages' => ceil($total / $perpage)]);
};