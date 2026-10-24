<?php

namespace app\admin\controller\blocks;

use JasonGrimes\Paginator;
use support\Request;

class Query
{
    public function index(Request $request): void
    {
        $ds = datastar();
        $db = db();

        $perpage = 10;
        $pagenum = post('pagenum', 'int', 1);
        $pagenum = $pagenum > 0 ? $pagenum : 1;
        $repo_path = post('repo', 'text');

        $repo_id = $db->table('git_repo')->where('path', $repo_path)->value('id');
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

        $html = view2()->render('blocks/item-li', ['items' => $items, 'repo' => post('repo', 'text')]);
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

        $html = '<ul>';

        if ($paginator->getPrevPage()) {
            $html .= '<li class="prev"><a href="#" class="button ghost" data-on:click="$pagenum--">上一页</a></li>';
        } else {
            $html .= '<li class="prev"><a href="#" class="button ghost" aria-disabled="true">上一页</a></li>';
        }

        foreach ($paginator->getPages() as $page) {
            $num = $page['num'];
            if (is_int($num)) {
                $current_attr = $page['isCurrent'] ? 'aria-current="page"' : '';
                $html .= '<li><a href="#" class="button ghost" data-on:click="$pagenum=' . $num . '" ' . $current_attr . '>' . $num . '</a></li>';
            } else {
                $html .= '<li><span>' . $num . '</span></li>';
            }
        }

        if ($paginator->getNextPage()) {
            $html .= '<li class="next"><a href="#" class="button ghost" data-on:click="$pagenum++">下一页</a></li>';
        } else {
            $html .= '<li class="next"><a href="#" class="button ghost" aria-disabled="true">下一页</a></li>';
        }

        $html .= '</ul>';

        return $html;
    }
}