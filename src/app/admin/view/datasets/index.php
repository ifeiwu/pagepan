<?php $this->layout('admin');?>

<div class="grid grid-cols-[180px_1fr] gap-5 h-full"
     data-signals="{dsid:0}"
     data-indicator="fetching"
     data-on-signal-patch-filter='{include:/^dsid$/}'
     data-on-signal-patch="$pagenum=0;$loadmore=false;$kword=$query.value;items.innerHTML='';$dsid && @get('/admin/datasets/query',{filterSignals:{include:/^(dsid|kword|pagenum)$/}})">
    <div class="h-full">
        <aside class="sidebar-static w-50 h-full">
            <div class="sidebar-group">
                <span class="sidebar-group-label">数据源</span>
                <button id="group-action" class="sidebar-group-action" aria-label="Add project">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </button>
                <div id="group-action-menu" class="dropdown w-44" data-sp-toggle="#group-action" data-sp-placement="right-start">
                    <a href="#" class="dropdown-item">New project</a>
                    <a href="#" class="dropdown-item">Import project</a>
                </div>
                <div class="sidebar-group-content">
                    <nav id="sidebar_menu" class="sidebar-menu"
                         data-init="@get('/admin/datasets/menus?id=<?=$this->id?>')">
                    </nav>
                </div>
            </div>
        </aside>
    </div>
    <div class="flex flex-col h-full">
        <div class="flex px-5 py-8">
            <div>
                <h2 class="text-lg font-bold">首页</h2>
            </div>
            <div class="ml-auto">
                <div class="flex gap-2">
                    <button type="button" class="btn btn-outline">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-start">
                            <path d="M12 15V3"></path>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <path d="m7 10 5 5 5-5"></path></svg>导出</button>
                    <button type="button" class="btn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-start">
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path></svg>添加数据
                    </button>
                </div>
            </div>
        </div>
        <div class="scroll-fade scrollbar scrollbar-sm" style="flex:1;width:100%;min-height:0;overflow-y:auto">
            <div class="max-h-96 overflow-auto">
                <table id="items" class="table table-lg"
                       data-init="@get('/admin/datasets/query?id=<?=$this->id?>')"
                       data-on:replace-item="@get('/manager/work/replace-item?id='+evt.detail.id,{filterSignals:{exclude:/.*/}})"></table>
            </div>
            <div class="f:gray-50 f:14 text:center mt:20" style="display:none" data-show="$nodata">没有找到相关作品</div>
        </div>
        <!--<div class="flex items-center justify-between gap-4 p-5">
                <div class="flex w-full items-center justify-between gap-6">
                    <span class="font-medium whitespace-nowrap">Page 1 of 3</span>
                    <div>
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
                    <div class="field field-horizontal w-auto md:flex">
                        <select class="select select-sm w-18" id="data-table-page-size">
                            <option value="10" selected="">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>
        </div>-->
    </div>
</div>

