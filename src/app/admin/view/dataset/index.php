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
                         data-init="@get('/admin/datasets/menus?id=<?=$this->dataset->id?>')">
                    </nav>
                </div>
            </div>
        </aside>
    </div>
    <div class="min-h-0">
        <div class="flex flex-col h-full">
            <div class="flex items-center px-5 pt-5 mb-1">
                <div class="flex gap-2 font-bold leading-1 text-[17px]">
                    <span class="text-gray-500">数据集</span>
                    <span class="text-gray-500">/</span>
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
                        <button type="button" class="btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus preview-icon"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                            添加数据
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex items-center gap-2 px-5"
                 data-signals="{dataset_id:0,pagenum:1}"
                 data-indicator="fetching"
                 data-on-signal-patch-filter='{include:/^(dataset_id|kword|pagenum)$/}'
                 data-on-signal-patch="$loadmore=false;$kword=$query.value;items.innerHTML='';$dataset_id && @get('/admin/dataset/item-query',{filterSignals:{include:/^(dataset_id|kword|pagenum)$/}})">
                <div class="w-2xs">
                    <div class="input-group w-full">
                        <input class="input" placeholder="搜索内容" data-bind:query />
                        <span class="input-group-addon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg></span>
                        <span class="input-group-addon input-group-addon-end text-xs">12 个结果</span>
                    </div>
                </div>
                <div></div>
                <div class="ml-auto"></div>
            </div>
            <div class="scrollbar scrollbar-sm px-5 mt-3" style="flex:1;width:100%;min-height:0;overflow-y:auto">
                <div id="items" class=""
                     data-init="$dataset_id=<?=$dataset->id?>"
                     data-on:replace-item="@get('/admin/dataset/replace-item?id='+evt.detail.id,{filterSignals:{exclude:/.*/}})">
                </div>
                <div class="f:gray-50 f:14 text:center mt:20" style="display:none" data-show="$nodata">没有找到相关作品</div>
                <pre data-json-signals></pre>
            </div>
            <div class="flex w-full items-center gap-5 p-5">
                <div class="flex items-center gap-3">
                    <select class="select select-sm w-18">
                        <option value="10">每页行数</option>
                        <option value="10" selected>10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                    <div class="text-[13px] text-gray-600">共 3 页</div>
                </div>
                <div class="ml-auto">
                    <nav class="pagination">
                        <a href="#" class="pagination-item pagination-previous">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                            <span class="hidden sm:block">Previous</span>
                        </a>
                        <a href="#" class="pagination-item">1</a>
                        <a href="#" class="pagination-item active">2</a>
                        <a href="#" class="pagination-item">3</a>
                        <span class="pagination-ellipsis">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                            <span class="sr-only">More pages</span>
                          </span>
                        <a href="#" class="pagination-item pagination-next">
                            <span class="hidden sm:block">Next</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</div>

