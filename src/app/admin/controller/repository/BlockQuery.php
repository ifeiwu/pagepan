<?php

namespace app\admin\controller\repository;

use JasonGrimes\Paginator;
use support\Request;

class BlockQuery
{
    public function index(Request $request): void
    {
        $ds = datastar();
        $db = db();

        $perpage = 10;
        $pagenum = post('pagenum', 'int', 1);
        $pagenum = $pagenum > 0 ? $pagenum : 1;
        $repo_id = post('repo_id', 'int');

        $repo_path = $db->table('git_repo')->where('id', $repo_id)->value('path');
        $db_block = $db->table('git_block')->where('repo_id', $repo_id);

        // 关键字搜索
        $kword = filter(post('kword'), 'keyword');
        if ($kword) {
            $db_block->where(function($query) use ($kword) {
                $query->orWhere('name', 'like', '%' . $kword . '%');
                $query->orWhere('keywords', 'like', '%' . $kword . '%');
                $query->orWhere('description', 'like', '%' . $kword . '%');
            });
        }

        $category = post('category');
        if ($category) {
            $db_block->where('category', $category);
        }

        $git_block = $db_block->paginate($perpage, '*', 'page', $pagenum);
        $items = $git_block->items();
        $total = $git_block->total();

        $ds->signals(['total' => $total]);

        if ($total === 0) {
            $ds->inner('', '#items');
            $ds->inner('', '#paginator');
            $ds->signals(['nodata' => true])->close();
        }

        $html = view2()->render('repository/item-li', ['items' => $items, 'repo_path' => $repo_path]);
        $ds->inner($html, '#items');
        $ds->inner($this->getPaginatorHtml($total, $perpage, $pagenum), '#paginator');

        $ds->signals(['nodata' => false])->close();
    }

    private function getPaginatorHtml($totalItems, $itemsPerPage, $currentPage): string
    {
        $paginator = new Paginator($totalItems, $itemsPerPage, $currentPage);
        $paginator->setMaxPagesToShow(5);

        if ($paginator->getNumPages() <= 1) {
            return '';
        }

        $html = '<nav class="pagination">';

        if ($paginator->getPrevPage()) {
            $html .= '<a href="#" class="pagination-item pagination-previous" data-on:click="$pagenum--">上一页</a>';
        } else {
            $html .= '<a href="#" class="pagination-item pagination-previous">上一页</a>';
        }

        foreach ($paginator->getPages() as $page) {
            $num = $page['num'];
            if (is_int($num)) {
                $active = $page['isCurrent'] ? ' active' : '';
                $html .= '<a href="#" class="pagination-item' . $active . '" data-on:click="$pagenum=' . $num . '">' . $num . '</a>';
            } else {
                $html .= '<span class="pagination-ellipsis">' . $num . '</span>';
            }
        }

        if ($paginator->getNextPage()) {
            $html .= '<a href="#" class="pagination-item pagination-next" data-on:click="$pagenum++">下一页</a>';
        } else {
            $html .= '<a href="#" class="pagination-item pagination-next">下一页</a>';
        }

        $html .= '</nav>';

        return $html;
    }
}