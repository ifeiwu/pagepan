<?php $this->layout('admin');?>

<div class="grid grid-cols-[250px_1fr] h-full">
    <div>
        <aside class="sidebar-static w-full">
            <div class="sidebar-group">
                <span class="sidebar-group-label">数据集</span>
                <button id="group-action" class="sidebar-group-action">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </button>
                <div class="dropdown" data-sp-toggle="#group-action" data-sp-placement="right-start">
                    <a href="#" class="dropdown-item">新建</a>
                    <a href="#" class="dropdown-item">导入</a>
                </div>
                <div class="sidebar-group-content">
                    <nav id="sidebar_menu" class="sidebar-menu"
                         data-init="@get('/admin/datasets/menus?id=<?= $dataset->id ?>')">
                    </nav>

                    <pre data-json-signals></pre>
                </div>
            </div>
        </aside>
    </div>
    <div class="min-h-0">
        <div class="flex flex-col h-full">
            <div class="flex items-center px-5 pt-5 mb-1">
                <div class="flex gap-2 font-bold leading-1 text-[17px]">
                    <span class="text-gray-600">数据集</span>
                    <span class="text-gray-400">/</span>
                    <span>首页数据</span>
                </div>
                <div class="ml-auto">
                    <div class="flex gap-2">
                        <button id="dataset-action" class="btn btn-outline">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings preview-icon"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                        <div class="dropdown" data-sp-toggle="#dataset-action">
                            <a href="#" class="dropdown-item">导出</a>
                            <a href="#" class="dropdown-item">删除</a>
                        </div>
                        <button type="button" class="btn btn-outline">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-tree preview-icon"><path d="M8 5h13"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="M3 10a2 2 0 0 0 2 2h3"/><path d="M3 5v12a2 2 0 0 0 2 2h3"/></svg>
                            分类
                        </button>
                        <button type="button" class="btn"
                            data-on:click="@get('/admin/datasets/item-create')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus preview-icon"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                            添加数据
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex items-center gap-2 px-5"
                 data-signals="{dataset_id:0,pagenum:1,perpage:10}"
                 data-indicator="fetching"
                 data-on-signal-patch-filter='{include:/^(dataset_id|kword|perpage|pagenum)$/}'
                 data-on-signal-patch="@get('/admin/datasets/item-query',{filterSignals:{include:/^(dataset_id|kword|perpage|pagenum)$/}})">
                <div>
                    <div class="input-group w-full">
                        <input type="text" class="input" placeholder="搜索内容"
                               data-ref:search
                               data-on:input__debounce.500ms="$kword=$search.value"/>
                        <span class="input-group-addon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg></span>
                        <span class="input-group-addon input-group-addon-end text-xs gap-1"><span data-text="$total"></span>个结果</span>
                    </div>
                </div>
                <div></div>
                <div class="ml-auto"></div>
            </div>
            <div class="scrollbar scrollbar-sm px-5 mt-3 pb-5" style="flex:1;width:100%;min-height:0;overflow-y:auto">

                <table id="table" class="table table-lg"
                       data-signals:ids="[]"
                       data-init="$dataset_id=<?=$dataset->id?>"
                       data-on:reload="@get('/admin/datasets/item-query')"
                       data-on:item-replace="@get(`/admin/datasets/item-replace?table=${evt.detail.table}&id=${evt.detail.id}`,{filterSignals:{exclude:/.*/}})">
                    <thead class="table-header sticky top-0 z-10 bg-white">
                        <tr class="table-row *:font-bold">
                            <th class="table-head w-10">
                                <input type="checkbox" class="checkbox"
                                       data-bind:checkall
                                       data-on:change="
                                            $ids = $checkall ?
                                                [...document.querySelectorAll(`input[name='ids[]']`)].map(el => el.value) :
                                                Array($perpage).fill('')">
                            </th>
                            <th class="table-head">标题信息</th>
                            <th class="table-head w-25">发布时间</th>
                            <th class="table-head w-25">排序</th>
                            <th class="table-head w-15">状态</th>
                            <th class="table-head w-25 text-right">操作</th>
                        </tr>
                    </thead>
                    <tbody class="table-body" id="items"></tbody>
                </table>

                <div class="text-center text-gray-500 mt-10" style="display:none" data-show="$nodata">没有找到相关数据</div>

                <div class="action-bar"
                     data-effect="$ids.some(id=>id!=='')?sp.actionBar(el).show():sp.actionBar(el).hide()">
                    <div class="tabular-nums px-2">
                        <span id="action-bar-count" data-text="$ids.filter(Boolean).length">0</span> 已选择
                    </div>
                    <div class="separator separator-vertical"></div>
                    <button class="btn btn-ghost btn-sm text-destructive hover:text-destructive"
                            data-on:click="console.log($ids); @get('/admin/datasets/item-delete/checks')">
                        <svg class="icon-start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        删除
                    </button>
                </div>
            </div>
            <div class="flex w-full items-center gap-5 p-5 pt-0">
                <div class="flex items-center gap-3">
                    <select class="select select-sm w-18" data-bind:perpage>
                        <option value="2">2</option>
                        <option value="10" selected>10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                    <div class="text-[13px] text-gray-600">共 <span data-text="$pages"></span> 页</div>
                </div>
                <div class="ml-auto">
                    <nav class="pagination"></nav>
                </div>
            </div>
        </div>
    </div>
</div>

<template id="ItemEditDialog"></template>

<script src="/assets/admin/js/dataset.js"></script>