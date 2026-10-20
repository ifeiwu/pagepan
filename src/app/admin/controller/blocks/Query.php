<?php

namespace app\admin\controller\blocks;

use JasonGrimes\Paginator;
use support\Request;

class Query
{
    public function index(Request $request)
    {
        $ds = datastar();
        $db = db();
        $perpage = 2;
        $pagenum = post('pagenum', 'int', 1);
        $pagenum = $pagenum > 0 ? $pagenum : 1;
        $fields = '*';
        $sort = '-created';
        $filter = "";

        // 关键字搜索
        $kword = filter(post('kword'), 'keyword');
        if ($kword) {
            $filter .= " && (title~'$kword' || subtitle~'$kword' || keywords~'$kword')";
        }

        $category = post('category');
        if ($category) {
            $filter .= " && category_id = '$category'";
        }

        $gitblock = $db->table('git_block')->paginate($perpage);
        $items = $gitblock->items();
        $total = $gitblock->total();

        $ds->signals(['total' => $total]);

        if ($total === 0) {
            $ds->inner('', '#items');
            $ds->inner('', '#paginator');
            $ds->signals(['nodata' => true])->close();
        }

        $ds->inner(view2()->fetch('blocks/item-li', ['items' => $items]), '#items');
        $ds->inner($this->getPaginatorHtml($total, $perpage, $pagenum), '#paginator');

        $ds->signals(['nodata' => false])->close();
    }

    private function getPaginatorHtml($totalItems, $itemsPerPage, $currentPage): string
    {
        $paginator = new Paginator($totalItems, $itemsPerPage, $currentPage);
        $paginator->setMaxPagesToShow(5);
        var_dump($paginator->getNumPages());
        if ($paginator->getNumPages() <= 1) {
            return '';
        }

        $html = '<ul>';
        if ($paginator->getPrevPage()) {
            $html .= '<li class="prev"><a href="#" data-on:click="$pagenum--">上一页</a></li>';
        }

        foreach ($paginator->getPages() as $page) {
            $num = $page['num'];
            if (is_int($num)) {
                $html .= '<li' . ($page['isCurrent'] ? ' class="active"' : '') . '><a href="#" data-on:click="$pagenum=' . $num . '">' . $num . '</a></li>';
            } else {
                $html .= '<li class="disabled"><span>' . $num . '</span></li>';
            }
        }

        if ($paginator->getNextPage()) {
            $html .= '<li class="next"><a href="#" data-on:click="$pagenum++">下一页</a></li>';
        }
        $html .= '</ul>';

        return $html;
    }
}