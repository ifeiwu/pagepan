<?php

namespace app\admin\controller\dataset;

use JasonGrimes\Paginator;
use support\Request;

class ItemQuery
{
    public function index(Request $request): void
    {
        $ds = datastar();
        $db = db();

        $signals = $ds->getSignals();
        $perpage = 3;
        $pagenum = intval($signals['pagenum']);
        $pagenum = $pagenum > 0 ? $pagenum : 1;
        $dataset_id = intval($signals['dataset_id']);

        $dataset = $db->table('dataset')->where('id', $dataset_id)->first();
        $dataset_item = $db->table($dataset->table)->where('dataset_id', $dataset_id)->orderByDesc('sort')->orderByDesc('updated');

        // 关键字搜索
        $kword = filter(post('kword'), 'keyword');
        if ($kword) {
            $dataset_item->where(function($query) use ($kword) {
                $query->orWhere('title', 'like', '%' . $kword . '%');
            });
        }

        $category_id = post('category_id');
        if ($category_id) {
            $dataset_item->where('category_id', $category_id);
        }

        $paginator = $dataset_item->paginate($perpage, '*', 'page', $pagenum);
        $items = $paginator->items();
        $total = $paginator->total();

        $ds->signals(['total' => $total]);

        if ($total === 0) {
            $ds->inner('', '#items');
            $ds->inner('', '.pagination');
            $ds->signals(['nodata' => true])->close();
        }

        $html = view2()->render('dataset/table', ['items' => $items]);
        $ds->inner($html, '#items');
        $ds->inner($this->getPaginatorHtml($total, $perpage, $pagenum), '.pagination');

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
            $html .= '<a href="#" class="pagination-item pagination-previous" data-on:click="$pagenum--"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></a>';
        } else {
            $html .= '<a href="#" class="pagination-item pagination-previous"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></a>';
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
            $html .= '<a href="#" class="pagination-item pagination-next" data-on:click="$pagenum++"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></a>';
        } else {
            $html .= '<a href="#" class="pagination-item pagination-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></a>';
        }

        $html .= '</nav>';

        return $html;
    }
}