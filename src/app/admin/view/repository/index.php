<?php $this->layout('iframe') ?>

<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;overflow:hidden;">
    <div class="px-5" style="width:100%;flex-shrink:0;">
        <div class="flex items-center gap-2 p-5 rounded-md bg-gray-200">
            <div>
                <label class="label">选择仓库</label>
            </div>
            <div class="grow">
                <select name="repo_id" class="select bg-white"
                        data-url="/admin/repository/items"
                        data-init="@get(el.dataset.url)"
                        data-on:reload="@get(el.dataset.url)"
                        data-ref:repo
                        data-bind:repo_id
                        data-on:change="$pagenum=1;$category='';$kword='';searchForm.requestSubmit();@get('/admin/repository/block-categorys')">
                    <div id="repo_options"></div>
                </select>
            </div>
            <div>
                <div class="btn-group">
                    <button class="btn btn-outline"
                            data-on:click="@post('/admin/repository/add-pull')">拉取更新</button>
                    <button id="dd-repository-trigger" class="btn btn-outline btn-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                </div>
                <div class="dropdown" data-sp-toggle="#dd-repository-trigger" data-sp-placement="bottom-end">
                    <button class="dropdown-item dropdown-item-destructive"
                            data-on:click="confirm(`确认要删除内容块仓库【${$repo.selectedOptions[0].textContent}】吗?`) && @get('/admin/repository/delete')">删除仓库</button>
                </div>
            </div>
            <div>
                <button id="open_add_dialog" class="btn">添加仓库</button>
                <dialog class="dialog" id="AddDialog" data-sp-toggle="#open_add_dialog" data-sp-static>
                    <div class="dialog-panel">
                        <button class="btn btn-ghost btn-xs btn-icon absolute top-3 right-3" aria-label="Close" data-sp-dismiss>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                        <div class="dialog-header">
                            <h2 class="dialog-title">添加仓库</h2>
                        </div>
                        <div class="dialog-content">
                            <form id="form"
                                  data-on:submit="@post('/admin/repository/add-pull',{contentType:'form'})">
                                <div class="field">
                                    <input type="url" name="url" class="input" value="https://gitee.com/ifeiwu/example-blocks.git" required />
                                </div>
                            </form>
                        </div>
                        <div class="dialog-footer">
                            <button type="submit" form="form" class="btn">保存</button>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>

        <form id="searchForm"
              data-signals="{pagenum:0}"
              data-indicator:fetching
              data-on:submit__delay.0ms="items.innerHTML='';@post('/admin/repository/block-query',{contentType:'form'})">
            <input type="hidden" name="pagenum" data-bind:pagenum>
            <input type="hidden" name="repo_id" data-attr:value="$repo_id">
            <div class="flex items-center py-5">
                <div class="grow">
                    <div class="input-group max-w-3xs">
                        <input type="search" class="input" name="kword" placeholder="开始搜索..." enterkeyhint="搜索"
                               data-bind:kword
                               data-on:search="$pagenum=1;$category='';!el.value && searchForm.requestSubmit()" />
                        <span class="input-group-addon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg></span>
                    </div>
                </div>
                <div class="ml-auto">
                    <select name="category" class="select"
                            data-bind:category
                            data-on:change="$pagenum=1;$kword='';searchForm.requestSubmit()">
                        <option value="">全部分类</option>
                        <div id="category_options"></div>
                    </select>
                </div>
            </div>
        </form>
    </div>

    <div class="px-5 scroll-fade scroll-fade-5 scrollbar-none" style="flex:1;width:100%;min-height:0;overflow-y:auto">
        <ul id="items" class="gap-5 columns-3 *:relative *:mb-5 *:rounded-md *:border *:border-solid *:hover:border-gray-400 *:overflow-hidden [&_li>.bar]:opacity-0 [&_li:hover>.bar]:opacity-100"></ul>
        <div class="text-center text-gray-500" data-show="$fetching">加载数据中</div>
        <div class="text-gray-500 text-center mt-10" style="display:none" data-show="$nodata">没有找到相关内容</div>
    </div>
    <div class="p-5">
        <nav id="paginator" class="pagination"
             data-indicator="fetching"
             data-on-signal-patch-filter='{include:/^pagenum$/}'
             data-on-signal-patch__debounce.200ms="searchForm.requestSubmit()"></nav>
    </div>
</div>